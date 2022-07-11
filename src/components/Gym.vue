<template>
        <div class="w-full grid gap-4">
            <NavBar title="Halle" subtitle="Spielübersicht" />
            <div id="gym-header" class="card bg-base-100 grid w-5/6 m-auto shadow-xl relative">
                <Header v-if="gym" :type="'gym'" :gym="gym" :gym_id="gym_id" @updateFavorites="emit('updateFavorites')">
                </Header>
                <div id="gym-content" class="flex mb-5">
                    <div id="club-info" class="mx-5 line-clamp-4 break-words w-full">

                        <div class="font-bold text-lg">
                            {{ gym.name }}
                        </div>
                        <div class="text-base-content -mt-1 underline hover:text-gray-900">
                            <!-- TODO: add link to org -->
                            <!-- {{ og }} -->
                            <router-link v-if="og.length"
                                :to="'/leagues#' + og.find(findOg).id + ';' + og.find(findOg).v_id">{{ gym.org }}
                            </router-link>
                        </div>
                        <div id="info" class="grid text-xs sm:text-base xs:text-sm">
                            <div>Nummer: {{ gym.no }}</div>
                            <div>
                                Straße: {{ gym.street }}
                            </div>
                            <div>Ort: {{ gym.town }}</div>
                            <div>
                                Telefon: {{ gym.phone }}
                            </div>
                        </div>
                        <button @click="maps()"
                            class="btn btn-primary btn-sm flex w-fit p-1  sm:text-base text-xs underline-none items-center">
                            Öffnen in
                            <img class="h-6 ml-1" src="/icons/maps.png" alt="">
                        </button>
                        <div class="flex text-base-content my-2 flex-wrap text-xs sm:text-base xs:text-sm">
                            <InformationCircleIcon class="h-5 mt-0.5 mr-1" />{{ gym.wax }}
                        </div>
                        <div class="card bg-secondary bg-opacity-50 p-2">
                            <div
                                class="w-full flex flex-wrap text-xs sm:text-base gap-2">
                                <a v-for="file in gym.files" :href="file.file"
                                    class="btn btn-sm btn-secondary p-1">
                                    <DocumentIcon class="h-5 text-gray-700 mt-0.5" />
                                    {{ file.type }}
                                </a>
                                <div class="btn btn-sm btn-secondary p-1 !text-base-content/50" disabled="true">
                                    <!-- <DocumentIcon class="h-5 text-gray-700 mt-0.5" /> -->
                                    Keine Dokumente
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="w-5/6 card bg-base-100 m-auto p-2 gap-2 mb-4">
                <div class="mt-3 flex justify-between gap-1 flex-wrap sm:flex-nowrap">
                    <h2 class="font-bold text-lg m-1">Spiele</h2>
                    <!-- <div class="text-sm m-2">
                    Alle Spiele
                    <input
                        class="ml-1 mb-1 rounded"
                        type="checkbox"
                        name=""
                        id=""
                        v-model="showAll"
                        @click="teamClassID ? getData(teamClassID) : null"
                    />
                </div> -->
                    <div class="flex flex-wrap gap-2 sm:justify-end">
                        <Week @updateWeek="(id) => updateWeek(id)" :selected="week_selected" :list="week_list"
                            :loading="loading" />
                        <Period class="mr-0" @updatePeriod="(id) => updatePeriod(id)" :loading="loading"
                            :selected="period_selected" :list="period_list" />
                    </div>
                </div>
                <div class="overflow-auto max-h-[50%] w-full">
                    <Disclosure v-for="team, index in teams" :key="team.gClassID + week_selected">
                        <DisclosureButton
                            class="bg-primary text-sm leading-[1em] p-4 rounded-t-lg bg-opacity-75 w-full flex justify-start uppercase text-center text-primary-content flex-nowrap gap-3"
                            :class="index == 0 ? '' : 'mt-1'">
                            <span>{{ team.gClassSname }}</span>
                            <!-- <ChevronUpIcon
                            class="w-5 h-5 text-indigo-900"
                            :class="[
                                open ? 'transform rotate-180' : '',
                                team.games.length ? '' : '!text-gray-500',
                            ]"
                        /> -->
                        </DisclosureButton>
                        <DisclosurePanel static v-if="team"
                            class="px-4 pt-4 pb-2 text-sm bg-primary bg-opacity-20 rounded-b-lg">
                            <div>
                                <hr class="bg-gray-400 text-black h-[1.5px] -mt-3" />
                                <div id="league-info">
                                    <!-- Information about how many games and button to team component -->
                                </div>
                                <Match v-for="match in team.games" :key="match.gID" :match="match" :teamID="null"
                                    :teamClassID="team.gClassID"></Match>
                                <div id="no-data" v-show="!team.games.length" class="mb-2">
                                    Keine Spiele
                                </div>
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                    <div id="no-data" v-show="teams.length < 1" class="mb-2">
                        Keine Spiele
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref, toRef } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import {
    ChevronUpIcon,
    StarIcon,
    ClockIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
    DocumentIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/vue/solid";
import { StarIcon as StarIconOutline, ShareIcon } from "@heroicons/vue/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

// helper components
import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Header from "./helpers/Header.vue";
import Week from "./helpers/Week.vue";
import Period from "./helpers/Period.vue";
import { fetchTeamID } from "./functions/fetchData";
import MapsLoadingVue from "./helpers/MapsLoading.vue";
import { isDark } from "./functions/misc.js";

// helper functions

const route = useRoute();
const gym = ref({});
const og = ref([]);
const loading = ref(true);
const gym_id = ref(null);
const teamID = ref(null);
const teams = ref([]);
const week_list = ref([]);
const week_selected = ref(null);
const period_selected = ref(null);
const period_list = ref([]);
const teamClassID = ref(null);
const props = defineProps(["gym_id", "gym"]);
const is_dark = ref(isDark());

const emit = defineEmits(["updateFavorites", "disclosure-update"]);

gym.value = {};

const elements = ref([]);

const goDateBack = () => {
    console.log(dateList.value);
    const index = Object.keys(dateList.value).findIndex((element) => element == selected.value);
    console.log(index);
    selected.value = Object.keys(dateList.value)[index - 1];
    console.log(selected.value);
    fetchMatches();
};
const goDateForward = () => {
    const index = Object.keys(dateList.value).findIndex((element) => element == selected.value);
    selected.value = Object.keys(dateList.value)[index + 1];
    fetchMatches();
};

const findOg = (item) => {
    //console.log(gym.value.org);
    //console.log(item);
    //console.log(item.name);
    return item.name === gym.value.org;
}

const updateWeek = (id) => {
    week_selected.value = id;
    fetchMatches();
};

const updatePeriod = (id) => {
    period_selected.value = id;
    fetchMatches();
};

const maps = () => {
    console.log(gym.value.geolat);
    console.log(gym.value.geolon);
    if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPad") != -1 ||
        navigator.platform.indexOf("iPod") != -1 ||
        (navigator.userAgentData &&
            (navigator.userAgentData.platform.indexOf("iOS") != -1 ||
                navigator.userAgentData.platform.indexOf("iPadOS") != -1))
    ) {
        console.log("iOS");
        window.open(
            "maps://www.google.com/maps/search/?api=1&query=" + gym.value.geolat + "," + gym.value.geolon
        );
    } else {
        window.open(
            "https://www.google.com/maps/search/?api=1&query=" + gym.value.geolat + "," + gym.value.geolon
        );
        console.log("Not iOS");
    }
};



const hideOther = (id) => {
    const items = elements.value.filter((elm) => {
        return elm.getAttribute("data-id") !== id.toString();
    });
    items.forEach((elm) => elm.click());
};


const fetchGym = async () => {
    if (props.gym_id) {
        gym_id.value = props.gym_id;
    } else {
        gym_id.value = route.hash.substring(1);
    }
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=gi&g=" +
        gym_id.value
    );
    const json = await response.json();
    gym.value = json[0].gymnasiumInfo;
};

const fetchOg = async () => {
    const response = await fetch(
        "/og.json"
    );
    const json = await response.json();
    og.value = json;
};

const fetchMatches = async () => {
    loading.value = true;
    let url;
    if (week_selected.value && period_selected.value) {
        url = "https://spo.handball4all.de/service/if_g_json.php?cmd=pgy&g=" +
            gym_id.value + "&do=" + week_selected.value + "&p=" + period_selected.value;
    }
    else if (week_selected.value) {
        url = "https://spo.handball4all.de/service/if_g_json.php?cmd=pgy&g=" +
            gym_id.value + "&do=" + week_selected.value;
    }
    else if (period_selected.value) {
        url = "https://spo.handball4all.de/service/if_g_json.php?cmd=pgy&g=" +
            gym_id.value + "&p=" + period_selected.value;
    }
    else {
        url = "https://spo.handball4all.de/service/if_g_json.php?cmd=pgy&g=" +
            gym_id.value + "&do=" + week_selected.value;
    }
    const response = await fetch(url);

    const json = await response.json();
    let teams_tmp = json[0].content.gList;
    teams.value = [];
    teams_tmp.forEach(element => {
        if (!teams.value.find(team => team.gClassID == element.gClassID)) {
            teams.value.push(element);
        }
        else {
            const index = teams.value.findIndex(team => team.gClassID == element.gClassID);
            element.games.forEach(game => {
                teams.value[index].games.push(game);
            });
        }
    });


    week_selected.value = json[0].menu.dt.selected;
    week_list.value = json[0].menu.dt.list;
    period_selected.value = json[0].menu.period.selectedID;
    period_list.value = json[0].menu.period.list;
    loading.value = false;
};


const club_no_ref = toRef(props, "gym_id");
watch(club_no_ref, async (newValue, oldValue) => {
    console.log("update club");
    if (newValue) {
        forceUpdate();
    }
});


const forceUpdate = async () => {
    await fetchGym();
    await fetchOg();
    await fetchMatches();
}

onMounted(async () => {
    is_dark.value = isDark();
    await fetchGym();
    await fetchOg();
    await fetchMatches();
});
</script>

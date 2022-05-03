<template>
    <div class="w-full h-full">
        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Halle</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">
                Spielübersicht
            </p>
        </div>
        <div
            id="gym-header"
            class="grid w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <Header
                v-if="gym"
                :type="'gym'"
                :gym="gym"
                :gym_id="gym.id"
                @updateFavorites="emit('updateFavorites')"
            ></Header>
            <div id="gym-content" class="flex mb-5">
                <div id="club-info" class="mx-5 line-clamp-4 break-words w-full">
                    
                    <div class="font-bold text-lg">
                        {{ gym.name }}
                    </div>
                    <div class="text-gray-700 -mt-1">
                        {{ gym.org }}
                    </div>
                    <div class="text-gray-800">Nummer: {{ gym.no }}</div>
                    <div>
                        Straße: {{ gym.street }}
                    </div>
                    <div class="text-gray-800">Ort: {{ gym.town }}</div>
                    <div>
                        Telefon: {{ gym.phone }}
                    </div>
                    <button @click="maps()" class="rounded flex w-fit p-1  sm:text-base text-xs underline-none text-white items-center hover:bg-indigo-300 hover:text-indigo-900 bg-indigo-500">
                            Öffnen in
                            <img class="h-6 ml-1" src="/icons/maps.png" alt="">
                    </button>
                    <div class="flex text-gray-700 my-2">
                        <InformationCircleIcon class="h-5 mt-0.5 mr-1"/>{{ gym.wax}}
                    </div>
                    <div class="text-gray-800">
                        Dateien:
                    </div>
                    <div class="bg-indigo-100 rounded w-full flex">
                        <a  v-for="file in gym.files" :href="file.file" class="flex bg-indigo-200 p-1 rounded m-2 hover:bg-indigo-300">
                            <DocumentIcon class="h-5 text-gray-700 mt-0.5"/>
                            {{ file.type }}
                        </a>

                    </div>
                </div>
            </div>
        </div>
        <div class="w-5/6 m-auto pb-24">
            <div class="mt-3 flex justify-between">
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
                <Week @updateWeek="(id) => updateWeek(id)" :selected="week_selected" :list="week_list" :loading="loading"/>
            </div>
            <div
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2"
            >
                <Disclosure
                    v-for="team, index in teams"
                    :key="team.gClassID + week_selected"
                    
                    
                >
                    <DisclosureButton
                      
                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
                        :class="index == 0 ? '' : 'mt-1'"
                    >
                        <span>{{ team.gClassSname }}</span>
                        <!-- <ChevronUpIcon
                            class="w-5 h-5 text-indigo-900"
                            :class="[
                                open ? 'transform rotate-180' : '',
                                team.games.length ? '' : '!text-gray-500',
                            ]"
                        /> -->
                    </DisclosureButton>
                    <DisclosurePanel
                        
                        static
                        v-if="team"
                        class="px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"
                    >
                        <div>
                            <hr
                                class="bg-gray-400 text-black h-[1.5px] -mt-3"
                            />
                            <div id="league-info">
                                <!-- Information about how many games and button to team component -->
                            </div>
                            <Match
                                v-for="match in team.games"
                                :key="match.gID"
                                :match="match"
                                :teamID="null"
                                :teamClassID="team.gClassID"
                            ></Match>
                            <div
                                id="no-data"
                                v-show="!team.games.length"
                                class="mb-2"
                            >
                                Keine Spiele
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
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
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Header from "./helpers/Header.vue";
import Week from "./helpers/Week.vue";
import { fetchTeamID } from "./functions/fetchData";
import MapsLoadingVue from "./helpers/MapsLoading.vue";

// helper functions

const route = useRoute();
const gym = ref({});
const loading = ref(true);
const gym_id = ref(null);
const teamID = ref(null);
const teams = ref([]);
const week_list = ref([]);
const week_selected = ref(null);
const teamClassID = ref(null);
const props = defineProps(["club_no"]);

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
    const index =  Object.keys(dateList.value).findIndex((element) => element == selected.value);
    selected.value = Object.keys(dateList.value)[index + 1];
    fetchMatches();
};

const updateWeek = (id) => {
    week_selected.value = id;
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

const fetchMatches = async () => {
    loading.value = true;
    let response;
    if (week_selected.value) {
        response = await fetch(
            "https://spo.handball4all.de/service/if_g_json.php?cmd=pgy&g=" +
                gym_id.value + "&do=" + week_selected.value
        );
    }
    else {
        response = await fetch(
            "https://spo.handball4all.de/service/if_g_json.php?cmd=pgy&g=" +
                gym_id.value
        );
    }
    
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
    loading.value = false;
};

//TODO: implement this fix again
/*
const club_no_ref = toRef(props, "club_no");
watch(club_no_ref, async (newValue, oldValue) => {
    console.log("update club");
    if (newValue) {
        forceUpdate();
    }
});
*/

onMounted(async () => {
    await fetchGym();
    await fetchMatches();
});
</script>

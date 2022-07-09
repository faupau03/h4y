<template>
    <div class="min-h-full w-full scrolled bg-base-100/50">
        <div class="w-full grid gap-4">
            <NavBar title="Verein" subtitle="Spielübersicht" />
            <div id="club-header" class="grid w-5/6 m-auto relative bg-base-100 card shadow-xl">
                <Header v-if="club" :type="'club'" :club="clubInfo" :club_id="clubInfo.no"
                    @updateFavorites="emit('updateFavorites')"></Header>
                <HeaderLoading v-else />

                <div id="content" class="flex flex-wrap mb-5">
                    <img v-if="clubInfo && clubInfo.no && img_loaded" :src="'logos/clubs/' + clubInfo.no + '.png'"
                        @error="img_loaded = false" alt="" id="club-logo"
                        class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg" />

                    <div v-else class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg shadow-2xl bg-gray-200">
                        <UserGroupIcon class="text-gray-500 h-full" />
                    </div>
                    <div id="club-info" class="m-5">
                        <div class="font-bold">
                            {{ clubInfo.lname }}
                        </div>
                        <div class="text-base-content">Postleitzahl: {{ clubInfo.postal }}</div>
                        <div class="text-base-content">Nummer: {{ clubInfo.no }}</div>
                        <div
                            class="absolute bottom-5 right-5 flex items-center gap-1 text-base-content hover:text-accent">
                            <GlobeAltIcon class="h-5" />
                            <a class=" underline mb-1" :href="'http://' + clubInfo.webaddress">{{ clubInfo.webaddress
                            }}</a>
                        </div>

                    </div>
                </div>
            </div>
            <div class="w-5/6 m-auto p-2 mb-4 card bg-base-100 shadow-xl overflow-hidden">
                <div class="mt-3 flex flex-wrap">
                    <h2 class="font-bold text-lg m-1">Spiele</h2>
                    <Period class="sm:ml-5 ml-2 mr-auto" @updatePeriod="(id) => updatePeriod(id)" :loading="loading"
                        :selected="period_selected" :list="period_list" />
                    <div class="form-control mr-5">
                        <label class="label cursor-pointer flex gap-1">
                            <span class="label-text">Alle</span>
                            <span class="label-text sm:block hidden">
                                Spiele
                            </span>
                            <input type="checkbox" class="checkbox checkbox-sm"
                                @click="showAll = !showAll, updateFilter(showAll)" />
                        </label>
                    </div>
                    <div class="flex items-center">
                        <button v-if="!offline" @click="refreshData" class="btn btn-sm btn-square"
                            :class="loading_net ? 'loading disabled' : ''">
                            <RefreshIcon v-if="!loading_net" class="h-4" />
                        </button>
                        <Popover v-else class="relative">
                            <PopoverButton class="flex items-center">
                                <StatusOfflineIcon class="h-5 text-red-600" />
                            </PopoverButton>

                            <PopoverPanel
                                class="absolute z-10 bg-indigo-100 outline-1 outline outline-indigo-200 rounded-lg p-2 shadow-2xl border-indigo-300 border-1">
                                <p class="text-xs">
                                    Du bist offline. Dir werden zuvor gespeicherte Daten gezeigt.
                                </p>
                            </PopoverPanel>
                        </Popover>

                    </div>
                </div>

                <!-- Debugging: -->
                <!-- {{ club.menu ? club.menu.period.selectedID == period_selected : 'error'}} -->

                <div v-if="!loading && club.menu && club.menu.period.selectedID == period_selected" class="p-1">
                    <Disclosure v-for="team in classes" :key="team.gClassID" v-slot="{ open }">
                        <DisclosureButton
                            class="btn btn-primary bg-opacity-75 w-full flex justify-end flex-nowrap gap-3" :class="[
                                (team.gClassID !== teamClassID) ? 'my-1 rounded-lg' : 'rounded-b-none',
                            ]" @click="
    team.gClassID !== teamClassID
        ? (teamClassID = team.gClassID,
            open = true)
        : (teamClassID = null, open = false)
" :disabled="club.content.classes.find(c => c.gClassID === team.gClassID).games.every(element => element[Object.keys(element)[0]].length < 1)">
                            <div id="class-name" class="mr-auto">
                                <span class="sm:hidden block">{{ team.gClassSname }}</span>
                                <span class="hidden sm:block">{{ team.gClassLname }}</span>
                            </div>
                            <span id="class-info" class="text-secondary-content text-opacity-60 text-xs">
                                <span v-if="team.games.every(element => element[Object.keys(element)[0]].length < 1)">
                                    <span
                                        v-if="club.content.classes.find(c => c.gClassID === team.gClassID).games.every(element => element[Object.keys(element)[0]].length < 1)">
                                        spielfrei
                                    </span>
                                    <span v-else>
                                        Keine zukünftigen Spiele
                                    </span>
                                </span>
                                <div v-if="team.games[0][Object.keys(team.games[0])[0]].some(element => element.live)"
                                    class="rounded-full relative w-4 h-4">
                                    <div
                                        class="animate-ping absolute -mt-0.5 inline-flex h-4 w-4 rounded-full bg-red-500 opacity-75">
                                    </div>
                                    <div class="z-20 mx-auto my-auto mt-1 animate-none rounded-full h-3 w-3 bg-red-500">
                                    </div>
                                </div>
                            </span>
                            <ChevronUpIcon class="w-5 h-5 shrink-0" :class="[
                                open ? 'transform rotate-180' : '',
                                club.content.classes.find(c => c.gClassID === team.gClassID).games.every(element => element[Object.keys(element)[0]].length < 1) ? 'text-gray-500' : 'text-primary-content',
                            ]" />
                        </DisclosureButton>
                        <DisclosurePanel static v-show="team.gClassID === teamClassID"
                            class="px-4 pt-4 pb-2 text-sm bg-primary bg-opacity-20 rounded-b-lg">
                            <div v-for="(subTeam, index) in team.games" :key="Object.keys(subTeam)[0]">

                                <hr class="bg-gray-400 text-black h-[1.5px]" :class="index === 0 ? '-mt-3' : ''" />
                                <router-link v-if="Object.keys(subTeam)[0]" :to="
                                    'team#' +
                                    Object.keys(subTeam)[0] +
                                    ';' +
                                    team.gClassID +
                                    ';' +
                                    clubInfo.no
                                " class="ml-auto mr-0 w-fit block underline-offset-2 underline text-base-content hover:opacity-50">
                                    Zum Team</router-link>
                                <div id="league-info">
                                    <!-- Information about how many games and button to team component -->
                                </div>
                                <Match v-for="match in subTeam[Object.keys(subTeam)[0]]" :key="match.gID" :match="match"
                                    :teamID="Object.keys(subTeam)[0]" :teamClassID="team.gClassID"></Match>
                                <div id="no-data" v-show="!subTeam[Object.keys(subTeam)[0]].length" class="mb-2">
                                    <div id="no-future-matches" v-show="!showAll">
                                        Keine zukünftigen Spiele
                                    </div>
                                    <div v-show="showAll">
                                        Keine Spiele in dieser Klasse
                                    </div>
                                </div>
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                </div>
                <div v-else class="overflow-auto max-h-[50%] w-full mx-auto rounded-2xl">
                    <div v-for="i in 10" class="p-3 bg-gray-300 rounded-lg my-1 flex">
                        <div class="animate-pulse rounded-lg bg-gray-400 h-3 sm:w-44 w-16">
                        </div>
                        <div class="animate pulse rounded-full bg-gray-400 h-3 sm:w-44 w-3 ml-auto mr-2">
                        </div>
                    </div>

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
    RefreshIcon,
    StatusOfflineIcon,
    UserGroupIcon,
} from "@heroicons/vue/solid";
import { StarIcon as StarIconOutline, ShareIcon, GlobeAltIcon } from "@heroicons/vue/outline";
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

// helper components
import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Header from "./helpers/Header.vue";
import HeaderLoading from "./helpers/HeaderLoading.vue";
import Period from "./helpers/Period.vue";

// helper functions
import { fetchTeamID, fetchTeamGames, fetchClub, fetchClassGames } from "./functions/fetchData.js";
import { filterGames, isDark } from "./functions/misc.js";
const route = useRoute();

const img_loaded = ref(true);

const club_id = ref({});
const period_selected = ref(null);
const period_list = ref([]);
const club = ref({});
const clubInfo = ref({});
const loading = ref(false);
const loading_net = ref(false);
const offline = ref(false);

const classes = ref([]);

const props = defineProps(["club_no"]);
const teamClassID = ref(null);
const showAll = ref(false);

const is_dark = ref(isDark());

const emit = defineEmits(["updateFavorites", "disclosure-update"]);

club.value = {};

const elements = ref([]);

const updatePeriod = (id) => {
    period_selected.value = id;
    forceUpdate();
};




const hideOther = (id) => {
    const items = elements.value.filter((elm) => {
        return elm.getAttribute("data-id") !== id.toString();
    });
    items.forEach((elm) => elm.click());
};

const log = (message) => {
    console.log(message);
};

const fetchClubInfo = async () => {
    let club_num = "";
    if (props.club_no) {
        club_num = props.club_no;
    } else {
        club_num = route.hash.substring(1);
    }
    console.log("Club Num: " + club_num);
    if (localStorage.getItem("club_info_" + club_num)) {
        console.log("club_info_" + club_num + " found in localStorage");
        clubInfo.value = JSON.parse(localStorage.getItem("club_info_" + club_num));
        console.log("FETCHCLUBINFO: " + clubInfo.value.name);
        return;
    }

    // return if offline
    if (offline.value) {
        console.log("offline");
        return;
    }
    await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" +
        club_num
    )
        .then((response) => response.json())
        .then((data) => {
            clubInfo.value = data[0].searchResult.list[0];
            if (clubInfo.value.no != club_num) {
                data[0].searchResult.list.forEach((club) => {
                    if (club.no == club_num) {
                        clubInfo.value = club;
                    }
                });
            }
            localStorage.setItem("club_info_" + club_num, JSON.stringify(clubInfo.value));
        })
        .catch((error) => {
            //console.error("Error:", error);
            console.log("Probably no internet connection");
        });
    console.log("FETCHCLUBINFO: finished");
};


const updateFilter = (show) => {
    const all_classes = JSON.parse(JSON.stringify(club.value.content.classes));
    //console.log("Before:", JSON.stringify(club.value.content.classes).length);

    classes.value = all_classes.map((club_class) => {
        //console.log(club_class);
        club_class.games.map((team) => {
            //console.log("Team", team);
            team[Object.keys(team)[0]] = filterGames(team[Object.keys(team)[0]], show);
            //console.log(show);
            return team;
        })
        return club_class;
    });
    //console.log("After:", JSON.stringify(classes.value).length);
}


const fetchAddress = async () => {
    if (localStorage.getItem("club_addresses")) {
        console.log("club_addresses found in localStorage");
        clubInfo.value.webaddress = JSON.parse(localStorage.getItem("club_addresses"))[clubInfo.value.no];
        console.log("FETCHADDRESS: " + clubInfo.value.webaddress);
    }

    // return if offline
    if (offline.value) {
        console.log("offline");
        return;
    }
    fetch("/club_address.json")
        .then((response) => response.json())
        .then((data) => {
            clubInfo.value.webaddress = data[clubInfo.value.no];
            localStorage.setItem("club_addresses", JSON.stringify(data));
        })
        .catch((error) => {
            //console.error("Error:", error);
            console.log("Probably no internet connection");
        });
};

const updateShow = (period_default) => {
    console.log("Trying to fetch data from local storage");
    const name = "club_" + clubInfo.value.id + (!period_default ? "_" + period_selected.value : "");
    console.log("Name: " + name);
    if (localStorage.getItem(name)) {
        console.log("Loaded from localStorage");
        club.value = JSON.parse(localStorage.getItem(name));
        console.log("club_length:", JSON.stringify(club.value).length);
        updateFilter(showAll.value);
        loading.value = false;
    }
}

const initData = async () => {
    loading.value = true;
    loading_net.value = true;
    let period_default = false;
    console.log("before await");
    console.log("club_id:", club_id.value);
    console.log("selected period:", period_selected.value);

    if (!period_selected.value) {
        //The period is not selected, so the new period will be the default one
        console.log("Period default");
        period_default = true;
    }

    console.log("Trying to fetch data from local storage");
    if (localStorage.getItem("club_" + clubInfo.value.id + (!period_default ? "_" + period_selected.value : ""))) {
        console.log("Loaded from localStorage");
        club.value = JSON.parse(localStorage.getItem("club_" + clubInfo.value.id + (period_selected.value ? "_" + period_selected.value : "")));
        console.log("club_length:", JSON.stringify(club.value).length);
        updateFilter(showAll.value);
        period_selected.value = club.value.menu.period.selectedID;
        period_list.value = club.value.menu.period.list;
        loading.value = false;
    }

    // return if offline
    if (offline.value) {
        loading.value = false;
        loading_net.value = false;
        console.log("offline");
        return;
    }

    let club_json = await fetchClub(clubInfo.value.id, period_selected.value);
    let period = period_selected.value;
    period_list.value = club_json[0].menu.period.list;
    if (!period) {
        period = club_json[0].menu.period.selectedID;
    }
    console.log("This gets executed");
    club_json = club_json[0];

    period_selected.value = period;

    Promise.all(club_json.content.classes.map(async (club_class) => {

        const team_ids = await fetchTeamID(club_class.gClassID, club_json.head.name);
        //console.log(team_ids);
        //console.log(club_class.games);

        let class_teams = [];

        if (team_ids && team_ids.length > 0) {
            //fetch game for each team
            for (let team_id of team_ids) {
                const team_json = await fetchTeamGames(team_id, club_class.gClassID, null, true);
                let team_obj = {};
                team_obj[team_id] = team_json; //.reverse();    //reverse to get most recent games first
                class_teams.push(team_obj);
            }
            club_class.games = await class_teams;
        }
        else {
            let class_games = await fetchClassGames(club_class.gClassID, true);
            const result = class_games.filter(function (game) {
                if (game.gHomeTeam.includes(club_json.head.sname)) {
                    return true;
                }
                if (game.gGuestTeam.includes(club_json.head.sname)) {
                    return true;
                }
                return false;
            })
            club_class.games = [];
            club_class.games.push({ null: result });
        }
        return club_class;
    }))
        .then((data) => {
            let club_val = club_json;
            club_val.content.classes = data;
            const name = "club_" + clubInfo.value.id + (!period_default ? "_" + period : "");
            console.log("Saving as: " + name);
            localStorage.setItem(name, JSON.stringify(club_val));
            console.log("club_length:", JSON.stringify(club_val).length);
            console.log("club value: " + localStorage.getItem(name));
            updateShow(period_default);
            loading.value = false;
            loading_net.value = false;
        })
        .catch((error) => {
            console.error("Error:", error);
            console.log("Probably no internet connection");
            loading.value = false;
            loading_net.value = false;
            offline.value = true;
        });




}

const refreshData = async () => {
    console.log("Refreshing data");
    loading_net.value = true;
    Promise.all(club.value.content.classes.map(async (club_class) => {

        const team_ids = await fetchTeamID(club_class.gClassID, club.value.head.name);
        //console.log(team_ids);
        //console.log(club_class.games);

        let class_teams = [];

        if (team_ids && team_ids.length > 0) {
            //fetch game for each team
            for (let team_id of team_ids) {
                const team_json = await fetchTeamGames(team_id, club_class.gClassID, null, true);
                let team_obj = {};
                team_obj[team_id] = team_json; //.reverse();    //reverse to get most recent games first
                class_teams.push(team_obj);
            }
            club_class.games = await class_teams;
        }
        else {
            let class_games = await fetchClassGames(club_class.gClassID, true);
            const result = class_games.filter(function (game) {
                if (game.gHomeTeam.includes(club.value.head.sname)) {
                    return true;
                }
                if (game.gGuestTeam.includes(club.value.head.sname)) {
                    return true;
                }
                return false;
            })
            club_class.games = [];
            club_class.games.push({ null: result });
        }
        return club_class;
    }))
        .then((data) => {
            club.value.content.classes = data;
            localStorage.setItem("club_" + clubInfo.value.id, JSON.stringify(club.value));
            updateFilter(showAll.value);
            loading.value = false;
            loading_net.value = false;
        });
}



const club_no_ref = toRef(props, "club_no");
watch(club_no_ref, async (newValue, oldValue) => {
    console.log("update club");
    if (newValue) {
        forceUpdate();
    }
});

offline.value = !navigator.onLine;
window.addEventListener('online', () => {
    console.log("online");
    offline.value = false;
    refreshData();
});
window.addEventListener('offline', () => {
    console.log("offline");
    offline.value = true;
});

onMounted(async () => {
    is_dark.value = isDark();
    await fetchClubInfo();
    console.log("ClubInfo No: " + clubInfo.value.no);
    console.log("ClubInfo: " + JSON.stringify(clubInfo.value));
    fetchAddress();
    await initData();
});

const forceUpdate = async () => {
    await fetchClubInfo();
    console.log("ClubInfo: " + JSON.stringify(clubInfo.value));
    fetchAddress();
    await initData();
};

</script>

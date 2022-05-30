<template>
    <div class="w-full h-full">
        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Verein</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">
                Spielübersicht
            </p>
        </div>
        <div id="club-header" class="grid w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative">
            <Header v-if="club" :type="'club'" :club="clubInfo" :club_id="clubInfo.no"
                @updateFavorites="emit('updateFavorites')"></Header>
            <HeaderLoading v-else />
            <div id="club-content" class="flex mb-5">
                <!-- {{ JSON.stringify(club).length }} -->
                <img v-if="clubInfo" :src="'logos/clubs/' + clubInfo.no + '.png'" alt=""
                    class="w-1/3 ml-5 rounded-lg border border-gray-500" />

                <div v-else>Loading...</div>
                <div id="club-info" class=" m-5 line-clamp-4 break-words">
                    <div class="font-bold">
                        {{ clubInfo.lname }}
                    </div>
                    <div class="text-gray-800">Postleitzahl: {{ clubInfo.postal }}</div>
                    <div class="text-gray-800">Nummer: {{ clubInfo.no }}</div>
                </div>
                <a class="absolute bottom-5 right-5 underline text-indigo-500 hover:text-indigo-800"
                    :href="'http://' + clubInfo.webaddress">{{ clubInfo.webaddress }}</a>
            </div>
        </div>
        <div class="w-5/6 m-auto pb-24">
            <div class="mt-3 flex flex-wrap">
                <h2 class="font-bold text-lg m-1">Spiele</h2>
                <Period class="sm:ml-5 ml-2 mr-auto" @updatePeriod="(id) => updatePeriod(id)" :loading="loading"
                    :selected="period_selected" :list="period_list" />
                <div class="text-sm m-2 mr-5 flex">
                    Alle
                    <span class="sm:block hidden ml-1">
                        Spiele
                    </span>
                    <input class="ml-1 mt-0.5 rounded" type="checkbox" name="" id=""
                        @click="showAll = !showAll, updateFilter(showAll)" />
                </div>
                <div v-if="loading_net">
                    <svg class="animate-spin mt-2 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </div>
                <div v-else class="flex items-center">
                    <button v-if="!offline" @click="refreshData"
                        class="hover:bg-indigo-200 rounded mt-2 text-indigo-500 hover:text-indigo-900">
                        <RefreshIcon class="h-5" />
                    </button>
                    <Popover v-else class="relative">
                        <PopoverButton>
                            <InformationCircleIcon class="h-5 text-red-600" />
                        </PopoverButton>

                        <PopoverPanel
                            class="absolute z-10 bg-indigo-200 rounded-lg p-2 shadow-2xl border-indigo-300 border-1">
                            <StatusOfflineIcon class="h-7" />
                            <p class="text-sm">
                                Du bist offline. Dir werden zuvor gespeicherte Daten gezeigt.
                            </p>
                        </PopoverPanel>
                    </Popover>

                </div>
            </div>
            <div v-if="!loading"
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2">
                <Disclosure v-for="team in classes" :key="team.gClassID" v-slot="{ open }">
                    <DisclosureButton
                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 disabled:bg-gray-200 disabled:text-gray-500"
                        :class="[
                            (team.gClassID !== teamClassID) ? 'my-1 rounded-lg' : '',
                        ]" @click="
    team.gClassID !== teamClassID
        ? (teamClassID = team.gClassID,
            open = true)
        : (teamClassID = null, open = false)
" :disabled="club.content.classes.find(c => c.gClassID === team.gClassID).games.every(element => element[Object.keys(element)[0]].length < 1)">
                        <span class="sm:hidden block">{{ team.gClassSname }}</span>
                        <span class="hidden sm:block">{{ team.gClassLname }}</span>
                        <span id="league-info" class="ml-auto mr-5 text-gray-500 text-xs">
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
                        <ChevronUpIcon class="w-5 h-5" :class="[
                            open ? 'transform rotate-180' : '',
                            club.content.classes.find(c => c.gClassID === team.gClassID).games.every(element => element[Object.keys(element)[0]].length < 1) ? 'text-gray-500' : 'text-indigo-900',
                        ]" />
                    </DisclosureButton>
                    <DisclosurePanel static v-show="team.gClassID === teamClassID"
                        class="px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg">
                        <div v-for="(subTeam, index) in team.games" :key="Object.keys(subTeam)[0]">

                            <hr class="bg-gray-400 text-black h-[1.5px]" :class="index === 0 ? '-mt-3' : ''" />
                            <router-link v-if="Object.keys(subTeam)[0]" :to="
                                'team#' +
                                Object.keys(subTeam)[0] +
                                ';' +
                                team.gClassID +
                                ';' +
                                clubInfo.no
                            "
                                class="ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900">
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
            <div v-else
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2">
                <div v-for="i in 10" class="p-3 bg-gray-300 rounded-lg my-1 flex">
                    <div class="animate-pulse rounded-lg bg-gray-400 h-3 sm:w-44 w-16">
                    </div>
                    <div class="animate pulse rounded-full bg-gray-400 h-3 sm:w-44 w-3 ml-auto mr-2">
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
} from "@heroicons/vue/solid";
import { StarIcon as StarIconOutline, ShareIcon } from "@heroicons/vue/outline";
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

// helper components
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Header from "./helpers/Header.vue";
import HeaderLoading from "./helpers/HeaderLoading.vue";
import Period from "./helpers/Period.vue";

// helper functions
import { fetchTeamID, fetchTeamGames, fetchClub, fetchClassGames } from "./functions/fetchData.js";
import { filterGames } from "./functions/misc.js";
const route = useRoute();

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
            offline.value = true;
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
        club.value.webadress = JSON.parse(localStorage.getItem("club_addresses"))[clubInfo.value.club_no];
    }
    fetch("/club_address.json")
        .then((response) => response.json())
        .then((data) => {
            club.value.webadress = data[clubInfo.value.club_no];
            localStorage.setItem("club_addresses", JSON.stringify(data));
        })
        .catch((error) => {
            //console.error("Error:", error);
            console.log("Probably no internet connection");
        });
};

const updateShow = () => {
    let period_default = false;
    if (!period_selected.value) {
        //The period is not selected, so the new period will be the default one
        period_default = true;
    }
    console.log("Trying to fetch data from local storage");
    if (localStorage.getItem("club_" + clubInfo.value.id + (!period_default ? "_" + period_selected.value : ""))) {
        console.log("Loaded from localStorage");
        club.value = JSON.parse(localStorage.getItem("club_" + clubInfo.value.id + (period_selected.value ? "_" + period_selected.value : "")));
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
            updateShow();
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

watch(club, async (newValue, oldValue) => {
    //console.log("updated club", JSON.stringify(newValue).length);
});

onMounted(async () => {
    await fetchClubInfo();
    console.log("ClubInfo No: " + clubInfo.value.no);
    fetchAddress();
    await initData();
});

const forceUpdate = async () => {
    await fetchClubInfo();
    fetchAddress();
    await initData();
};
</script>

<template>
    <div class="w-full grid gap-4">
        <NavBar title="Verein" subtitle="Spielübersicht" />
        <div id="club-header" class="grid w-5/6 m-auto relative bg-base-100 card shadow-xl">
            <Header v-if="club" :type="'club'" :club="club" :club_id="club.no"
                @updateFavorites="emit('updateFavorites')"></Header>
            <HeaderLoading v-else />

            <div id="content" class="flex flex-wrap mb-5">
                <img v-if="club && club.no && img_loaded" :src="'logos/clubs/' + club.no + '.png'"
                    @error="img_loaded = false" alt="" id="club-logo" class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg" />

                <div v-else class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg shadow-2xl bg-gray-200">
                    <UserGroupIcon class="text-gray-500 h-full" />
                </div>
                <div id="club-info" class="m-5">
                    <div class="font-bold">
                        {{ club.lname }}
                    </div>
                    <div class="text-base-content">Postleitzahl: {{ club.postal }}</div>
                    <div class="text-base-content">Nummer: {{ club.no }}</div>
                    <div class="absolute bottom-5 right-5 flex items-center gap-1 text-base-content hover:text-accent">
                        <GlobeAltIcon class="h-5" />
                        <a class=" underline mb-1" :href="'http://' + club.webaddress">{{
                            club.webaddress
                        }}</a>
                    </div>

                </div>
            </div>
        </div>
        <div class="w-5/6 m-auto p-2 mb-4 card bg-base-100 shadow-xl overflow-hidden">
            <div class="mt-3 flex flex-wrap">
                <h2 class="font-bold text-lg m-1">Spiele</h2>
                <Period class="sm:ml-5 ml-2 mr-auto" @updatePeriod="(id) => loadClub(id)" :loading="loading"
                    :selected="period_selected" :list="period_list" />
                <div class="form-control mr-5">
                    <label class="label cursor-pointer flex gap-1">
                        <span class="label-text">Alle</span>
                        <span class="label-text sm:block hidden">
                            Spiele
                        </span>
                        <input type="checkbox" class="checkbox checkbox-sm"
                            @click="showAll = !showAll, showClass(activeClass.id)" />
                    </label>
                </div>
                <div class="flex items-center">
                    <button v-if="!netError" @click="loadClub()" class="btn btn-sm btn-square"
                        :class="loading ? 'loading disabled' : ''">
                        <ArrowPathIcon v-if="!loading" class="h-4" />
                    </button>
                    <Popover v-else class="relative">
                        <PopoverButton class="flex items-center btn btn-sm btn-square">
                            <ExclamationCircleIcon class="h-5 text-red-600" />
                        </PopoverButton>

                        <PopoverPanel
                            class="right-0 absolute z-10 bg-base-100 outline-1 w-20 outline outline-indigo-200 rounded-lg p-2 shadow-2xl border-indigo-300 border-1">
                            <p class="text-xs">
                                Du hast die maximale Anzahl an Anfragen erreicht. Bitte versuche es später noch einmal.
                            </p>
                        </PopoverPanel>
                    </Popover>
                </div>
            </div>


            <!-- Debugging: -->
            <!-- {{ club.menu ? club.menu.period.selectedID == period_selected : 'error'}} -->
            <!-- v-if="!loading && club.menu && club.menu.period.selectedID == period_selected" -->
            <div v-if="true" class="p-1">
                <Disclosure v-for="item in classes" v-slot="{ open }">
                    <div class="bg-primary items-center text-primary-content content-center p-0 rounded-md uppercase flex text-sm font-bold justify-between bg-opacity-75 w-full flex-nowrap gap-3 pl-3 my-1"
                        :class="[open ? 'rounded-b-none mb-0' : '']">
                        <div id="class-name" class="mr-auto my-auto">
                            <a :href="'/league#' + item.gClassID" class="link link-hover"><span
                                    class="h-fit my-auto sm:hidden block">{{
                                        item.gClassSname
                                    }}</span></a>
                            <a :href="'/league#' + item.gClassID" class="link link-hover"><span
                                    class="h-fit my-auto hidden sm:block">{{
                                        item.gClassLname
                                    }}</span></a>
                        </div>
                        <span id="league-info"
                            class="ml-auto h-fit my-auto text-primary-content mr-5 text-gray-500 text-xs">
                            <span class="h-fit" v-if="item.games.length < 1">
                            </span>
                        </span>
                        <!-- live animation if live -->
                        <!-- Live animation -->
                        <div v-show="checkLive(item.gClassID)" class="rounded-full w-4 h-4">
                            <div class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-500 opacity-75">
                            </div>
                            <div class="z-20 mx-auto my-auto animate-none rounded-full h-3 w-3 bg-red-500"></div>
                        </div>

                        <DisclosureButton @click="!open ? showClass(item.gClassID) : ''"
                            class="btn btn-primary bg-opacity-75 flex justify-end flex-nowrap gap-3"
                            :class="[open ? 'rounded-b-none mb-0' : '']">
                            <ChevronUpIcon class="w-5 h-5 shrink-0" :class="[
                                open ? 'transform rotate-180' : ''
                            ]" />
                        </DisclosureButton>

                    </div>
                    <DisclosurePanel static v-show="item.gClassID == activeClass.id && open"
                        class="px-4 pt-4 pb-2 text-sm bg-primary bg-opacity-20 rounded-b">
                        <div v-if="!loadingGames">
                            <div v-for="team in activeClass.games">
                                <div id="league-info" class="flex">
                                    {{ activeClass.games[0][Object.keys(activeClass.games)[0]] }}
                                    {{ activeClass.id }}
                                    {{ Object.keys(team)[0] }}

                                    <!-- Information about how many games and button to team component -->
                                    <router-link v-if="Object.keys(team)[0] && !loadingGames"
                                        :to="'/team#' + Object.keys(team)[0] + ';' + activeClass.id + ';' + club.no"
                                        class=" ml-auto mr-0 w-fit block underline-offset-2 underline text-base-content
                                hover:opacity-50">
                                        Zum Team</router-link>
                                </div>



                                <Match v-for="game in team[Object.keys(team)[0]]" :match="game" :key="game.gID"
                                    :teamID="Object.keys(team)[0]" :teamClassID="activeClass.id" :id="game.gID">
                                </Match>
                                <div id="no-data" v-show="false" class="mb-2">
                                    <div id="no-future-matches" v-show="!showAll">
                                        Keine zukünftigen Spiele
                                    </div>
                                    <div v-show="showAll">
                                        Keine Spiele in dieser Klasse
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div id="league-info">
                                <!-- Information about how many games and button to team component -->
                                <div class="w-10 h-5"></div>
                            </div>
                            <MatchLoading v-for=" i in 4">
                            </MatchLoading>
                        </div>

                    </DisclosurePanel>
                </Disclosure>
            </div>
            <div v-else class="overflow-auto max-h-[50%] w-full mx-auto rounded-2xl">
                <div v-for="i in 10" class="p-4 bg-base-300 rounded-lg my-1 flex">
                    <div class="animate-pulse rounded-full bg-base-100 h-4 sm:w-44 w-16">
                    </div>
                    <div class="animate-pulse rounded-full bg-base-100 h-4 sm:w-44 w-3 ml-auto mr-2">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { fetchTeamID, fetchClub, fetchTeamGames2 } from './functions/fetchData';
import { useRoute } from 'vue-router';

import {
    ChevronUpIcon,
    StarIcon,
    ClockIcon,
    MapPinIcon,
    InformationCircleIcon,
    ArrowPathIcon,
    UserGroupIcon,
} from "@heroicons/vue/24/solid";
import { StarIcon as StarIconOutline, ShareIcon, GlobeAltIcon, ExclamationCircleIcon } from "@heroicons/vue/24/outline";

import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";


// helper components
import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Header from "./helpers/Header.vue";
import HeaderLoading from "./helpers/HeaderLoading.vue";
import Period from "./helpers/Period.vue";

import { getClosestDate } from "./functions/misc.js";

// Variables
const classes = ref([]); // Classes for this club
const activeClass = ref({}); // Class ID for the opened class
const teamIDs = ref([]); // Team IDs for the opened class
const club = ref({}); // Club data
const showAll = ref(false); // Show all games
const closestGameID = ref(); // Closest game ID

// Period variables
const period_selected = ref(); // Selected period
const period_list = ref([]); // Period list


//loading states
const loadingGames = ref(false);
const img_loaded = ref(true);
const loading = ref(false);
const netError = ref(false);

const route = useRoute();

// Old variables
const props = defineProps(["club_id"]);


const data = ref([]);

const clubExample = {
    id: 170,
    name: 'Hbi Weilimdorf/Feuerbach',
}

// Get class after id from classes and check if any game is live
const checkLive = (id) => {
    console.log("checkLive");
    console.log(id);
    const classData = classes.value.find((item) => item.gClassID == id);
    console.log(classData);
    if (classData) {
        return classData.games.some((game) => game.live == true);
    }
    return false;
};



onMounted(() => {
    console.log("Hello World");

    // Set club id
    if (props.club_id) {
        club.value.id = props.club_id;
    } else {
        club.value.id = route.hash.substring(1);
    }
    loadClub();
    // Then fetch the team ID on button press
});


const loadClub = async (period_id) => {
    // First fetch the club classes
    loading.value = true;
    if (!period_id) {
        period_id = period_selected.value;
    }
    fetchClub(club.value.id, period_id).then((data) => {
        // Set period list
        period_list.value = data[0].menu.period.list;
        period_selected.value = data[0].menu.period.selectedID;

        // Set the classes
        const classes_raw = data[0].content.classes;
        classes.value = classes_raw;
        // Set club name
        club.value.lname = data[0].head.name;
        fetchClubInfo();
        loading.value = false;
    })
        .catch((error) => {
            console.log(error);
            loading.value = false;
            netError.value = true;
        });
}

const showClass = (class_id) => {
    loadingGames.value = true;
    activeClass.value.id = class_id;

    // Fetch the team ID
    fetchTeamID(activeClass.value.id, club.value.lname).then(async (data) => {
        teamIDs.value = data;

        // Fetch the games
        let teams = [];
        if (!teamIDs.value || teamIDs.value.length < 1) {
            const games = await fetchTeamGames2(undefined, activeClass.value.id, showAll.value);
            teams = [{ [undefined]: games }];
        }
        else {
            teams = await teamIDs.value.map(async (teamID) => {
                const games = await fetchTeamGames2(teamID, activeClass.value.id, showAll.value);
                return { [teamID]: games };
            });
        }
        activeClass.value.games = await Promise.all(teams);

        // check which game is the nearest in terms of time
        const closestGame = getClosestDate(activeClass.value.games);
        console.log(String(closestGame.gID));
        closestGameID.value = String(closestGame.gID);
        loadingGames.value = false;
        setTimeout(() => {
            try {
                console.log("Scrolling to: " + closestGameID.value);
                document.getElementById(closestGameID.value).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            }
            catch (error) {
                console.log(error);
            }
        }, 200);
    })
        .catch(error => {
            console.log(error);
            loadingGames.value = false;
            netError.value = true;
        });
};

const fetchClubInfo = async () => {
    try {
        const response = await fetch(
            "https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" + club.value.lname
        );
        const data = await response.json();
        const club_info = data[0].searchResult.list.filter((res) => {
            return res.id == club.value.id;
        });
        club.value = await club_info[0];
        console.log(club.value);
    }
    catch (error) {
        console.log(error);
        netError.value = true;
    };
};


onUpdated(() => {
    console.log("updated");
    //document.getElementById(closestGameID.value).scrollIntoView({ behavior: 'smooth' });
});

</script>
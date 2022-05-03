<template>
    <Head>
        <meta name="description" :content="'Handballspiel am ' + game.gDate + ', ' + game.gHomeTeam + 'gegen' + game.gGuestTeam">

        <!-- Social -->
        <meta property="og:title" content="Handballspiel">
        <meta id="og_description" property="og:description" :content="'Handballspiel am ' + game.gDate + ', ' + game.gHomeTeam + ' gegen ' + game.gGuestTeam">
        <meta property="og:image" content="og.png">
        <meta property="og:url" :content="$location.href">

        <!-- Twitter -->
        <meta name="twitter:title" content="Handballspiel">
        <meta name="twitter:description" :content="'Handballspiel am ' + game.gDate + ', ' + game.gHomeTeam + ' gegen ' + game.gGuestTeam">
        <meta name="twitter:image" content="og.png">
        <meta name="twitter:card" content="summary_large_image">
    </Head>
    <div class="w-full h-full">
        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Spiel</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">Info</p>
        </div>
        <div id="game-header" class="grid w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative">
            <Header v-if="!loading" :type="'match'" :game="game" :game_id="gameID" :team_id="teamID"
                :class_id="teamClassID"></Header>
            <HeaderLoading v-else />

            <div id="game-info" class="">
                <div class="justify-center mx-2">
                    <div v-if="!loading" class="font-bold text-base sm:text-2xl">
                            <div class="flex items-center">
                                <div class="w-1/2 text-center">
                            {{ game.gHomeTeam }}
                        </div>
                        <div class="text-center h-min">
                            :
                        </div>
                        <div class="w-1/2 text-center">
                            {{ game.gGuestTeam }}
                        </div>
                            </div>
                    </div>
                    <div v-else class="flex font-bold text-xl sm:text-2xl rounded animate-pulse">
                        <div class="h-8 w-24 mx-1 bg-gray-400 rounded-lg">

                        </div>
                        :
                        <div class="h-8 w-24 mx-1 bg-gray-400 rounded-lg"></div>
                    </div>

                    <div v-if="!loading" class="ml-2 text-sm sm:text-base">
                        {{ scores.head.name }}
                    </div>
                    <span v-else class="rounded h-4 w-40 bg-gray-300 m-1 animate-pulse"></span>
                </div>
                <div id="game-class" class="text-md sm:text-sl justify-center flex"></div>
                <div class="font-bold text-3xl sm:text-4xl my-4 justify-center flex" v-if="!loading">
                    {{
                        !loading && tickerScore && tickerScore.gameScore && tickerScore.gameScore.home_score
                            ?  tickerScore.gameScore.home_score
                            : game.gHomeGoals
                    }}
                    :
                    {{
                        !loading && tickerScore && tickerScore.gameScore && tickerScore.gameScore.guest_score
                            ?  tickerScore.gameScore.guest_score
                            : game.gGuestGoals
                    }}
                </div>
                <div v-else class="font-bold text-3xl sm:text-4xl my-4 justify-center flex animate-pulse">
                    <div class="h-8 w-10 bg-gray-300 rounded-lg mt-2 mx-1">

                    </div>
                    :
                    <div class="h-8 w-10 bg-gray-300 rounded-lg mt-2 mx-1">

                    </div>
                </div>
                <div class="m-1 sm:m-5">
                    <div v-if="game">
                        <Maps class="w-full" :location="
                            game.gGymnasiumName +
                            '+' +
                            game.gGymnasiumStreet +
                            '+' +
                            game.gGymnasiumPostal +
                            '+' +
                            game.gGymnasiumTown
                        " :name="game.gGymnasiumName" :town="game.gGymnasiumTown" :id="game.gGymnasiumID" />
                    </div>
                    <MapsLoading v-else class="w-full" />
                </div>
            </div>
        </div>
        <div id="wrapper" class="pb-24">
            <Ticker v-if="game && !loading" ref="tickerScore" :game_token="game.gToken" :game_live="game.live" />
            <div id="scores" class="w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2">
                <div v-show="loading ? true : scores.content.score.length" class="flex mt-1">
                    <span class="font-bold ml-2"> Tabelle </span>
                    <span class="hidden sm:block ml-auto mr-9"> Tore </span>
                    <span class="sm:ml-0 ml-auto mr-5"> Spiele </span>
                    <span class="mr-2"> Punkte </span>
                    <span class="sm:block hidden">+/-</span>
                </div>
                <div v-if="loading">
                    <TableLoading v-for="i in 10" :key="i"> </TableLoading>
                </div>
                <div v-else>
                    <Table v-for="team_score in scores.content.score" :key="team_score.tabTeamID"
                        :team_score="team_score">
                    </Table>
                </div>
            </div>
            <div class="w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-10 p-1">
                <div class="mt-3 flex justify-between">
                    <h2 class="font-bold text-base m-1">
                        Spiele in dieser Klasse
                    </h2>
                    <div class="text-sm m-2">
                        Alle Spiele
                        <input class="ml-1 mb-1 rounded" type="checkbox" name="" id="" v-model="showAll"
                            @click="teamClassID ? getData(teamClassID) : null" />
                    </div>
                </div>
                <ClassGames v-if="!loading" :games="classGames" :loading="loading" :showAll="showAll"
                    :teamClassID="teamClassID" @gameUpdate="(gID, tID, cID) => forceUpdate(gID, tID, cID)"></ClassGames>
                <ClassGamesLoading v-else />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref, toRef } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";

//helper components
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Table from "./helpers/Table.vue";
import TableLoading from "./helpers/TableLoading.vue";
import Maps from "./helpers/Maps.vue";
import MapsLoading from "./helpers/MapsLoading.vue";
import Ticker from "./helpers/Ticker.vue";
import Header from "./helpers/Header.vue";
import HeaderLoading from "./helpers/HeaderLoading.vue";
import ClassGames from "./helpers/ClassGames.vue";
import ClassGamesLoading from "./helpers/ClassGamesLoading.vue";

//Head component
import { Head } from '@vueuse/head';

import {
    ChevronUpIcon,
    StarIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
} from "@heroicons/vue/solid";
import { ShareIcon, ClockIcon, XCircleIcon } from "@heroicons/vue/outline";
import { StarIcon as StarIconOutline } from "@heroicons/vue/outline";
import {
    UserGroupIcon,
    DocumentIcon,
    AnnotationIcon,
} from "@heroicons/vue/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

// helper functions
import {
    fetchClassGames,
    fetchClass,
    fetchTeam,
    fetchTeamGames,
} from "./functions/fetchData.js";
import { filterGames } from "./functions/misc.js";

const route = useRoute();
const props = defineProps(["team_id", "team_class", "game_id"]);

const games = ref([]);
const scores = ref({});
const loading = ref(true);
const game = ref({});

const classGames = ref([]);
const showAll = ref(false);

const tickerScore = ref(null);

const pressText = ref({});
const showText = ref(false);

const teamClassID = ref(null);
const teamID = ref(null);
const gameID = ref(null);

const game_id_ref = toRef(props, "game_id");
watch(game_id_ref, async (newValue, oldValue) => {
    console.log("update game");
    if (newValue) {
        forceUpdate();
    }
});

// needs game id, team id, class id and club no
const setGameID = async () => {
    if (props.game_id && props.team_id && props.team_class) {
        console.log("props");
        gameID.value = props.game_id;
        teamID.value = props.team_id;
        teamClassID.value = props.team_class;
    } else {
        const hash = route.hash.substring(1);
        const params = hash.split(";");
        gameID.value = params[0];
        teamID.value = params[1];
        teamClassID.value = params[2];
    }
    //console.log("gameID: " + gameID.value);
    //console.log("teamID: " + teamID.value);
    //console.log("teamClassID: " + teamClassID.value);
};

const getData = async () => {
    loading.value = true;
    games.value = await fetchClassGames(teamClassID.value, true);
    console.log("games value");
    console.log(games.value);
    classGames.value = games.value
    classGames.value = filterGames(classGames.value, showAll.value);
    //classGames.value = classGames.value.reverse();  // 
    console.log(teamID.value);
    if (teamID.value && teamID.value != "null" && teamID.value != "undefined") {
        games.value = await fetchTeamGames(
            teamID.value,
            teamClassID.value,
            [],
            true
        );
    }

    scores.value = await fetchClass(teamClassID.value);
    console.log(games.value);
    game.value = games.value.find((game) => game.gID === gameID.value);
    console.log(gameID.value);
    console.log(games.value);
    console.log(game.value);
    loading.value = false;
};

const forceUpdate = async (gID, tID, cID) => {
    console.log("force update");
    console.log(gID);
    console.log(tID);
    console.log(cID);

    gameID.value = gID;
    teamID.value = tID;
    teamClassID.value = cID;
    await getData();
};


onMounted(async () => {
    await setGameID();
    await getData();
});
</script>

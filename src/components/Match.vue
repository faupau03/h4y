<template><!-- <Head>
        <meta name="description"
            :content="'Handballspiel am ' + game.gDate + ', ' + game.gHomeTeam + 'gegen' + game.gGuestTeam">

        <meta property="og:title" content="Handballspiel">
        <meta id="og_description" property="og:description"
            :content="'Handballspiel am ' + game.gDate + ', ' + game.gHomeTeam + ' gegen ' + game.gGuestTeam">
        <meta property="og:image" content="og.png">
        <meta property="og:url" :content="$location.href">

        <meta name="twitter:title" content="Handballspiel">
        <meta name="twitter:description"
            :content="'Handballspiel am ' + game.gDate + ', ' + game.gHomeTeam + ' gegen ' + game.gGuestTeam">
        <meta name="twitter:image" content="og.png">
        <meta name="twitter:card" content="summary_large_image">
    </Head> -->
        <div class="w-full grid gap-4">
            <NavBar title="Spiel" subtitle="Info" class="" />
            <div id="game-header" class="card grid mx-4 sm:mx-10 shadow-xl bg-base-100 relative">
                <Header v-if="!loading" :type="'match'" :title="scores.head.name" :game="game" :game_id="gameID"
                    :team_id="teamID" :class_id="teamClassID" :net_error="netError"></Header>
                <HeaderLoading :net_error="netError" v-else />

                <div id="game-info" class="">
                    <div class="justify-center mx-2">
                        <div v-if="!loading" class="font-bold text-base sm:text-2xl">
                            <div id="title" class="flex sm:hidden font-bold text-sm truncate">
                                {{ scores.head.name }}
                            </div>
                            <div class="flex justify-center w-full">
                                <div class="flex flex-wrap justify-items-center w-fit items-center">
                                    <div class="text-right sm:px-10 xs:px-2 flex flex-wrap">
                                        {{ game.gHomeTeam }}
                                    </div>
                                    <div class="text-center h-min">
                                        :
                                    </div>
                                    <div class="text-left sm:px-10 xs:px-2 text-clip">
                                        {{ game.gGuestTeam }}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div v-else class="flex w-full font-bold justify-center text-xl sm:text-2xl animate-pulse">
                            <div class="h-8 w-24 mx-1 bg-gray-300 rounded-lg"></div>
                            :
                            <div class="h-8 w-24 mx-1 bg-gray-300 rounded-lg"></div>
                        </div>

                    </div>
                    <div id="game-class" class="text-md sm:text-sl justify-center flex"></div>
                    <div class="font-bold text-3xl sm:text-4xl mt-4 justify-center flex" v-if="!loading">
                        {{
                            !loading && tickerScore && tickerScore.gameScore && tickerScore.gameScore.home_score
                            ? tickerScore.gameScore.home_score
                            : game.gHomeGoals
                        }}
                        :
                        {{
                            !loading && tickerScore && tickerScore.gameScore && tickerScore.gameScore.guest_score
                            ? tickerScore.gameScore.guest_score
                            : game.gGuestGoals
                        }}
                    </div>
                    <div class="text-2xl sm:text-xl justify-center flex" v-if="!loading">
                        {{
                            !loading && tickerScore && tickerScore.gameScore && tickerScore.gameScore.home_score
                            ? tickerScore.gameScore.home_score_1
                            : game.gHomeGoals_1
                        }}
                        :
                        {{
                            !loading && tickerScore && tickerScore.gameScore && tickerScore.gameScore.guest_score
                            ? tickerScore.gameScore.guest_score_1
                            : game.gGuestGoals_1
                        }}
                    </div>
                    <div v-else class="font-bold text-3xl sm:text-4xl my-4 justify-center flex animate-pulse">
                        <div class="h-8 w-10 bg-gray-300 rounded-lg mt-2 mx-1">

                        </div>
                        :
                        <div class="h-8 w-10 bg-gray-300 rounded-lg mt-2 mx-1">

                        </div>
                    </div>
                    <div class="flex flex-wrap mx-1 gap-1 sm:m-5 justify-between">
                        <div class="flex text-sm gap-3">
                            <div class="flex">
                                <InformationCircleIcon v-if="game.gComment && game.gComment.length > 1" class="h-5" />
                                {{ game.gComment }}
                            </div>
                            <div class="flex">
                                <UserCircleIcon v-show="game.gReferee && game.gReferee.length > 1" class="h-5" />
                                {{ game.gReferee }}
                            </div>

                        </div>
                        <div v-if="game">
                            <Maps class="" :location="
                                game.gGymnasiumName +
                                '+' +
                                game.gGymnasiumStreet +
                                '+' +
                                game.gGymnasiumPostal +
                                '+' +
                                game.gGymnasiumTown
                            " :name="game.gGymnasiumName" :town="game.gGymnasiumTown" :id="game.gGymnasiumID" />
                        </div>
                        <MapsLoading v-else class="" />
                    </div>
                </div>
            </div>
            <Ticker v-if="game && !loading" ref="tickerScore" :game_token="game.gToken" :game_live="game.live"
                @fullscreen="(x) => x ? fullscreen = true : fullscreen = false" />
            <div id="scores" class="card bg-base-100 mx-4 sm:mx-10 shadow-xl relative p-2">
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
                    <Table v-for="team_score in scores.content.score" :key="team_score.tabTeamID" :team_score="team_score"
                        @clickedTeam="clickedTeam">
                    </Table>
                </div>
                <!-- Additional information -->
                <div v-if="!loading" class="text-xs p-1">
                    <div v-for="comment in scores.content.scoreComments" v-html="comment">
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 mx-4 sm:mx-10 shadow-xl relative p-2 mb-4">
                <div class="mt-3 flex justify-between">
                    <h2 class="font-bold text-base m-1">
                        Spiele in dieser Klasse
                    </h2>
                    <Cal class="ml-auto mr-1 mt-1" :games="classGames"
                        :name="scores.head ? scores.head.name + (showAll ? ' (Alle Spiele)' : '') : ''" type="multiple" />
                    <div class="text-sm m-2">
                        Alle Spiele
                        <input class="ml-1 mb-1 rounded" type="checkbox" name="" id="" v-model="showAll"
                            @click="teamClassID ? getData(teamClassID) : null" />
                    </div>
                </div>
                <ClassGames v-if="!loading" :games="classGames" :loading="loading" :showAll="showAll" :teamClassID="teamClassID"
                    @gameUpdate="(gID, tID, cID) => forceUpdate(gID, tID, cID)"></ClassGames>
                <ClassGamesLoading v-else />
            </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, toRef } from "vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

//helper components
import NavBar from "./helpers/NavBar.vue";
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
import Cal from "./helpers/Cal.vue";


//Head component
import { Head } from '@vueuse/head';

import {
    ChevronUpIcon,
    StarIcon,
    MapPinIcon,
    InformationCircleIcon,
} from "@heroicons/vue/24/solid";
import { ShareIcon, ClockIcon, XCircleIcon, UserCircleIcon } from "@heroicons/vue/24/outline";
import { StarIcon as StarIconOutline } from "@heroicons/vue/24/outline";
import {
    UserGroupIcon,
    DocumentIcon,
    ChatBubbleBottomCenterTextIcon,
} from "@heroicons/vue/24/solid";
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
const router = useRouter();

const props = defineProps(["team_id", "team_class", "game_id"]);

const games = ref([]);
const scores = ref({});
const loading = ref(true);
const game = ref({});
const netError = ref(false);

const classGames = ref([]);
const showAll = ref(false);

const tickerScore = ref(null);
const fullscreen = ref(false);
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
};

const getData = async () => {
    loading.value = true;
    await fetchClassGames(teamClassID.value, true)
        .then((data) => {
            games.value = data;
        })
        .catch((error) => {
            console.log(error);
            netError.value = true;
        });
    classGames.value = games.value
    classGames.value = filterGames(classGames.value, showAll.value);

    if (teamID.value && teamID.value != "null" && teamID.value != "undefined") {
        games.value = await fetchTeamGames(
            teamID.value,
            teamClassID.value,
            [],
            true
        );
    }

    scores.value = await fetchClass(teamClassID.value);
    game.value = games.value.find((game) => game.gID === gameID.value);
    loading.value = false;
};


const clickedTeam = async (team_name) => {
    console.log("clickedTeam: " + team_name);
    console.log(isNaN(team_name.substring(team_name.length)))
    if (!isNaN(team_name.substring(team_name.length))) {
        team_name = team_name.substring(0, team_name.length - 2);
    }
    await router.push({
        path: "/team",
        hash: "#" + teamID.value + ";" + teamClassID.value + ";" + team_name
    });
    console.log("clickedTeam: " + team_name);
    console.log(route.fullPath);
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

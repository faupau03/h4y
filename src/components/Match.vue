<template>
    <div class="w-full h-full">
        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Spiel</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">Info</p>
        </div>
        <div
            id="game-header"
            class="flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <ClockIcon class="h-6 w-6 mt-1 ml-2 absolute left-5 top-5" />
            <span class="sm:text-xl sm:mt-0.5 mt-1 ml-2 absolute left-12 top-5">
                {{ game.gDate }}
                {{ game.gTime }}
            </span>
            <ShareIcon
                class="h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-7 top-5"
                @click="shareTeam"
            />
            <div id="game-info" class="mt-14 m-5 w-full">
                <div class="font-bold text-xl sm:text-2xl justify-center flex">
                    {{ game.gHomeTeam }}
                    :
                    {{ game.gGuestTeam }}
                </div>
                <div
                    class="font-bold text-3xl sm:text-4xl my-4 justify-center flex"
                >
                    {{ game.gHomeGoals }}
                    :
                    {{ game.gGuestGoals }}
                </div>
                <div
                    class="text-md sm:text-xl my-4 justify-center flex hover:underline hover:text-indigo-500 hover:cursor-pointer"
                >
                    <Maps
                        class=""
                        v-if="!loading"
                        :location="
                            game.gGymnasiumName +
                            '+' +
                            game.gGymnasiumStreet +
                            '+' +
                            game.gGymnasiumPostal +
                            '+' +
                            game.gGymnasiumTown
                        "
                    />
                    {{ game.gGymnasiumName }}
                    {{ game.gGymnasiumTown }}
                </div>
            </div>
        </div>

        <!-- Live ticker with option to fullscreen -->
        <div
            v-if="game.gLive && !gameTickerLoading && gameTickerInfo"
            id="ticker"
            class="w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"
        >
            <div class="flex mt-1">
                <span class="font-bold ml-2"> Ticker </span>
            </div>
            <div id="header" class="flex justify-between">
                <div
                    class="h-20 bg-indigo-500 text-white relative font-bold flex items-center justify-center p-2 w-1/3"
                >
                    <div
                        class="h-20 w-5 -scale-y-100 absolute -right-5 overflow-hidden inline-block"
                    >
                        <div
                            class="h-28 -mt-8 bg-indigo-500 -rotate-12 transform origin-bottom-right"
                        ></div>
                    </div>
                    {{ gameTickerInfo["team_home"]["club"] }}
                </div>
                <div class="grid justify-center mt-2">
                    <div class="flex justify-center">
                        <ClockIcon class="h-6 w-6" />
                        {{
                            getTime(
                                gameTicker[gameTicker.length - 1]["game_time"]
                            )
                        }}
                    </div>
                    <div class="justify-center flex font-bold text-xl">
                        {{ gameTicker[gameTicker.length - 1]["home_score"] }}
                        :
                        {{ gameTicker[gameTicker.length - 1]["guest_score"] }}
                    </div>
                </div>
                <div
                    class="bg-indigo-500 text-white font-bold relative flex items-center justify-center p-2 w-1/3"
                >
                    {{ gameTickerInfo["team_home"]["club"] }}
                    <div
                        class="h-20 w-5 -scale-x-100 absolute -left-5 overflow-hidden inline-block"
                    >
                        <div
                            class="h-28 -mt-8 bg-indigo-500 -rotate-12 transform origin-bottom-right"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="flex justify-evenly p-3 m-2 bg-indigo-200 rounded font-bold text-gray-800">
                <div>
                    Aktion
                </div>
                <div>
                    Spielstand
                </div>
                <div>
                    Aktion
                </div>
            </div>
            <div id="data" class="max-h-80 overflow-auto mb-2">
                <div
                    v-for="(ticker, index) in gameTicker.reverse()"
                    :key="index"
                    class="flex justify-evenly p-3 m-2 bg-indigo-100 rounded items-center  text-gray-800"
                    v-show="!messageFilter.includes(ticker['message'])"
                >
                    <div class="w-1/3">
                        <!-- 1. Halbzeit -->
                        <div
                        v-if="ticker['message'] == 'Spielstand 1. Halbzeit'"
                        class="flex">
                            Spielstand
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg" alt="">
                        </div>
                        <!-- 2. Halbzeit -->
                        <div
                        v-else-if="ticker['message'] == 'Spielstand 2. Halbzeit'"
                        class="flex">
                            Spielstand
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg" alt="">
                        </div>
                        <!-- 7m Tor -->
                        <div
                        v-else-if="ticker['message'].includes('7m') && (ticker['message'].includes('Tor') || ticker['message'].includes('Erfolgreicher')) && ticker['message'].includes('Heimmannschaft')"
                        class="flex">
                            7m Tor durch Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/doZSekQl.svg" alt="">
                        </div>
                        <!-- 7m -->
                        <div
                        v-else-if="ticker['message'].includes('7m') && ticker['message'].includes('Heimmannschaft')"
                        class="flex">
                            7m von Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/OBOdJWyJ.svg" alt="">
                        </div>
                        <!-- Tor -->
                        <div
                        v-else-if="ticker['message'].includes('Tor') && ticker['message'].includes('Heimmannschaft')"
                        class="flex">
                            Tor durch Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/3GjFnr19.svg" alt="">
                        </div>
                        <!-- Auszeit -->
                        <div
                        v-else-if="ticker['message'].includes('Mannschafts-Auszeit') && ticker['message'].includes('Heimmannschaft')"
                        class="flex">
                            Auszeit
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/3B6Hgy_M.svg" alt="">
                        </div>
                        <!-- Verwarnung -->
                        <div
                        v-else-if="ticker['message'].includes('Verwarnung') && ticker['message'].includes('Heimmannschaft')"
                        class="flex">
                            Verwarnung für Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/jAfYIp8x.svg" alt="">
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-center">
                        {{
                            getTime(
                                ticker["game_time"]
                            )
                        }}
                    </div>
                    <div class="justify-center flex text-indigo-700  font-bold sm:text-xl">
                        {{ ticker["home_score"] }}
                        :
                        {{ ticker["guest_score"] }}
                    </div>
                    </div>
                    <div class="w-1/3">
                        <!-- 7m Tor -->
                        <div
                        v-if="ticker['message'].includes('7m') && ticker['message'].includes('Tor') && ticker['message'].includes('Gastmannschaft')"
                        class="flex">
                            7m Tor durch Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/doZSekQl.svg" alt="">
                        </div>
                        <!-- 7m -->
                        <div
                        v-else-if="ticker['message'].includes('7m') && ticker['message'].includes('Gastmannschaft')"
                        class="flex">
                            7m von Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            <img class="ml-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/OBOdJWyJ.svg" alt="">
                        </div>
                        <!-- Tor -->
                        <div
                        v-else-if="ticker['message'].includes('Tor') && ticker['message'].includes('Gastmannschaft')"
                        class="flex">
                            <img class="mr-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/3GjFnr19.svg" alt="">
                            Tor durch Nr. {{ ticker["message"].match(/\d+/)[0] }}
                        </div>
                        <!-- Auszeit -->
                        <div
                        v-else-if="ticker['message'].includes('Mannschafts-Auszeit') && ticker['message'].includes('Gastmannschaft')"
                        class="flex">
                            <img class="mr-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/3B6Hgy_M.svg" alt="">
                            Auszeit
                            
                        </div>
                        <!-- Verwarnung -->
                        <div
                        v-else-if="ticker['message'].includes('Verwarnung') && ticker['message'].includes('Gastmannschaft')"
                        class="flex">
                        <img class="mr-1 h-5 mt-0.5" src="https://spo.handball4all.de/service/ticker/jAfYIp8x.svg" alt="">
                            Verwarnung für Nr. {{ ticker["message"].match(/\d+/)[0] }}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="scores"
            class="w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"
        >
            <div class="flex mt-1">
                <span class="font-bold ml-2"> Tabelle </span>
                <span class="hidden sm:block ml-auto mr-9"> Tore </span>
                <span class="sm:ml-0 ml-auto mr-5"> Spiele </span>
                <span class="mr-2"> Punkte </span>
            </div>
            <TableLoading v-if="loading"> </TableLoading>
            <Table
                v-else
                v-for="team_score in scores.content.score"
                :key="team_score.tabTeamID"
                :team_score="team_score"
            >
            </Table>
        </div>
    </div>
</template>

<script setup>
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

import {
    ChevronUpIcon,
    StarIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
} from "@heroicons/vue/solid";
import { ShareIcon, ClockIcon } from "@heroicons/vue/outline";
import { StarIcon as StarIconOutline } from "@heroicons/vue/outline";
import { UserGroupIcon } from "@heroicons/vue/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

// helper functions
import {
    fetchTeam,
    fetchTeamGames,
    fetchTickerInfo,
    fetchTicker,
} from "./functions/fetchData.js";

const route = useRoute();
const props = defineProps(["team_id", "team_class", "game_id"]);

const games = ref([]);
const scores = ref([]);
const loading = ref(true);
const game = ref({});

const gameTickerInfo = ref({});
const gameTicker = ref([]);
const interval = 5000;
const gameTickerLoading = ref(false);

const teamClassID = ref(null);
const teamID = ref(null);
const gameID = ref(null);

const messageFilter = [
    "Spielzeit gestoppt",
    "Spielzeit gestartet",
]

const shareGame = () => {
    if (navigator.share) {
        navigator.share({
            title: "Spiel",
            text: game.value + " " + club.value.lname,
            url: route.fullPath,
        });
    } else {
        // TODO: show alternative share method
        alert("Dein Browser unterstützt das Share-Feature nicht.");
    }
};

const game_id_ref = toRef(props, "game_id");
watch(game_id_ref, async (newValue, oldValue) => {
    console.log("update game");
    if (newValue) {
        forceUpdate();
    }
});

const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let seconds_string = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds_string;
};

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
    console.log("gameID: " + gameID.value);
    console.log("teamID: " + teamID.value);
    console.log("teamClassID: " + teamClassID.value);
};

const getData = async () => {
    loading.value = true;
    games.value = await fetchTeamGames(
        teamID.value,
        teamClassID.value,
        [],
        true
    );
    scores.value = await fetchTeam(teamID.value, teamClassID.value);
    game.value = games.value.find((game) => game.gID === gameID.value);
    loading.value = false;
    console.log(game.value);
};

const tickerInit = async () => {
    gameTickerLoading.value = true;
    if (game.value.gLive) {
        console.log("game is live");
        setInterval(async () => {
            gameTicker.value = await fetchTicker(game.value.gTickerToken);
        }, interval);
        gameTicker.value = await fetchTicker(game.value.gTickerToken);
        gameTickerInfo.value = await fetchTickerInfo(game.value.gTickerToken);
    }
    gameTickerLoading.value = false;
};

onMounted(async () => {
    await setGameID();
    await getData();
    game.value.gLive = true;
    game.value.gTickerToken = "b87ed19c1f10952aa6fa123203fbc576";
    await tickerInit();
});
</script>

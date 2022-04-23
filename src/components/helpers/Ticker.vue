<template>
    <!-- Live ticker with option to fullscreen -->
    <div
        v-if="
            gameLive &&
            !gameTickerLoading &&
            gameTickerInfo &&
            gameTickerInfo['team_home']
        "
        id="ticker"
        class="w-5/6 m-auto border bg-white border-gray-100 shadow-xl rounded-lg relative mt-2"
        :class="
            fullscreenTicker
                ? '!m-0 !z-50 !absolute !right-0 !top-0 !bottom-0 !left-0 !h-screen !w-screen overflow-hidden'
                : ''
        "
    >
        <div class="flex py-2">
            <span class="font-bold ml-2"> Ticker </span>
            <button
                v-show="infoTicker"
                class="bg-indigo-300 ml-auto rounded p-1 text-sm sm:text-base hover:bg-indigo-500"
                @click="infoTicker = false"
            >
                Spielverlauf
            </button>
            <button
                v-show="!infoTicker"
                class="bg-indigo-300 ml-auto rounded p-1 text-sm sm:text-base hover:bg-indigo-500"
                @click="infoTicker = true"
            >
                Aufstellung
            </button>
            <img
                src="/icons/arrows-angle-expand.svg"
                alt="expand"
                v-show="!fullscreenTicker"
                class="h-7 w-7 ml-5 hover:bg-indigo-500 bg-indigo-300 rounded-lg p-1.5 mr-5 hover:cursor-pointer"
                @click="fullscreenTicker = true"
            />
            <img
                src="/icons/arrows-angle-contract.svg"
                alt="contract"
                v-show="fullscreenTicker"
                class="h-7 w-7 ml-5 hover:bg-indigo-500 bg-indigo-300 rounded-lg p-1.5 mr-5 hover:cursor-pointer"
                @click="fullscreenTicker = false"
            />
        </div>
        <div id="header" class="flex justify-between mt-2 md:mt-0">
            <div
                class="h-20 bg-indigo-500 text-sm sm:text-base text-white relative font-bold flex items-center justify-center p-2 w-1/3"
                @click="infoTicker ? (selectedTeam = 'team_home') : null"
            >
                <div
                    class="h-20 w-5 -scale-y-100 absolute -right-5 overflow-hidden inline-block"
                >
                    <div
                        class="h-28 -mt-8 bg-indigo-500 -rotate-12 transform origin-bottom-right"
                    ></div>
                </div>
                {{ gameTickerInfo["team_home"]["club"] }}
                <div class="text-indigo-900 absolute right-0 sm:-top-7 -top-5 sm:text-lg">Heim</div>
            </div>
            <div class="grid justify-center mt-1">
                <div class="flex justify-center md:text-xl">
                    <ClockIcon class="h-6 w-6" />
                    <!-- {{ getTime(gameTicker[0]["game_time"]) }} -->
                    {{ getTime(gameTickerTime) }}
                </div>
                <div class="justify-center flex font-bold text-xl sm:text-3xl md:text-5xl">
                    {{ gameTicker[0]["home_score"] }}
                    :
                    {{ gameTicker[0]["guest_score"] }}
                </div>
            </div>
            <div
                class="h-20 bg-indigo-500 text-sm sm:text-base text-white font-bold relative flex items-center justify-center p-2 w-1/3"
                @click="infoTicker ? (selectedTeam = 'team_guest') : null"
            >
                {{ gameTickerInfo["team_guest"]["club"] }}
                <div class="text-indigo-900 absolute left-0 sm:-top-7 -top-5 sm:text-lg">Gast</div>
                <div
                    class="h-20 w-5 -scale-x-100 absolute -left-5 overflow-hidden inline-block"
                >
                    <div
                        class="h-28 -mt-8 bg-indigo-500 -rotate-12 transform origin-bottom-right"
                    ></div>
                </div>
            </div>
        </div>
        <div id="ticker" v-show="!infoTicker">
            <div
                class="flex justify-evenly p-3 m-2 bg-indigo-200 rounded font-bold text-gray-800"
            >
                <div>Aktion</div>
                <div>Spielstand</div>
                <div>Aktion</div>
            </div>
            <div
                id="data"
                class="overflow-auto mb-2 bg-white"
                :class="fullscreenTicker ? 'pb-4' : 'max-h-80'"
            >
                <VirtualisedList
                    class="h-full"
                    :nodes="gameTicker"
                    :viewportHeight="
                        fullscreenTicker ? screenHeight() - 216 : 320
                    "
                    :getNodeHeight="
                        (node) => {
                            if (screenWidth() < 640) {
                                return 56;
                            }
                            return 86;
                        }
                    "
                    :get-node-key="(node, index) => index"
                >
                    <template #cell="slotProps">
                        <div
                            class="flex justify-evenly md:text-xl sm:text-sm text-xs p-2 mx-2 bg-indigo-100 rounded items-center text-gray-800"
                        >
                            <div class="w-2/5 text-ellipsis overflow-hidden">
                                <TickerElement
                                    :message="slotProps.node.message"
                                    side="left"
                                />
                            </div>
                            <div>
                                <div class="flex justify-center">
                                    {{ getTime(slotProps.node["game_time"]) }}
                                </div>
                                <div
                                    class="justify-center flex text-indigo-700 font-bold sm:text-xl"
                                >
                                    {{ slotProps.node["home_score"] }}
                                    :
                                    {{ slotProps.node["guest_score"] }}
                                </div>
                            </div>
                            <div class="w-2/5 text-ellipsis overflow-hidden">
                                <TickerElement
                                    class="flex"
                                    :message="slotProps.node.message"
                                    side="right"
                                />
                            </div>
                        </div>
                    </template>
                </VirtualisedList>
            </div>
        </div>
        <div
            id="line_up"
            class="bg-white"
            :class="fullscreenTicker ? 'pb-4' : ''"
            v-show="infoTicker"
        >
            <div
                id="line_up_header"
                class="grid text-sm sm:text-base text-gray-800 text-center grid-cols-10 p-1 py-2 bg-indigo-200 rounded font-bold m-1"
            >
                <div>Nr</div>
                <div class="col-span-2">Name</div>
                <div class="col-span-1">Tore</div>
                <div>7m</div>
                <div class="col-span-5">Karten und Strafen</div>
            </div>
            <div id="line_up_player">
                <div
                    v-for="player in gameTickerInfo[selectedTeam].team_members"
                    :key="player.player_no"
                    class="grid text-xs items-center sm:text-base grid-cols-10 px-1 bg-indigo-100 rounded m-1"
                >
                    <div class="text-center">
                        {{ player.player_no }}
                    </div>
                    <div class="col-span-2 py-1 text-ellipsis overflow-hidden">
                        {{ player.prename + " " + player.name }}
                    </div>
                    <div class="col-span-1 text-indigo-800 font-bold">
                        {{ getScore(player.player_no) }}
                    </div>
                    <div>
                        {{
                            get7m(player.player_no)
                                ? get7m(player.player_no) +
                                  "/" +
                                  get7mScore(player.player_no)
                                : ""
                        }}
                    </div>
                    <div
                        class="bg-yellow-400 h-full text-center grid items-center"
                    >
                        {{
                            getYellowCard(player.player_no)
                                ? getTime(getYellowCard(player.player_no))
                                : ""
                        }}
                    </div>
                    <div
                        class="bg-indigo-200 h-full text-center grid items-center border border-r-[1px]"
                    >
                        {{
                            get2min(player.player_no)[0]
                                ? getTime(get2min(player.player_no)[0])
                                : ""
                        }}
                    </div>
                    <div
                        class="bg-indigo-200 h-full text-center grid items-center border border-r-[1.5px]"
                    >
                        {{
                            get2min(player.player_no)[1]
                                ? getTime(get2min(player.player_no)[1])
                                : ""
                        }}
                    </div>
                    <div
                        class="bg-indigo-200 h-full text-center grid items-center"
                    >
                        {{
                            get2min(player.player_no)[2]
                                ? getTime(get2min(player.player_no)[2])
                                : ""
                        }}
                    </div>
                    <div
                        class="bg-red-400 h-full text-center grid items-center"
                    >
                        {{
                            getRedCard(player.player_no)
                                ? getTime(getRedCard(player.player_no))
                                : ""
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchTickerInfo, fetchTicker } from "../functions/fetchData.js";
import TickerElement from "./TickerElement.vue";
import { VirtualisedList } from "vue-virtualised";
import { ClockIcon } from "@heroicons/vue/outline";


const props = defineProps(["game_token", "game_live"]);


const gameToken = ref("");
const gameLive = ref(false);
const gameScore = ref({});
defineExpose({ gameScore });

const gameTickerInfo = ref({});
const gameTicker = ref([]);
const interval = 5000;
const gameTickerLoading = ref(false);
const showAll = ref(false);

const fullscreenTicker = ref(false);
const infoTicker = ref(false);

const gameTickerTimer = ref(null);
const gameTickerStop = ref(false);
const gameTickerTime = ref(0);
const gameTickerLastLength = ref(0);

const selectedTeam = ref("team_home");

const messageFilter = ["Spielzeit gestoppt", "Spielzeit gestartet"];

const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let seconds_string = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds_string;
};

const screenHeight = () => {
    //console.log(window.innerHeight);
    return window.innerHeight;
};

const screenWidth = () => {
    return screen.width;
};

/*
    Functions for ticker player info
*/
const getScore = (player_no) => {
    let score = 0;
    for (let i = 0; i < gameTicker.value.length; i++) {
        const message = gameTicker.value[i].message;
        if (
            (message.includes("Heimmannschaft") &&
                selectedTeam.value == "team_home") ||
            (message.includes("Gastmannschaft") &&
                selectedTeam.value == "team_guest")
        ) {
            //console.log("message: " + message);
            if (
                (message.includes("Tor") ||
                    message.includes("Erfolgreicher")) &&
                message.replace("7m", "").match(/\d+/)[0] == player_no
            ) {
                score++;
            }
        }
    }
    return score;
};

const get7mScore = (player_no) => {
    let score = 0;
    for (let i = 0; i < gameTicker.value.length; i++) {
        const message = gameTicker.value[i].message;
        if (
            (message.includes("Heimmannschaft") &&
                selectedTeam.value == "team_home") ||
            (message.includes("Gastmannschaft") &&
                selectedTeam.value == "team_guest")
        ) {
            //console.log("message: " + message);
            if (
                message.includes("7m") &&
                (message.includes("Tor") ||
                    message.includes("Erfolgreicher")) &&
                message.replace("7m", "").match(/\d+/)[0] == player_no
            ) {
                score++;
            }
        }
    }
    return score;
};

const get7m = (player_no) => {
    let score = 0;
    for (let i = 0; i < gameTicker.value.length; i++) {
        const message = gameTicker.value[i].message;
        if (
            (message.includes("Heimmannschaft") &&
                selectedTeam.value == "team_home") ||
            (message.includes("Gastmannschaft") &&
                selectedTeam.value == "team_guest")
        ) {
            //console.log("message: " + message);
            if (
                message.includes("7m") &&
                message.replace("7m", "").match(/\d+/)[0] == player_no
            ) {
                score++;
            }
        }
    }
    return score;
};

const getYellowCard = (player_no) => {
    for (let i = 0; i < gameTicker.value.length; i++) {
        const message = gameTicker.value[i].message;
        if (
            (message.includes("Heimmannschaft") &&
                selectedTeam.value == "team_home") ||
            (message.includes("Gastmannschaft") &&
                selectedTeam.value == "team_guest")
        ) {
            //console.log("message: " + message);
            if (
                message.includes("Verwarnung") &&
                (message.match(/\d+/)
                    ? message.match(/\d+/)[0]
                    : message
                          .replace("Verwarnung für die Nummer ", "")
                          .charAt(0)) == player_no
            ) {
                return gameTicker.value[i].game_time;
            }
        }
    }
};

const getRedCard = (player_no) => {
    for (let i = 0; i < gameTicker.value.length; i++) {
        const message = gameTicker.value[i].message;
        if (
            (message.includes("Heimmannschaft") &&
                selectedTeam.value == "team_home") ||
            (message.includes("Gastmannschaft") &&
                selectedTeam.value == "team_guest")
        ) {
            //console.log("message: " + message);
            if (
                message.includes("Disqualifikation") &&
                (message.match(/\d+/)
                    ? message.match(/\d+/)[0]
                    : message
                          .replace("Disqualifikation für die Nummer ", "")
                          .charAt(0)) == player_no
            ) {
                return gameTicker.value[i].game_time;
            }
        }
    }
};

//TODO: whats the message for the blue card event?

const get2min = (player_no) => {
    let penalties = [];
    for (let i = 0; i < gameTicker.value.length; i++) {
        const message = gameTicker.value[i].message;
        if (
            (message.includes("Heimmannschaft") &&
                selectedTeam.value == "team_home") ||
            (message.includes("Gastmannschaft") &&
                selectedTeam.value == "team_guest")
        ) {
            //console.log("message: " + message);
            if (
                message.includes("2-min") &&
                (message.replace("2-min", "").match(/\d+/)
                    ? message.replace("2-min", "").match(/\d+/)[0]
                    : message
                          .replace("2-min Strafe für die Nummer ", "")
                          .charAt(0)) == player_no
            ) {
                penalties.push(gameTicker.value[i].game_time);
            }
        }
    }
    return penalties;
};

const tickerInit = async () => {
    gameTickerLoading.value = true;
    if (gameLive.value) {
        //console.log("game is live");

        // Set fetch interval
        setInterval(async () => {
            let tmp = await fetchTicker(gameToken.value);
            if (!showAll.value) {
                tmp = tmp.filter(
                    (item) => !messageFilter.includes(item["message"])
                );
            }
            tmp = tmp.reverse();
            gameTicker.value = removeDuplicates(tmp);
            if (
                gameTicker.value[0].game_time &&
                gameTicker.value.length > gameTickerLastLength.value
            ) {
                gameTickerLastLength.value = gameTicker.value.length;
                gameTickerTime.value = gameTicker.value[0].game_time;
            }
            if (
                gameTicker.value[0].stops_time == true ||
                (gameTicker.value[1].stops_time == true &&
                    gameTicker.value[1].game_time ==
                        gameTicker.value[0].game_time)
            ) {
                gameTickerStop.value = true;
            } else {
                gameTickerStop.value = false;
            }
            gameScore.value = gameTicker.value[0];
        }, interval);
        let tmp = await fetchTicker(gameToken.value);
        if (!showAll.value) {
            tmp = tmp.filter(
                (item) => !messageFilter.includes(item["message"])
            );
        }
        tmp = tmp.reverse();
        gameTicker.value = removeDuplicates(tmp);
        if (gameTicker.value[0].game_time) {
            gameTickerTime.value = gameTicker.value[0].game_time;
        }
        if (gameTicker.value[0].stops_time == true) {
            gameTickerStop.value = true;
        } else {
            gameTickerStop.value = false;
        }
        gameTickerInfo.value = await fetchTickerInfo(gameToken.value);

        //Sort team_members by no
        gameTickerInfo.value.team_home.team_members.sort(function (a, b) {
            if (!parseInt(a.player_no) && !parseInt(b.player_no)) {
                if (a.player_no < b.player_no) {
                    return -1;
                }
                return 1;
            }
            if (!parseInt(a.player_no)) {
                return 1;
            }
            if (!parseInt(b.player_no)) {
                return -1;
            }
            return Number(a.player_no) - Number(b.player_no);
        });
        gameTickerInfo.value.team_guest.team_members.sort(function (a, b) {
            if (!parseInt(a.player_no) && !parseInt(b.player_no)) {
                if (a.player_no < b.player_no) {
                    return -1;
                }
                return 1;
            }
            if (!parseInt(a.player_no)) {
                return 1;
            }
            if (!parseInt(b.player_no)) {
                return -1;
            }
            return Number(a.player_no) - Number(b.player_no);
        });

        gameTickerTimer.value = setInterval(() => {
            if (!gameTickerStop.value) {
                gameTickerTime.value++;
            }
        }, 1000);
    }
    gameTickerLoading.value = false;
};

const removeDuplicates = (array) => {
    const new_array = [];
    array.forEach((element) => {
        let found = false;
        new_array.forEach((new_element) => {
            if (
                element["message"] === new_element["message"] &&
                element["game_time"] === new_element["game_time"]
            ) {
                //console.log("found duplicate");
                found = true;
            }
        });
        if (!found) {
            new_array.push(element);
        }
    });
    return new_array;
};

// needs game token and live boolean
const setGameToken = async () => {
    console.log(props.game_live);
    if (props.game_token && props.game_live) {
        //console.log("props");
        gameToken.value = props.game_token;
        gameLive.value = props.game_live;
    } else {
        console.log("not live or no game token");
    }
    console.log("gameToken: " + gameToken.value);
    console.log("gameLive: " + gameLive.value);
};

onMounted(async () => {
    await setGameToken();
    await tickerInit();
    //console.log(screenWidth());
});
</script>

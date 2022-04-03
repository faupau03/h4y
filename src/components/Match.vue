<template>
    <div class="w-full h-full">
        <!-- Press text div -->
        <div v-if="showText" class="pressText absolute w-full overflow-auto max-h-fit bg-gray-900 bg-opacity-25 z-30 flex justify-center items-center">
            <div  class="rounded-lg shadow-2xl bg-white z-30 p-5 h-fit sm:mx-20 mx-5 my-10">
            <span>
                <XCircleIcon @click="showText = false" class="h-8 bg-indigo-300 rounded p-1 hover:bg-indigo-500 ml-auto"/>
            </span>
            <span
                v-html="pressText.robotext.text">
            </span>
            <span
                v-html="pressText.robotext.footer">
            </span>
        </div>
        </div>
        

        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Spiel</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">Info</p>
        </div>
        <div
            id="game-header"
            class="flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <div id="header" class="absolute w-full top-5 right-0 left-0 flex">
                <ClockIcon class="h-6 w-6 mt-1 ml-7" />
                <span class="sm:text-xl sm:mt-0.5 mt-1 ml-2">
                    {{ game.gDate }}
                    {{ game.gTime }}
                </span>
                <div
                    v-show="game.live == true"
                    class="rounded-full relative ml-2 w-4 h-4 mt-2"
                >
                    <div
                        class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-500 opacity-75"
                    ></div>
                    <div
                        class="z-20 mx-auto my-auto mt-0.5 animate-none rounded-full h-3 w-3 bg-red-500"
                    ></div>
                </div>
                <AnnotationIcon v-show="game.robotextstate == 'generated'" class="h-6 mt-1 ml-auto hover:text-indigo-500" @click="showPressText()"/>
                <a :href="'https://spo.handball4all.de/misc/sboPublicReports.php?sGID=' + game.sGID">
                <DocumentIcon v-show="game.sGID" class="h-6 mt-1 ml-2 hover:text-indigo-500" :class="game.robotextstate == 'generated' ? '' : 'ml-auto'" @click="publicReport"/>
                </a>
                <Cal class="ml-2" :class="game.sGID ? '' : 'ml-auto'" :game="game" />
                <ShareIcon
                    class="h-6 w-6 mt-1 ml-2 hover:text-indigo-500 mr-5"
                    @click="shareGame"
                />
            </div>

            <div id="game-info" class="mt-14 m-5 w-full">
                <div class="justify-center grid">
                    <div class="font-bold text-xl sm:text-2xl">
                        {{ game.gHomeTeam }}
                        :
                        {{ game.gGuestTeam }}
                    </div>
                    <div>
                        {{ !loading ? scores.head.name : "" }}
                    </div>
                </div>
                <div
                    id="game-class"
                    class="text-md sm:text-sl justify-center flex"
                ></div>
                <div
                    class="font-bold text-3xl sm:text-4xl my-4 justify-center flex"
                >
                    {{
                        gameTicker[0]
                            ? gameTicker[0].home_score
                            : game.gHomeGoals
                    }}
                    :
                    {{
                        gameTicker[0]
                            ? gameTicker[0].guest_score
                            : game.gGuestGoals
                    }}
                </div>
                <div class="">
                    <Maps
                        class="w-full"
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
                        :name="game.gGymnasiumName"
                        :town="game.gGymnasiumTown"
                        :id="game.gGymnasiumID"
                    />
                </div>
            </div>
        </div>
        <div id="wrapper" :class="fullscreenTicker ? '' : 'pb-24'">
            <!-- Live ticker with option to fullscreen -->
            <div
                v-if="
                    game.live &&
                    !gameTickerLoading &&
                    gameTickerInfo &&
                    gameTickerInfo['team_home']
                "
                id="ticker"
                class="w-5/6 m-auto border bg-white border-gray-100 shadow-xl rounded-lg relative mt-2"
                :class="
                    fullscreenTicker
                        ? '!m-0 !z-50 !absolute !right-0 !top-0 !bottom-0 !left-0 !h-screen !w-screen'
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
                <div id="header" class="flex justify-between">
                    <div
                        class="h-20 bg-indigo-500 text-sm sm:text-base text-white relative font-bold flex items-center justify-center p-2 w-1/3"
                        @click="
                            infoTicker ? (selectedTeam = 'team_home') : null
                        "
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
                            <!-- {{ getTime(gameTicker[0]["game_time"]) }} -->
                            {{ getTime(gameTickerTime) }}
                        </div>
                        <div class="justify-center flex font-bold text-xl">
                            {{ gameTicker[0]["home_score"] }}
                            :
                            {{ gameTicker[0]["guest_score"] }}
                        </div>
                    </div>
                    <div
                        class="h-20 bg-indigo-500 text-sm sm:text-base text-white font-bold relative flex items-center justify-center p-2 w-1/3"
                        @click="
                            infoTicker ? (selectedTeam = 'team_guest') : null
                        "
                    >
                        {{ gameTickerInfo["team_guest"]["club"] }}
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
                                    <div
                                        class="w-2/5 text-ellipsis overflow-hidden"
                                    >
                                        <TickerElement
                                            :message="slotProps.node.message"
                                            side="left"
                                        />
                                    </div>
                                    <div>
                                        <div class="flex justify-center">
                                            {{
                                                getTime(
                                                    slotProps.node["game_time"]
                                                )
                                            }}
                                        </div>
                                        <div
                                            class="justify-center flex text-indigo-700 font-bold sm:text-xl"
                                        >
                                            {{ slotProps.node["home_score"] }}
                                            :
                                            {{ slotProps.node["guest_score"] }}
                                        </div>
                                    </div>
                                    <div
                                        class="w-2/5 text-ellipsis overflow-hidden"
                                    >
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
                            v-for="player in gameTickerInfo[selectedTeam]
                                .team_members"
                            :key="player.player_no"
                            class="grid text-xs items-center sm:text-base grid-cols-10 px-1 bg-indigo-100 rounded m-1"
                        >
                            <div class="text-center">
                                {{ player.player_no }}
                            </div>
                            <div
                                class="col-span-2 py-1 text-ellipsis overflow-hidden"
                            >
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
                                        ? getTime(
                                              getYellowCard(player.player_no)
                                          )
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

            <div
                id="scores"
                class="w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"
                :class="fullscreenTicker ? 'hidden' : ''"
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
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, toRef } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { VirtualisedList } from "vue-virtualised";

//helper components
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Table from "./helpers/Table.vue";
import TableLoading from "./helpers/TableLoading.vue";
import Maps from "./helpers/Maps.vue";
import TickerElement from "./helpers/tickerElement.vue";
import Cal from "./helpers/Cal.vue";

import {
    ChevronUpIcon,
    StarIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
} from "@heroicons/vue/solid";
import { ShareIcon, ClockIcon, XCircleIcon } from "@heroicons/vue/outline";
import { StarIcon as StarIconOutline } from "@heroicons/vue/outline";
import { UserGroupIcon, DocumentIcon, AnnotationIcon } from "@heroicons/vue/solid";
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
const scores = ref({});
const loading = ref(true);
const game = ref({});

const gameTickerInfo = ref({});
const gameTicker = ref([]);
const interval = 5000;
const gameTickerLoading = ref(false);
const showAll = ref(false);

const fullscreenTicker = ref(false);
const infoTicker = ref(false);

const pressText = ref({});
const showText = ref(false);

const gameTickerTimer = ref(null);
const gameTickerStop = ref(false);
const gameTickerTime = ref(0);
const gameTickerLastLength = ref(0);

const selectedTeam = ref("team_home");

const teamClassID = ref(null);
const teamID = ref(null);
const gameID = ref(null);

const messageFilter = ["Spielzeit gestoppt", "Spielzeit gestartet"];

const shareGame = () => {
    if (navigator.share) {
        navigator.share({
            title: "Spiel am " + game.value.game_date,
            text:
                game.value.game.value.gHomeTeam + ": " + game.value.gGuestTeam,
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

const screenHeight = () => {
    return screen.height;
};

const screenWidth = () => {
    return screen.width;
};


const showPressText = async() => {
    const response = await fetch(
        "https://spo.handball4all.de/service/robotext/if_robotext.php?cmd=text&game=" + game.value.gID
            
    );
    const data = await response.json();
    
    if (data) {
        pressText.value = data;
        showText.value = true;
    }
    console.log(pressText.value);
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
};

const tickerInit = async () => {
    gameTickerLoading.value = true;
    if (game.value.live) {
        console.log("game is live");

        // Set fetch interval
        setInterval(async () => {
            let tmp = await fetchTicker(game.value.gToken);
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
        }, interval);
        let tmp = await fetchTicker(game.value.gToken);
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
        gameTickerInfo.value = await fetchTickerInfo(game.value.gToken);

        //Sort team_members by no
        gameTickerInfo.value.team_home.team_members.sort(function (a, b) {
            console.log("A: " + parseInt(a.player_no));
            console.log("B: " + parseInt(b.player_no));
            console.log(
                "Result: " + (parseInt(a.player_no) - parseInt(b.player_no))
            );
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
            console.log("A: " + parseInt(a.player_no));
            console.log("B: " + parseInt(b.player_no));
            console.log(
                "Result: " + (parseInt(a.player_no) - parseInt(b.player_no))
            );
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

onMounted(async () => {
    await setGameID();
    await getData();
    await tickerInit();
});
</script>

<style>
.pressText h1 {
    font-size: 1.5rem !important;
    margin: 0.5em 0;
}
.pressText h3 {
    font-size: 1rem !important;
    font-weight: 700;
    margin: 0.5em 0;
}

.pressText p:first-of-type {
    background-color: rgb(224, 231, 255, 0.7);
    padding: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 0.5em;
}
</style>

<template>
    <div class="w-full h-full">
        <!-- Press text div -->
        <div
            v-if="showText"
            class="pressText absolute w-full overflow-auto max-h-fit bg-gray-900 bg-opacity-25 z-30 flex justify-center items-center"
        >
            <div
                class="rounded-lg shadow-2xl bg-white z-30 p-5 h-fit sm:mx-20 mx-5 my-10"
            >
                <span>
                    <XCircleIcon
                        @click="showText = false"
                        class="h-8 bg-indigo-300 rounded p-1 hover:bg-indigo-500 ml-auto"
                    />
                </span>
                <span v-html="pressText.robotext.text"> </span>
                <span v-html="pressText.robotext.footer"> </span>
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
                <AnnotationIcon
                    v-show="game.robotextstate == 'generated'"
                    class="h-6 mt-1 ml-auto hover:text-indigo-500"
                    @click="showPressText()"
                />
                <a
                    :href="
                        'https://spo.handball4all.de/misc/sboPublicReports.php?sGID=' +
                        game.sGID
                    "
                >
                    <DocumentIcon
                        v-show="game.sGID"
                        class="h-6 mt-1 ml-2 hover:text-indigo-500"
                        :class="
                            game.robotextstate == 'generated' ? '' : 'ml-auto'
                        "
                    />
                </a>
                <Cal
                    class="ml-2"
                    :class="game.sGID ? '' : 'ml-auto'"
                    :game="game"
                />
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
            <Ticker :game_token="game.gTickerToken" :live="game.gLive" />
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

//helper components
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Table from "./helpers/Table.vue";
import TableLoading from "./helpers/TableLoading.vue";
import Maps from "./helpers/Maps.vue";
import Cal from "./helpers/Cal.vue";
import Ticker from "./helpers/Ticker.vue";

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
import { fetchTeam, fetchTeamGames } from "./functions/fetchData.js";

const route = useRoute();
const props = defineProps(["team_id", "team_class", "game_id"]);

const games = ref([]);
const scores = ref({});
const loading = ref(true);
const game = ref({});

const pressText = ref({});
const showText = ref(false);

const teamClassID = ref(null);
const teamID = ref(null);
const gameID = ref(null);

const shareGame = () => {
    if (navigator.share) {
        navigator.share({
            title: "Spiel am " + game.value.game_date,
            text: game.value.gHomeTeam + ": " + game.value.gGuestTeam,
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

const showPressText = async () => {
    const response = await fetch(
        "https://spo.handball4all.de/service/robotext/if_robotext.php?cmd=text&game=" +
            game.value.gID
    );
    const data = await response.json();

    if (data) {
        pressText.value = data;
        showText.value = true;
    }
    console.log(pressText.value);
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

onMounted(async () => {
    await setGameID();
    await getData();
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

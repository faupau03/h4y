<template>
    <div class="w-full h-full">

        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Spiel</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">Info</p>
        </div>
        <div
            id="game-header"
            class="grid w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <Header :type="'match'" :game="game" :game_id="gameID" :team_id="teamID" :class_id="teamClassID"></Header>

            <div id="game-info" class="">
                <div class="justify-center grid mx-2">
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
                        tickerScore
                            ? tickerScore.gameScore.home_score
                            : game.gHomeGoals
                    }}
                    :
                    {{
                        tickerScore
                            ? tickerScore.gameScore.guest_score
                            : game.gGuestGoals
                    }}
                </div>
                <div class="m-1 sm:m-5">
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
        <div id="wrapper" class="pb-24">
            <Ticker ref="tickerScore" :game_token="game.gTickerToken" :game_live="game.gLive" />
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
import Ticker from "./helpers/Ticker.vue";
import Header from "./helpers/Header.vue";


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
};

onMounted(async () => {
    await setGameID();
    await getData();
    
});
</script>


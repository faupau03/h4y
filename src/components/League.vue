<template>
    <div class="min-h-full w-full scrolled">
        <div class="w-full grid gap-4">
            <NavBar title="Liga" subtitle="Spielübersicht" />
            <div id="club-header" class="w-5/6 m-auto relative bg-base-100 card shadow-xl grid">
                <Header @updateFavorites="emit('updateFavorites')" :type="'class'" :games="leagueMatches"
                    :class_id="class_id"></Header>
                <div id="content" class="flex flex-wrap sm:mb-5">
                    <img v-if="false" :src="'logos/clubs/' + teamClubNo + '.png'" @error="img_loaded = false" alt=""
                        id="club-logo" class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg" />

                    <div v-else class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg shadow-2xl bg-gray-200">
                        <UserGroupIcon class="text-gray-500 h-full" />
                    </div>
                    <div id="club-info" class="m-5">
                        <div class="font-bold">
                            {{ league ? league.content.futureGames.gClassLname : "" }}
                        </div>
                        <!-- <div class="text-sm">
                                {{ club? club.lname : "" }}
                            </div> -->
                    </div>
                </div>
            </div>
            <div id="scores" class="grid w-5/6 p-2 m-auto relative bg-base-100 card shadow-xl">
                <div class="flex mt-1">
                    <span class="font-bold ml-2"> Tabelle </span>
                    <span class="hidden sm:block ml-auto mr-9"> Tore </span>
                    <span class="sm:ml-0 ml-auto mr-2"> Spiele </span>
                    <span class=""> Punkte </span>
                    <span class="sm:block hidden">+/-</span>
                </div>
                <div v-if="loading" class="-mb-1">
                    <TableLoading v-for="i in 10" :key="i"> </TableLoading>
                </div>
                <Table v-else-if="league" v-for="team_score in league.content.score" :key="team_score.tabTeamID"
                    :team_score="team_score" @clicked-team="clickedTeam">
                </Table>
            </div>
            <div class="grid w-5/6 m-auto relative bg-base-100 card shadow-xl mb-4 px-2">
                <div class="mt-3 flex justify-between">
                    <h2 class="font-bold text-lg m-1">Spiele</h2>
                    <div class="text-sm m-2">
                        Alle Spiele
                        <input class="ml-1 mb-1 rounded" type="checkbox" name="" id="" @click="
                            (showAll = !showAll), class_id ? getData() : null
                        " />
                    </div>
                </div>
                <div class="overflow-auto w-full mx-auto p-2">
                    <div v-if="loading" class="">
                        <MatchLoading v-for="n in 3" :key="n"></MatchLoading>
                    </div>
                    <div v-else>
                        <div id="league-info">
                            <!-- Information about how many games and button to team component -->
                        </div>
                        <div id="no-data" v-show="!leagueMatches.length">
                            <div id="no-future-matches" v-show="!showAll">
                                Keine zukünftigen Spiele
                            </div>
                            <div v-show="showAll">
                                Keine Spiele in dieser Klasse
                            </div>
                        </div>
                        <Match v-for="match in leagueMatches" :key="match.id" :match="match" :teamID="null"
                            :teamClassID="class_id"></Match>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, toRef } from "vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Table from "./helpers/Table.vue";
import TableLoading from "./helpers/TableLoading.vue";
import Header from "./helpers/Header.vue";

// helper function
import { fetchClass } from "./functions/fetchData.js";
import { filterGames } from "./functions/misc";

import {
    ChevronUpIcon,
    StarIcon,
    ClockIcon,
    MapPinIcon,
    InformationCircleIcon,
    UserGroupIcon
} from "@heroicons/vue/24/solid";
import { StarIcon as StarIconOutline, ShareIcon } from "@heroicons/vue/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const route = useRoute();
const router = useRouter();
const props = defineProps(["class"]);

const loading = ref(true);
const showAll = ref(false);
const emit = defineEmits(["updateFavorites"]);
const class_id = ref(null);
const league = ref(null);
const leagueMatches = ref(null);

const getData = async () => {
    loading.value = true;
    league.value = await fetchClass(
        class_id.value
    );
    leagueMatches.value = league.value.content.futureGames.games;
    leagueMatches.value = filterGames(leagueMatches.value, showAll.value);
    loading.value = false;
};

const setClassID = async () => {
    class_id.value = props.class;
    if (class_id.value == null) {
        const hash = route.hash.substring(1);
        class_id.value = hash;
    }
};

const clickedTeam = async (team_name) => {
    console.log(team_name);
    if (!isNaN(team_name.substring(team_name.length))) {
        team_name = team_name.substring(0, team_name.length - 1);
    }
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" +
        team_name
    );
    const json = await response.json();
    const club = json[0].searchResult.list[0];
    if (club && club.id) {
        router.push({
            path: "/club",
            hash: "#" + club.id
        });
    }
};

onMounted(async () => {
    await setClassID();
    await getData();
});
</script>

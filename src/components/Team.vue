<template>
    <div class="min-h-full w-full scrolled">
        <div class="w-full grid gap-4">
            <NavBar title="Team" subtitle="Spielübersicht" />
            <div id="club-header" class="w-5/6 m-auto relative bg-base-100 card shadow-xl grid">
                <Header v-if="club && club.id" @updateFavorites="emit('updateFavorites')" :type="'team'"
                    :games="teamMatches" :team_id="teamID" :class_id="teamClassID" :club_id="club.id" :team="team"
                    :club="club"></Header>
                <HeaderLoading v-else />
                <div id="content" class="flex flex-wrap sm:mb-5">
                    <img v-if="team && club && club.id && img_loaded" :src="'logos/clubs/' + club.no + '.png'"
                        @error="img_loaded = false" alt="" id="club-logo"
                        class="card h-24 sm:h-32 lg:h-48 ml-5 shadow-2xl" />

                    <div v-else class="h-24 sm:h-32 lg:h-48 ml-5 card shadow-2xl bg-gray-200">
                        <UserGroupIcon class="text-gray-500 h-full" />
                    </div>
                    <div id="club-info" class="m-5">
                        <a v-if="team" :href="'/league#' + teamClassID" class="font-bold link link-hover">
                            {{ team.head.name }}
                        </a>
                        <br>
                        <a v-if="club && club.id" :href="'/club#' + club.id" class="text-sm link link-hover">
                            {{ club.lname }}
                        </a>
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
                <div v-if="matchesLoading" class="-mb-1">
                    <TableLoading v-for="i in 10" :key="i"> </TableLoading>
                </div>
                <Table v-else-if="team" v-for="team_score in team.content.score" :key="team_score.tabTeamID"
                    :team_score="team_score" @clickedTeam="clickedTeam">
                </Table>
                <!-- Additional information -->
                <div v-if="team" class="text-xs p-1">
                    <div v-for="comment in team.content.scoreComments" v-html="comment">
                    </div>
                </div>
            </div>
            <div class="grid w-5/6 m-auto relative bg-base-100 card shadow-xl mb-4 px-2">
                <div class="mt-3 flex justify-between">
                    <h2 class="font-bold text-lg m-1">Spiele</h2>
                    <div class="text-sm m-2">
                        Alle Spiele
                        <input class="ml-1 mb-1 rounded" type="checkbox" name="" id="" @click="
                            (showAll = !showAll), teamClassID ? getData() : null
                        " />
                    </div>
                </div>
                <div class="overflow-auto w-full mx-auto p-2">
                    <div v-if="matchesLoading" class="">
                        <MatchLoading v-for="n in 3" :key="n"></MatchLoading>
                    </div>
                    <div v-else>
                        <div id="league-info">
                            <!-- Information about how many games and button to team component -->
                        </div>
                        <div id="no-data" v-show="!teamMatches.length">
                            <div id="no-future-matches" v-show="!showAll">
                                Keine zukünftigen Spiele
                            </div>
                            <div v-show="showAll">
                                Keine Spiele in dieser Klasse
                            </div>
                        </div>
                        <Match v-for="match in teamMatches" :key="match.id" :match="match" :teamID="teamID"
                            :teamClassID="teamClassID"></Match>
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
import { routerKey, useRoute, useRouter } from "vue-router";

import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Table from "./helpers/Table.vue";
import TableLoading from "./helpers/TableLoading.vue";
import Header from "./helpers/Header.vue";
import HeaderLoading from "./helpers/HeaderLoading.vue";

// helper function
import { fetchTeam, fetchTeamGames } from "./functions/fetchData.js";

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
const props = defineProps(["team_id", "team_class", "team_club"]);

const img_loaded = ref(true);

const teamLoading = ref(false);
const matchesLoading = ref(false);
const teamMatches = ref([]);

const teamClassID = ref(null);
const teamID = ref(null);
const teamClubNo = ref(null);
const team = ref(null);
const club = ref(null);

const showAll = ref(false);

const emit = defineEmits(["updateFavorites"]);

const getData = async () => {
    matchesLoading.value = true;
    team.value = await fetchTeam(teamID.value, teamClassID.value);
    teamMatches.value = await fetchTeamGames(
        teamID.value,
        teamClassID.value,
        [],
        showAll.value
    );
    teamMatches.value.reverse();
    matchesLoading.value = false;
};


const team_id_ref = toRef(props, "team_id");
watch(team_id_ref, async (newValue, oldValue) => {
    console.log("update club");
    if (newValue) {
        forceUpdate();
    }
});

const fetchClub = async () => {
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" +
        teamClubNo.value
    );
    const json = await response.json();
    club.value = json[0].searchResult.list[0];
    if (club.value && club.value.no) {
        router.push({
            path: "/team",
            hash: "#" + teamID.value + ";" + teamClassID.value + ";" + club.value.no
        });
    }

};

const setTeamID = async () => {
    if (props.team_id && props.team_class && props.team_club) {
        console.log("props");
        teamID.value = props.team_id;
        teamClassID.value = props.team_class;
        teamClubNo.value = props.team_club;
    } else {
        console.log("route")
        const hash = route.hash.substring(1);
        const params = hash.split(";");
        teamID.value = params[0];
        teamClassID.value = params[1];
        teamClubNo.value = params[2];
    }
};

const clickedTeam = async (team_name) => {
    console.log("clickedTeam: " + team_name);
    console.log(team.value.content.score);
    teamID.value = team.value.content.score.find(element => element.tabTeamname == team_name).tabTeamID;
    console.log(teamID.value)
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
    club.value = null;
    img_loaded.value = true;
    init();
};

const init = async () => {
    console.log("set team id");
    await setTeamID();
    console.log(teamID.value);
    console.log("get data");
    await getData();
    console.log("fetch club");
    await fetchClub();
};

onMounted(async () => {
    await init();
});
</script>

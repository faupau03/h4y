<template>
    <div class="min-h-full w-full scrolled">
        <div class="w-full grid gap-4">
            <NavBar title="Team" subtitle="Spielübersicht" />
            <div id="club-header" class="w-5/6 m-auto relative bg-base-100 card shadow-xl grid">
                <Header @updateFavorites="emit('updateFavorites')" :type="'team'" :games="teamMatches" :team_id="teamID"
                    :class_id="teamClassID" :club_id="teamClubNo" :team="team" :club="club"></Header>
                <div id="content" class="flex flex-wrap mb-5">
                    <img v-if="team && teamClubNo && img_loaded" :src="'logos/clubs/' + teamClubNo + '.png'"
                        @error="img_loaded = false" alt="" id="club-logo"
                        class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg" />

                    <div v-else class="h-24 sm:h-32 lg:h-48 ml-5 rounded-lg shadow-2xl bg-gray-200">
                        <UserGroupIcon class="text-gray-500 h-full" />
                    </div>
                    <div id="club-info" class="m-5">
                        <div class="font-bold">
                            {{ team ? team.head.name : "" }}
                        </div>
                        <div class="text-sm">
                            {{ club ? club.lname : "" }}
                        </div>
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
                    :team_score="team_score">
                </Table>
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
import { useRoute } from "vue-router";

import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Table from "./helpers/Table.vue";
import TableLoading from "./helpers/TableLoading.vue";
import Header from "./helpers/Header.vue";

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
};

const setTeamID = async () => {
    //console.log(props.team_id);
    if (props.team_id && props.team_class && props.team_club) {
        console.log("props");
        teamID.value = props.team_id;
        teamClassID.value = props.team_class;
        teamClubNo.value = props.team_club;
    } else {
        const hash = route.hash.substring(1);
        const params = hash.split(";");
        teamID.value = params[0];
        teamClassID.value = params[1];
        teamClubNo.value = params[2];
    }
    //console.log("teamID: " + teamID.value);
    //console.log("teamClassID: " + teamClassID.value);
    //console.log("teamClubNo: " + teamClubNo.value);
};

onMounted(async () => {
    await setTeamID();
    await getData();
    await fetchClub();
});
</script>

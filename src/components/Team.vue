<template>
    <div class="w-full h-full">
        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Team</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">
                Spielübersicht
            </p>
        </div>
        <div
            id="club-header"
            class="flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <ShareIcon
                class="h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5"
                @click="shareTeam"
            />

            <StarIconOutline
                class="h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5"
                v-show="!isFavorite()"
                @click="addFavorite"
            />
            <StarIcon
                class="h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5"
                v-show="isFavorite()"
                @click="removeFavorite"
            />
            <img
                v-if="team"
                :src="'logos/clubs/' + teamClubNo + '.png'"
                alt=""
                class="w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"
            />

            <div
                v-else
                class="w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-300 shadow-2xl bg-gray-300"
            >
                <UserGroupIcon class="text-gray-700" />
            </div>
            <div id="club-info" class="my-12 m-5">
                <div class="font-bold">
                    {{ team ? team.head.name : "" }}
                </div>
                <div class="text-sm text-gray-900">
                    {{ club ? club.lname : "" }}
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
            <div v-if="!team"></div>
            <!-- Handball by P Thanga Vignesh from NounProject.com -->
            <div
                v-else
                v-for="team_score in team.content.score"
                :key="team_score.tabTeamID"
                class="flex p-1 m-1 bg-indigo-100 rounded-lg"
            >
                <div class="text-sm mr-1">
                    {{ team_score.tabScore }}
                </div>
                <div
                    class="font-bold text-sm"
                    v-html="wbr(team_score.tabTeamname)"
                ></div>
                <div class="ml-auto hidden sm:flex mr-7 text-sm">
                    <img
                        class="h-5 w-5 mt-0.5 mr-1"
                        src="/icons/goal.png"
                        alt=""
                    />
                    {{ team_score.numGoalsShot }} : {{ team_score.numGoalsGot }}
                </div>
                <div class="text-sm flex sm:ml-0 ml-auto mr-7 w-fit">
                    <img class="h-4 mt-1" src="/icons/ball.svg" alt="">
                    {{ team_score.numPlayedGames }}
                </div>
                <div class="text-sm mr-2 sm:ml-5 <font-bold">
                    {{ team_score.pointsPlus }}
                </div>
            </div>
        </div>
        <div class="w-5/6 m-auto">
            <div class="mt-3 flex justify-between">
                <h2 class="font-bold text-lg m-1">Spiele</h2>
                <div class="text-sm m-2">
                    Alle Spiele
                    <input
                        class="ml-1 mb-1 rounded"
                        type="checkbox"
                        name=""
                        id=""
                        v-model="showAll"
                        @click="teamClassID ? fetchTeamMatches() : null"
                    />
                </div>
            </div>
            <div
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"
            >
                <div v-if="teamLoading">
                    <MatchLoading
                        v-for="n in 3"
                        :key="n"
                    ></MatchLoading>
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
                    <Match
                        v-for="match in teamMatches"
                        :key="match.id"
                        :match="match"
                    ></Match>
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
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";

import {
    ChevronUpIcon,
    StarIcon,
    ClockIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
} from "@heroicons/vue/solid";
import { ShareIcon } from "@heroicons/vue/outline";
import { StarIcon as StarIconOutline } from "@heroicons/vue/outline";
import { UserGroupIcon } from "@heroicons/vue/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const route = useRoute();
const favorites = ref([]);
const props = defineProps(["team_id", "team_class", "team_club"]);

const teamLoading = ref(false);
const teamMatches = ref([]);

const teamClassID = ref(null);
const teamID = ref(null);
const teamClubNo = ref(null);
const team = ref(null);
const club = ref(null);

const showAll = ref(false);

const emit = defineEmits(["updateFavorites"]);

const shareTeam = () => {
    if (navigator.share) {
        navigator.share({
            title: "Team",
            text: team.value.head.name + " " + club.value.lname,
            url: route.fullPath,
        });
    } else {
        // TODO: show alternative share method
        alert("Dein Browser unterstützt das Share-Feature nicht.");
    }
};

const wbr = (str) => {
    return str.replace("/", "/<wbr>");
};

const fetchTeamMatches = async () => {
    const response2 = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl=" +
            teamClassID.value +
            "&ct=" +
            teamID.value
    );
    const json2 = await response2.json();
    team.value = json2[0];
    const team_games = json2[0]["content"]["futureGames"]["games"];
    if (!showAll.value) {
        teamMatches.value = team_games.filter((game) => {
            const date_split = game.gDate.split(".");
            //TODO: this date is hardcoded to the 21st century
            const date = new Date(
                "20" + date_split[2],
                date_split[1] - 1,
                date_split[0]
            );
            return date > new Date();
        });
    } else {
        teamMatches.value = team_games;
    }

    teamLoading.value = false;
};

const isFavorite = () => {
    if (!favorites.value.length) {
        return false;
    }
    for (const favorite of favorites.value) {
        if (favorite.type == "team" && favorite.id == teamID.value) {
            return true;
        }
    }
};

const addFavorite = () => {
    console.log("add favorite");
    favorites.value.push({
        type: "team",
        id: teamID,
        name: team.value.head.sname,
        classid: teamClassID.value,
        clubno: teamClubNo.value,
        clubname: club.value.lname,
    });
    updateFavorites();
};

const removeFavorite = () => {
    console.log("remove favorite");

    for (const favorite of favorites.value) {
        console.log(favorite.type);
        console.log(favorite.id);
        if (favorite.type == "team" && favorite.id == teamID.value) {
            favorites.value.splice(favorites.value.indexOf(favorite), 1);
        }
    }
    updateFavorites();
};

const updateFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
    emit("updateFavorites");
};

const getFavorites = async () => {
    const json = localStorage.getItem("favorites");
    if (json) {
        favorites.value = JSON.parse(json);
    } else {
        favorites.value = [];
    }
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
    console.log(props.team_id);
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
    console.log("teamID: " + teamID.value);
    console.log("teamClassID: " + teamClassID.value);
    console.log("teamClubNo: " + teamClubNo.value);
};

onMounted(async () => {
    await setTeamID();
    await getFavorites();
    await fetchTeamMatches();
    await fetchClub();
});
</script>

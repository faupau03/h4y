<template>
    <div class="w-full h-full">
        <div class="ml-5 pt-3 mb-3">
            <h1 class="text-3xl font-bold">Verein</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">
                Spielübersicht
            </p>
        </div>
        <div
            id="club-header"
            class="grid w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <Header v-if="club" :type="'club'" :club="club" :club_id="club.no" @updateFavorites="emit('updateFavorites')"></Header>
            <div id="club-content" class="flex mb-5">
                <img
                v-if="club"
                :src="'logos/clubs/' + club.no + '.png'"
                alt=""
                class="w-1/3 ml-5 rounded-lg border border-gray-500"
            />

            <div v-else>Loading...</div>
            <div id="club-info" class=" m-5 line-clamp-4 break-words">
                <div class="font-bold">
                    {{ club.lname }}
                </div>
                <div class="text-gray-800">Postleitzahl: {{ club.postal }}</div>
                <div class="text-gray-800">Nummer: {{ club.no }}</div>
            </div>
            <a
                class="absolute bottom-5 right-5 underline text-indigo-500 hover:text-indigo-800"
                :href="'http://' + club.webaddress"
                >{{ club.webaddress }}</a
            >
            </div>
        </div>
        <div class="w-5/6 m-auto pb-24">
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
                        @click="teamClassID ? getData(teamClassID) : null"
                    />
                </div>
            </div>
            <div
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2"
            >
                <Disclosure
                    v-for="(team) in teams"
                    :key="team.gClassID"
                    v-slot="{ open }"
                >
                    <DisclosureButton
                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
                        :class="[
                            !team.matches.length
                                ? '!text-gray-600 !bg-gray-200'
                                : '',
                            (team.gClassID !== teamClassID) ? 'my-1 rounded-lg' : '',
                        ]"
                        @click="
                            team.gClassID !== teamClassID
                                ? ((teamClassID = team.gClassID),
                                open = true,
                                getData(team.gClassID))
                                : (teamClassID = null, open = false)
                        "
                        :disabled="!team.matches.length"
                    >
                        <span>{{ team.gClassSname }}</span>
                        <span class="mr-4 ml-auto text-opacity-75">{{
                            team.matches.length ? "" : "spielfrei"
                        }}</span>
                        <ChevronUpIcon
                            class="w-5 h-5 text-indigo-900"
                            :class="[
                                open ? 'transform rotate-180' : '',
                                team.matches.length ? '' : '!text-gray-500',
                            ]"
                        />
                    </DisclosureButton>
                    <DisclosurePanel
                        static
                        v-show="team.gClassID === teamClassID"
                        class="px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"
                    >
                        <div v-if="teamLoading" id="games_loading">
                            <hr
                                class="bg-gray-400 text-black h-[1.5px] -mt-3"
                            />
                            <span
                                v-show="teamLoading"
                                class="h-4 w-14 ml-auto mr-0 bg-indigo-300 rounded block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"
                            ></span>
                            <MatchLoading v-for="n in 3" :key="n">
                            </MatchLoading>
                        </div>

                        <div
                            v-else
                            v-for="(subTeam, key, index) in teamMatches"
                            :key="key"
                        >
                            <hr
                                class="bg-gray-400 text-black h-[1.5px]"
                                :class="index === 0 ? '-mt-3' : ''"
                            />
                            <router-link
                                v-if="teamID"
                                :to="
                                    'team#' +
                                    teamID[index] +
                                    ';' +
                                    team.gClassID +
                                    ';' +
                                    club.no
                                "
                                class="ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"
                                >Zum Team</router-link
                            >
                            <div id="league-info">
                                <!-- Information about how many games and button to team component -->
                            </div>
                            <Match
                                v-for="match in subTeam"
                                :key="match.gID"
                                :match="match"
                                :teamID="teamID ? teamID[index] : null"
                                :teamClassID="team.gClassID"
                            ></Match>
                            <div
                                id="no-data"
                                v-show="!subTeam.length"
                                class="mb-2"
                            >
                                <div id="no-future-matches" v-show="!showAll">
                                    Keine zukünftigen Spiele
                                </div>
                                <div v-show="showAll">
                                    Keine Spiele in dieser Klasse
                                </div>
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref, toRef } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import {
    ChevronUpIcon,
    StarIcon,
    ClockIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
} from "@heroicons/vue/solid";
import { StarIcon as StarIconOutline, ShareIcon } from "@heroicons/vue/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

// helper components
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";
import Header from "./helpers/Header.vue";

// helper functions
import { fetchTeamID, fetchTeamGames } from "./functions/fetchData.js";

const route = useRoute();
const club = ref({});
const teams = ref([]);
const props = defineProps(["club_no"]);
const teamLoading = ref(true);
const teamMatches = ref([]);
const teamClassID = ref(null);
const teamID = ref([]);
const showAll = ref(false);

const emit = defineEmits(["updateFavorites","disclosure-update"]);

club.value = {};

const elements = ref([]);

const hideOther = (id) => {
    const items = elements.value.filter((elm) => {
        return elm.getAttribute("data-id") !== id.toString();
    });
    items.forEach((elm) => elm.click());
};

const log = (message) => {
    console.log(message);
};
const fetchClub = async () => {
    let club_num = "";
    if (props.club_no) {
        club_num = props.club_no;
    } else {
        club_num = route.hash.substring(1);
    }
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" +
            club_num
    );
    const json = await response.json();
    club.value = json[0].searchResult.list[0];
};

const fetchAddress = async () => {
    const response = await fetch("/club_address.json");
    const json = await response.json();
    club.value.webaddress = json[club.value.no];
};

const fetchMatches = async () => {
    const response = await fetch(
        "https://spo.handball4all.de/misc/mobApp.php?jsoncallback=teamData&format=json&cmd=data&lvTypeNext=club&lvIDNext=" +
            club.value.id
    );
    const response_text = await response.text();
    const f = new Function("teamData", response_text);
    const json = f(function (json) {
        const json_elements = json[0].dataList;
        var teams_json = [];
        for (const element in json_elements) {
            let index = teams_json.length - 1;
            if (
                !teams_json[index] ||
                teams_json[index].gClassID != json_elements[element].gClassID
            ) {
                const tmp_json = {
                    gClassID: json_elements[element].gClassID,
                    gClassSname: json_elements[element].gClassSname,
                    matches: [],
                };
                let empty = false;
                if (!tmp_json.gClassID) {
                    tmp_json.gClassID = json_elements[element].class;
                    empty = true;
                }
                if (!tmp_json.gClassSname) {
                    tmp_json.gClassSname = json_elements[element].class_sname;
                    empty = true;
                }
                index = teams_json.push(tmp_json) - 1;
                if (!empty) {
                    teams_json[index].matches.push(json_elements[element]);
                }
            } else {
                teams_json[index].matches.push(json_elements[element]);
            }
        }
        teams.value = teams_json;
    });
};

const getData = async (teamClassID) => {
    teamLoading.value = true;
    teamID.value = await fetchTeamID(teamClassID, club.value.lname);
    if (!teamID.value) {
        console.log("no team id available");
        console.log("listing games from mobile api");
        teamMatches.value[0] = await fetchTeamGames(null,teamClassID, teams.value, showAll.value);
        teamLoading.value = false;
        return;
    }
    console.log("There are " + teamID.value.length + " teams of this club in this class.");
    teamMatches.value = {};
    for (const team of teamID.value) {
        teamMatches.value[team] = await fetchTeamGames(
            team,
            teamClassID,
            teams.value,
            showAll.value
        );
    }
    teamLoading.value = false;
};



const club_no_ref = toRef(props, "club_no");
watch(club_no_ref, async (newValue, oldValue) => {
    console.log("update club");
    if (newValue) {
        forceUpdate();
    }
});

onMounted(async () => {
    await fetchClub();
    await fetchAddress();
    await fetchMatches();
});
</script>

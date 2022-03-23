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
            class="flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"
        >
            <StarIconOutline
                class="h-5 w-5 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5"
                v-show="!isFavorite()"
                @click="addFavorite"
            />
            <StarIcon
                class="h-5 w-5 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5"
                v-show="isFavorite()"
                @click="removeFavorite"
            />
            <img
                v-if="club"
                :src="'logos/clubs/' + club.no + '.png'"
                alt=""
                class="w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"
            />

            <div v-else>Loading...</div>
            <div id="club-info" class="my-10 m-5 line-clamp-4 break-words">
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
                        @click="teamClassID ? fetchTeamMatches(teamClassID) : null"
                    />
                </div>
            </div>
            <div
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"
            >
                <Disclosure
                    v-for="(team, idx) in teams"
                    :key="team.gClassID"
                    v-slot="{ open, close }"
                >
                    <DisclosureButton
                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
                        :class="[
                            !team.matches.length
                                ? '!text-gray-600 !bg-gray-200'
                                : '',
                            !open ? 'my-1 rounded-lg' : '',
                        ]"
                        @click="teamClassID = team.gClassID,
                            hideOther(team.gClassID),
                                fetchTeamMatches(team.gClassID)
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
                        v-slot="{ close }"
                        class="px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"
                    >
                        <hr
                            class="bg-gray-400 text-black h-[1.5px] mb-2 -mt-3"
                        />
                        <router-link :to="'team#' + teamID + ';' + team.gClassID + ';' + club_no" v-show="teamID" class="ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900">Zum Team</router-link>
                        <div v-if="teamLoading">Loading...</div>
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
                            <div
                                v-for="match in teamMatches"
                                class="rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"
                            >
                                <div class="grid grid-cols-3 sm:grid-cols-6 gap-1">
                                    <div
                                        id="teams"
                                        class="text-black w-fit col-span-2 text-xs font-bold"
                                    >
                                        <!-- teams -->
                                        {{ match.gHomeTeam }} :
                                        {{ match.gGuestTeam }}
                                    </div>

                                    <div id="date-time" class="w-fit text-xs text-gray-800">
                                        <div class="flex">
                                            {{ match.gWDay }}
                                            {{ match.gDate }}
                                        </div>
                                        <div class="flex">
                                            <ClockIcon
                                            class="h-4 mr-1 text-indigo-900"
                                        />
                                        {{ match.gTime }}
                                        </div>
                                        
                                    </div>

                                    <div id="location" class="flex text-black col-span-2">
                                        <!-- Gymnasium -->
                                        <LocationMarkerIcon
                                            class="h-4 w-4 text-indigo-900 shrink-0"
                                        />
                                        <span class="truncate text-xs">
                                            {{ match.gGymnasiumName }}
                                        </span>   
                                    </div>
                                    
                                    <div id="score" class="flex w-fit">
                                        <div
                                            class="min-w-[20px] mr-1 text-right"
                                        >
                                            {{ match.gHomeGoals }}
                                        </div>
                                        :
                                        <div class="min-w-[20px] ml-1">
                                            {{ match.gGuestGoals }}
                                        </div>
                                    </div>
                                    <div id="info" class="col-span-3 text-gray-600" :class="match.gComment.length > 1 ? 'flex': 'hidden'">
                                        <InformationCircleIcon class="h-4 w-4 mt-1 mr-1"/>
                                        {{ match.gComment }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DisclosurePanel>
                    <button
                        :ref="(el) => (elements[idx] = el)"
                        :data-id="team.gClassID"
                        v-show="false"
                        @click="doClose(close, open)"
                    ></button>
                </Disclosure>
            </div>
        </div>
    </div>
</template>

<script setup>
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
import { StarIcon as StarIconOutline } from "@heroicons/vue/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const route = useRoute();
const club = ref({});
const teams = ref([]);
const favorites = ref([]);
const props = defineProps(["club_no"]);
const teamLoading = ref(false);
const teamMatches = ref([]);
const teamClassID = ref(null);
const teamID = ref(null);
const showAll = ref(false);

const emit = defineEmits(["updateFavorites", "disclosure-update"]);

club.value = {};

const elements = ref([]);

const hideOther = (id) => {
    const items = elements.value.filter((elm) => {
        return elm.getAttribute("data-id") !== id.toString();
    });
    items.forEach((elm) => elm.click());
};

const doClose = (close, open) => {
    if (!open) {
        return;
    }
    const refItem = elements.value.find((elm) => {
        return elm.getAttribute("data-id") === teamID.value;
    });
    console.log(refItem);
    close(refItem);
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

const fetchTeamMatches = async (classID) => {
    console.log(classID);
    teamMatches.value = classID;
    emit("disclosure-update");
    teamLoading.value = true;
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
            classID
    );
    const json = await response.json();
    if (!json[0]["content"]["score"].length) {
        // no scoreboard, so no teamid
        // setting matches to mobile api data
        teamMatches.value = teams.value.find(
            (team) => team.gClassID === classID
        ).matches;
        teamLoading.value = false;
        teamID.value = null;
        return;
    }
    const team_id = json[0]["content"]["score"].find((element) =>
        element.tabTeamname.includes(club.value.lname)
    );
    console.log(team_id.tabTeamID);
    teamID.value = team_id.tabTeamID;
    const response2 = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl=" +
            classID +
            "&ct=" +
            team_id.tabTeamID
    );
    const json2 = await response2.json();
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

const isFavorite = () => {
    if (!favorites.value.length) {
        return false;
    }
    for (const favorite of favorites.value) {
        if (favorite.type == "club" && favorite.id == club.value.id) {
            return true;
        }
    }
};

const addFavorite = () => {
    favorites.value.push({
        type: "club",
        id: club.value.id,
        name: club.value.lname,
        no: club.value.no,
    });
    updateFavorites();
};

const removeFavorite = () => {
    for (const favorite of favorites.value) {
        if (favorite.type == "club" && favorite.id == club.value.id) {
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

const club_no_ref = toRef(props, "club_no");
watch(club_no_ref, async (newValue, oldValue) => {
    console.log("update club");
    if (newValue) {
        forceUpdate();
    }
});

onMounted(async () => {
    await fetchClub();
    await fetchMatches();
    await getFavorites();
    await fetchAddress();
});
</script>

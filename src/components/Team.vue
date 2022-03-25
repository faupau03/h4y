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
            <div id="club-info" class="my-10 m-5">
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
                    <svg
                        class="h-4 w-4 mt-1"
                        width="700pt"
                        height="700pt"
                        version="1.1"
                        viewBox="0 0 700 700"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="m224.32 196.48-78.406 58.789 23.652 104.21 5.8125 0.96094 83.5 13.91 33.426-105.04zm-2.0859 23.414 50.277 53.867-25.703 80.836-62.754-10.461-18.594-81.656 56.773-42.59z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m386.98 245.26-105.99 17.668 2.8711 17.262 96.762-16.133 56.668 60.461-26.523 87.195-87.227 15.141-65.145-68.668-12.68 12.066 71.605 75.469 107.05-18.629 32.605-107.15-70-74.68z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m361.79 88.68-106.78 23.207-39.785 92.867 16.098 6.8711 36.23-84.562 87.535-19.004 52.465 63.676-31.891 80.082 16.27 6.4609 35.684-89.688-65.832-79.91z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m417.81 158.92-3.6914 17.09 84.562 18.355 14.766 84.938-70.207 35.102 7.8281 15.656 81.859-40.914-19.039-109.38-96.078-20.848z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m418.91 412.63-11.074 13.535 46.449 38.008 11.074-13.535z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m545 415.5-94.609 32.504-32.676 60.395 15.379 8.3398 29.465-54.414 88.148-30.281z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m528.45 275.5-11.965 12.781 63.848 59.746 11.965-12.785-63.848-59.746z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m536.96 123.2-38.043 59.129 14.73 9.4688 38.008-59.129-14.699-9.4688z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m402.7 37.512-50.688 54.926 12.852 11.863 50.688-54.926-12.852-11.859z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m168.57 344.68-25.359 71.812 16.508 5.8086 25.328-71.812z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m113.41 225.84-8.375 15.379 46.449 25.328 8.4102-15.348z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m220.7 70.77-11.758 12.957 46.449 42.246 11.793-12.953-46.484-42.246z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m210.17 471.94-0.88672 17.5 88.594 4.4102 0.85547-17.465-88.559-4.4414z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m312.47 432.63-26.352 57.113 81.93 43.031 8.1367-15.48-67.199-35.309 19.379-42.039z"
                                fill-rule="evenodd"
                            />
                            <path
                                d="m170.69 456.04c3.5625 0.12891 6.8438-1.918 8.3008-5.168 1.457-3.25 0.79687-7.0586-1.668-9.6328-61.883-66.281-80.387-162.09-47.613-246.64 32.773-84.547 111-142.83 201.39-150.08 90.387-7.2539 176.91 37.805 222.75 116.04 1.1289 2.0859 3.0547 3.6211 5.3359 4.2617 2.2812 0.63672 4.7227 0.32422 6.7695-0.87109 2.0469-1.1953 3.5234-3.168 4.0859-5.4688 0.56641-2.3008 0.17578-4.7344-1.0859-6.7383-49.215-84-142.22-132.48-239.26-124.69-97.039 7.7891-181.11 70.453-216.29 161.23s-15.305 193.73 51.133 264.89c1.582 1.7461 3.8008 2.7812 6.1523 2.8711z"
                            />
                            <path
                                d="m228.22 501.5c4.0391 0.12891 7.6445-2.5273 8.7188-6.4258 1.0703-3.8984-0.66797-8.0234-4.207-9.9805-11.184-6.3945-21.828-13.711-31.82-21.84h-0.003906c-1.7891-1.5508-4.1289-2.3086-6.4883-2.1055-2.3594 0.20703-4.5352 1.3594-6.0312 3.1953-1.4922 1.8359-2.1797 4.2031-1.8984 6.5547 0.27734 2.3516 1.4961 4.4883 3.3789 5.9258 10.734 8.7344 22.168 16.578 34.18 23.445 1.2656 0.75391 2.6992 1.1758 4.1719 1.2266z"
                            />
                            <path
                                d="m380.28 531.92c41.148-4.9453 81.102-19.945 116-44.57 69.809-49.25 110.15-130.36 107.32-215.74h0.003906c-0.066406-2.3281-1.0586-4.5312-2.7578-6.125-1.6953-1.5938-3.957-2.4453-6.2812-2.3672-2.3281 0.074218-4.5273 1.0742-6.1133 2.7773-1.5898 1.7031-2.4336 3.9648-2.3477 6.293 2.6328 79.52-34.895 154.98-99.906 200.84-65.012 45.863-148.72 55.945-222.75 26.797-2.1758-0.94141-4.6367-0.96094-6.8281-0.054688-2.1875 0.91016-3.9141 2.668-4.7852 4.8711s-0.80859 4.6641 0.16797 6.8242c0.97656 2.1602 2.7891 3.8281 5.0195 4.6289 39.746 15.648 82.105 20.773 123.25 15.824z"
                            />
                            <path
                                d="m590.8 243.45c2.6211-0.011718 5.0977-1.1953 6.7539-3.2266s2.3125-4.6992 1.7891-7.2695c-3.043-16.129-7.6484-31.926-13.738-47.168v0.003906c-0.79297-2.25-2.4688-4.082-4.6406-5.0664-2.1719-0.98828-4.6523-1.043-6.8672-0.15625s-3.9688 2.6367-4.8633 4.8477c-0.89453 2.2109-0.84375 4.6914 0.13281 6.8672 5.6719 14.188 9.9492 28.906 12.785 43.922 0.73437 4.1992 4.3867 7.2578 8.6484 7.2461z"
                            />
                        </g>
                    </svg>
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

                            <div
                                id="date-time"
                                class="w-fit text-xs text-gray-800"
                            >
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

                            <div
                                id="location"
                                class="flex text-black col-span-2"
                            >
                                <!-- Gymnasium -->
                                <LocationMarkerIcon
                                    class="h-4 w-4 text-indigo-900 shrink-0"
                                />
                                <span class="truncate text-xs">
                                    {{ match.gGymnasiumName }}
                                </span>
                            </div>

                            <div id="score" class="flex w-fit">
                                <div class="min-w-[20px] mr-1 text-right">
                                    {{ match.gHomeGoals }}
                                </div>
                                :
                                <div class="min-w-[20px] ml-1">
                                    {{ match.gGuestGoals }}
                                </div>
                            </div>
                            <div
                                id="info"
                                class="col-span-3 text-gray-600"
                                :class="
                                    match.gComment.length > 1
                                        ? 'flex'
                                        : 'hidden'
                                "
                            >
                                <InformationCircleIcon
                                    class="h-4 w-4 mt-1 mr-1"
                                />
                                {{ match.gComment }}
                            </div>
                        </div>
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
import { useMeta, useActiveMeta } from 'vue-meta'

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

const { meta } = useMeta({
    title: team.value.head.name + club.value.lname,
    description: team.value.head.name + " " + club.value.lname,
    url: route.value.fullPath,
    og: {
        title: team.value.head.name + club.value.lname,
        description: team.value.head.name + " " + club.value.lname,
        url: route.value.fullPath,
    },
})

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

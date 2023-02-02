<template>
    <div id="header" class="w-full flex xs:p-5 sm:p-4 p-2 sm:gap-5 xs:gap-3 gap-1 justify-end">
        <div id="clock" class="flex mr-auto" v-if="type == 'match'">
            <ClockIcon class="h-6 w-6 mt-1" />
            <span class="sm:text-xl sm:mt-0.5 mt-1 ml-2">
                {{ game.gDate }}
                {{ game.gTime }}
            </span>
        </div>

        <div id="title" class="hidden sm:flex font-bold md:text-lg sm:text-base text-sm">
            {{ title }}
        </div>
        <div v-if="type == 'match'" v-show="game.live == true" class="rounded-full relative w-4 h-4 mt-2">
            <div class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-500 opacity-75"></div>
            <div class="z-20 mx-auto my-auto mt-0.5 animate-none rounded-full h-3 w-3 bg-red-500"></div>
        </div>

        <Popover v-if="net_error" class="relative">
            <PopoverButton class="flex items-center btn btn-sm btn-square">
                <ExclamationCircleIcon class="h-5 text-red-600" />
            </PopoverButton>

            <PopoverPanel
                class="right-0 absolute z-10 bg-base-100 outline-1 w-20 outline outline-indigo-200 rounded-lg p-2 shadow-2xl border-indigo-300 border-1">
                <p class="text-xs">
                    Du hast die maximale Anzahl an Anfragen erreicht. Bitte versuche es später noch einmal.
                </p>
            </PopoverPanel>
        </Popover>

        <ChatBubbleBottomCenterTextIcon v-if="type == 'match'" v-show="game.robotextstate == 'generated'"
            class="h-6 mt-1 hover:text-accent cursor-pointer" @click="getText = !getText" />
        <a v-if="type == 'match'" v-show="game.sGID" :href="
            'https://spo.handball4all.de/misc/sboPublicReports.php?sGID=' +
            game.sGID
        ">
            <DocumentIcon class="h-6 mt-1 hover:text-accent"
                :class="game.robotextstate == 'generated' ? '' : 'ml-auto'" />
        </a>
        <Cal v-if="type == 'match'" class="cursor-pointer" :type="'single'" :class="game.sGID ? '' : 'ml-auto'"
            :game="game" />
        <Cal v-else-if="type == 'team'" class="cursor-pointer ml-auto" :type="'multiple'" :games="games"
            :name="club ? club.lname + '  ' + team.head.name : ''" />
        <div v-if="type == 'club' || type == 'team' || type == 'gym'" id="favorite">
            <StarIconOutline class="h-6 w-6 mt-1 ml-2 hover:text-accent cursor-pointer" v-show="!isFavorite()"
                @click="addFavorite" />
            <StarIcon class="h-6 w-6 mt-1 ml-2 text-accent hover:text-black cursor-pointer" v-show="isFavorite()"
                @click="removeFavorite" />
        </div>
        <ShareIcon class="h-6 w-6 mt-1 hover:text-accent float-right cursor-pointer flex-none" @click="share" />
    </div>
    <PressText :game_id="game_id" :getText="getText" />
</template>

<script setup>
// helper components
import Cal from "./Cal.vue";
import PressText from "./PressText.vue";
// functions
import { getFavorites, updateFavorites } from "../functions/favorites";

import { ref, onMounted } from "vue";
import {
    ShareIcon,
    ClockIcon,
    ExclamationCircleIcon,
    StarIcon as StarIconOutline,
} from "@heroicons/vue/24/outline";
import { DocumentIcon, ChatBubbleBottomCenterTextIcon, StarIcon } from "@heroicons/vue/24/solid";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const getText = ref(null);
const favorites = ref([]);

const emit = defineEmits(["updateFavorites"]);

const props = defineProps([
    "game",
    "games",
    "team",
    "club",
    "gym",
    "type",
    "club_id",
    "class_id",
    "team_id",
    "game_id",
    "gym_id",
    "title",
    "net_error"
]);

const isFavorite = () => {
    if (!favorites.value.length) {
        return false;
    }
    for (const favorite of favorites.value) {
        if (props.type == "club") {
            if (favorite.type == "club" && favorite.id == props.club.id) {
                return true;
            }
        } else if (props.type == "team") {
            if (favorite.type == "team" && favorite.id == props.team_id) {
                return true;
            }
        }
        else if (props.type == "gym") {
            if (favorite.type == "gym" && favorite.id == props.gym_id) {
                return true;
            }
        }
    }
};

const addFavorite = () => {
    if (props.type == "club") {
        favorites.value.push({
            type: "club",
            id: props.club.id,
            name: props.club.lname,
            no: props.club.no,
        });
    }
    else if (props.type == "team") {
        favorites.value.push({
            type: "team",
            id: props.team_id,
            name: props.team.head.sname,
            classid: props.class_id,
            clubno: props.club_id,
            clubname: props.club.lname,
        });
    }
    else if (props.type == "gym") {
        console.log("adding gym");
        console.log(props.gym_id);
        favorites.value.push({
            type: "gym",
            id: props.gym_id,
            name: props.gym.name,
        });
    }
    updateFavorites(favorites.value);
};

const removeFavorite = () => {
    for (const favorite of favorites.value) {
        if (props.type == "club") {
            if (favorite.type == "club" && favorite.id == props.club.id) {
                favorites.value.splice(favorites.value.indexOf(favorite), 1);
            }
        }
        else if (props.type == "team") {
            if (favorite.type == "team" && favorite.id == props.team_id) {
                favorites.value.splice(favorites.value.indexOf(favorite), 1);
            }
        }
        else if (props.type == "gym") {
            if (favorite.type == "gym" && favorite.id == props.gym_id) {
                favorites.value.splice(favorites.value.indexOf(favorite), 1);
            }
        }

    }
    updateFavorites(favorites.value);
    emit("updateFavorites");
};

const share = () => {
    // Share function for sharing content
    let content = {};
    if (props.type == "match") {
        content = {
            title:
                props.game.gHomeTeam +
                ": " +
                props.game.gGuestTeam +
                ", " +
                props.game.gDate +
                " " +
                props.game.gTime,
            text:
                props.game.gHomeTeam +
                " gegen " +
                props.game.gGuestTeam +
                "am " +
                props.game.gDate +
                " um " +
                props.game.gTime +
                " in " +
                props.game.gGymnasiumName +
                ".",
            url:
                window.location.origin +
                "/match#" +
                props.game_id +
                ";" +
                props.team_id +
                ";" +
                props.class_id,
        };
    } else if (props.type == "team") {
        content = {
            title: props.team.head.name + " " + props.club.lname,
            text: props.team.head.name + " " + props.club.lname,
            url:
                window.location.origin +
                "/team#" +
                props.team_id +
                ";" +
                props.class_id +
                ";" +
                props.club_id,
        };
    } else if (props.type == "club") {
        content = {
            title: props.club.name,
            text: props.club.name,
            url: window.location.origin + "/club#" + props.club_id,
        };
    }

    if (navigator.share) {
        navigator.share(content);
    }
    //TODO: Add fallback for not supported browsers
    else {
        alert(
            "Dein Browser unterstützt das Share-Feature nicht. Bitte benutze einen moderneren Browser."
        );
    }
};

onMounted(async () => {
    favorites.value = await getFavorites();
});
</script>

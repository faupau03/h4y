<template>
    <div class="w-full h-full">
        <div id="menu" class="h-full z-10 pl-5 w-[calc(50%+4rem)] bg-base-100 transition-all duration-300 fixed"
            :class="showMenu ? 'left-0' : '-left-1/2'">
            <Bars3Icon class="h-8 w-8 m-5 ml-auto mr-5" @click="showMenu = !showMenu" />
            <div class="mr-5 transition-all ease-in-out duration-300">
                <p class="font-bold" :class="showMenu ? '' : 'ml-[calc(100%-2.5rem)] -mr-2'">
                    Verein
                </p>
                <div v-for="favorite in favorites" v-show="favorite.type == 'club'"
                    class="btn btn-sm btn-secondary min-h-5 h-6 p-2 my-1 flex flex-nowrap whitespace-nowrap overflow-hidden text-clip overflow-hidden"
                    :class="showMenu ? '' : 'ml-[calc(100%-4rem)] -mr-2 pl-5'" @click="selectFavorite(favorite)"
                    :title="favorite.name">
                    <span class="overflow-hidden whitespace-nowrap">
                        {{ favorite.name }}
                    </span>
                </div>
                <p class="font-bold" :class="showMenu ? '' : 'ml-[calc(100%-2.5rem)] -mr-2'">
                    Team
                </p>
                <div v-for="favorite in favorites" v-show="favorite.type == 'team'"
                    class="btn btn-sm  btn-secondary min-h-5 h-6 p-2 my-1 flex flex-nowrap overflow-hidden text-clip overflow-hidden"
                    :class="showMenu ? 'flex' : 'ml-[calc(100%-4rem)] pl-6 -mr-2'" @click="selectFavorite(favorite)"
                    :title="favorite.name + ' ' + favorite.clubname">
                    <span class="ml-0 mr-auto">{{ favorite.name }}</span>
                    <span class="ml-1 mr-0 overflow-hidden truncate">
                        {{ favorite.clubname }}
                    </span>
                </div>
                <p class=" font-bold" :class="showMenu ? '' : 'ml-[calc(100%-4rem)] -mr-2 pl-6'">
                    Halle
                </p>
                <div v-for="favorite in favorites" v-show="favorite.type == 'gym'"
                    class="btn btn-sm  btn-secondary min-h-5 h-6 p-2 my-1 flex flex-nowrap overflow-hidden text-clip overflow-hidden"
                    :class="showMenu ? 'flex' : 'ml-[calc(100%-4rem)] -mr-2 pl-5'" @click="selectFavorite(favorite)"
                    :title="favorite.name">
                    <span class="ml-0 mr-auto overflow-hidden whitespace-nowrap">{{ favorite.name }}</span>
                </div>
            </div>
        </div>

        <Club class="w-[calc(100%-4rem)] ml-auto mr-0" v-if="selectedFavorite && selectedFavorite.type == 'club'"
            :club_id="selectedFavorite.id" :key="selectedFavorite.id" @updateFavorites="getFavorites" />
        <Team class="w-[calc(100%-4rem)] ml-auto mr-0" v-else-if="selectedFavorite && selectedFavorite.type == 'team'"
            :team_id="selectedFavorite.id" :team_class="selectedFavorite.classid" :team_club="selectedFavorite.clubno"
            :key="selectedFavorite.id" @updateFavorites="getFavorites" />
        <Gym class="w-[calc(100%-4rem)] ml-auto mr-0" v-else-if="selectedFavorite && selectedFavorite.type == 'gym'"
            :gym_id="selectedFavorite.id" :key="selectedFavorite.no" @updateFavorites="getFavorites" />

        <!-- Other components like, match, gym, ... -->
        <div v-else class="w-[calc(100%-4rem)] h-[calc(100vh-4rem)] ml-auto mr-0 flex justify-center items-center px-5">
            <span class="text-lg">
                Noch keine Favoriten angelegt. <br />
                Gehen Sie dafür zur Suche oder den Ligen.
            </span>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import Club from "./Club.vue";
import Team from "./Team.vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import Gym from "./Gym.vue";

import { getFavorites } from "./functions/favorites.js";

const favorites = ref([]);
const selectedFavorite = ref({});
const showMenu = ref(false);

const selectFavorite = (favorite) => {
    selectedFavorite.value = favorite;
    localStorage.setItem("selectedFavorite", JSON.stringify(favorite));
};

const getSelectedFavorite = () => {
    const selectedFavoriteLoc = localStorage.getItem("selectedFavorite");
    if (selectedFavoriteLoc) {
        selectedFavorite.value = JSON.parse(selectedFavoriteLoc);
    } else {
        selectedFavorite.value = {};
    }
    //console.log(selectedFavoriteLoc);
    let isFavorite = false;
    favorites.value.forEach((favorite) => {
        if (
            favorite.type == selectedFavorite.value.type &&
            favorite.id == selectedFavorite.value.id
        ) {
            isFavorite = true;
        }
    });
    if (!isFavorite) {
        selectedFavorite.value = favorites.value[0];
    }
};

const addFavorite = () => {
    favorites.value.push({
        type: "club",
        name: club.value.lname,
        id: club.value.id,
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
};

onMounted(async () => {
    await getFavorites();
    await getSelectedFavorite();
});
</script>

<template>
    <div class="w-full h-full">
        <div
            id="menu"
            class="h-full z-10 pl-5 w-[calc(50%+4rem)] bg-indigo-200 transition-all duration-300 fixed"
            :class="showMenu ? 'left-0' : '-left-1/2'"
        >
            <MenuAlt1Icon
                class="h-8 w-8 m-5 ml-auto mr-5"
                @click="showMenu = !showMenu"
            />
            <div class="mr-5 transition-all">
                <p class="font-bold" :class="showMenu ? '' : 'ml-[calc(100%-2.5rem)] -mr-2'">Verein</p>
                <div
                    v-for="favorite in favorites"
                    v-show="favorite.type == 'club'"
                    class="rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden"
                    :class="showMenu ? '' : 'ml-[calc(100%-3.2rem)] -mr-2'"
                    @click="selectFavorite(favorite)"
                >
                    {{ favorite.name }}
                </div>
                <p class="font-bold" :class="showMenu ? '' : 'ml-[calc(100%-2.5rem)] -mr-2'">Team</p>
                <div
                    v-for="favorite in favorites"
                    v-show="favorite.type == 'team'"
                    class="rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden"
                    :class="showMenu ? '' : 'ml-[calc(100%-3.2rem)] -mr-2'"
                    @click="selectFavorite(favorite)"
                >
                    {{ favorite.name }}
                </div>
            </div>
        </div>
        <Club
            class="w-[calc(100%-4rem)] ml-auto mr-0"
            v-if="selectedFavorite && selectedFavorite.type == 'club'"
            :club_no="selectedFavorite.no"
            :key="selectedFavorite.no"
            @updateFavorites="getFavorites"
        />
        <!-- Other components like, match, gym, ... -->
        <div v-else class="w-[calc(100%-4rem)] h-full ml-auto mr-0 flex justify-center items-center px-5">
            <span class="text-lg ">
                Noch keine Favoriten angelegt. <br> Gehen Sie dafür zur Suche oder den Ligen.
            </span>
            
        </div>

    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import Club from "./Club.vue";
import { MenuAlt1Icon } from "@heroicons/vue/outline";

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
    console.log(selectedFavoriteLoc);
    let isFavorite = false;
    favorites.value.forEach((favorite) => {
        if (favorite.type == selectedFavorite.value.type && favorite.id == selectedFavorite.value.id) {
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

const getFavorites = async () => {
    const json = localStorage.getItem("favorites");
    if (json) {
        favorites.value = JSON.parse(json);
    } else {
        favorites.value = [];
    }
    getSelectedFavorite();
};

onMounted(async () => {
    await getFavorites();
    await getSelectedFavorite();
});
</script>

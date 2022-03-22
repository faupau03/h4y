<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ViewListIcon, StarIcon, SearchIcon } from "@heroicons/vue/outline";
import { registerSW } from "virtual:pwa-register";
import { ref, onMounted } from "vue";

if ("serviceWorker" in navigator) {
    // && !/localhost/.test(window.location)) {
    registerSW();
}

const localFavorites = ref([]);
const gym = ref({});

onMounted(() => {
    console.log("onMounted");
    localFavorites.value = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );
});
</script>

<template>
    <div class="w-screen h-screen">
        <router-view></router-view>

        <div
            class="z-10 bg-white fixed bottom-0 w-full border-t border-gray-200 flex"
        >
            <router-link
                to="leagues"
                class="flex flex-grow items-center justify-center p-2 hover:text-indigo-500"
                active-class="text-indigo-500"
            >
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <ViewListIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Ligen</span>
                </div>
            </router-link>
            <router-link
                to="favorites"
                active-class="text-indigo-500"
                class="flex flex-grow items-center justify-center p-2 hover:text-indigo-500"
            >
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <StarIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Favoriten</span>
                </div>
            </router-link>
            <router-link
                to="search"
                class="flex flex-grow items-center justify-center p-2 hover:text-indigo-500"
                active-class="text-indigo-500"
            >
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <SearchIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Suche</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

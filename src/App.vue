<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ViewListIcon, StarIcon, SearchIcon } from "@heroicons/vue/outline";
import ReloadPWA from "./components/ReloadPWA.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const showUpdate = ref(false);

const localFavorites = ref([]);
const gym = ref({});


onMounted(() => {
    console.log("onMounted");
    console.log("new version 13");
    localFavorites.value = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );
});
</script>

<template>
    <div class="h-screen w-screen overflow-x-hidden">
        <ReloadPWA/>
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

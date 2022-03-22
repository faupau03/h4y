<template>
    <div class="ml-5 mt-3 mb-3 absolute">
                <h1 class="text-3xl font-bold">Suche</h1>
                <p class="text-sm text-gray-500 uppercase font-bold">Verein / Halle</p>
    </div>
    <div class="flex justify-center w-full pt-20">
        <div class="flex w-4/6">
            <SearchIcon class="ml-auto h-6 mt-2 text-neutral-800 mr-0 z-10" />
            <input type="text" autocomplete="off" class="-ml-8 w-full pl-8 rounded-full"  @input="event => fetchSearch(event.target.value)">
        </div>
    </div>
    <div class="w-4/6 mx-auto">
        <!--
            Search Results
        -->
        <div class="rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold">Verein</div>
        <div id="clubs">
            <div v-for="item in data_clubs" class="transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2" @click="$router.push('club#' + item.no)">
                {{ item.lname }}
            </div>
            <div v-show="data_clubs.length < 1" class="text-sm text-gray-500">
                Keine Ergebnisse
            </div>
        </div>
        <div class="rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold">Halle</div>
        <div id="gyms">
            <div v-for="item in data_gyms" class="transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2" @click="$router.push('gym#' + item.no)">
                {{ item.lname }}
            </div>
            <div v-show="data_gyms.length < 1" class="text-sm text-gray-500">
                Keine Ergebnisse
            </div>
        </div>

    </div>
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
import { ref } from "vue";
import { SearchIcon } from "@heroicons/vue/outline";

const isLoading = ref(false);
const searchData = ref([]);
const searchResult = ref("");
const limitText = ref("Show more");
const data_clubs = ref([]);
const data_gyms = ref([]);
const query = ref("");

const fetchSearch = async (query) => {
    isLoading.value = true;

    const response_clubs = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" + query
    );
    const response_gyms = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs=" + query
    );

    const json_clubs = await response_clubs.json();
    const json_gyms = await response_gyms.json();

    data_clubs.value = json_clubs[0].searchResult.list;
    data_gyms.value = json_gyms[0].searchResult.list;

    isLoading.value = false;
};
</script>

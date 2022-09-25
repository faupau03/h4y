<template>
    <div class="w-full grid gap-4">
        <NavBar title="Suche" subtitle="Verein/Halle" />
        <div class="flex justify-center w-full">
            <div class="flex w-4/6 items-center">
                <SearchIcon class="ml-auto h-6 text-neutral-800 mr-0 z-10" />
                <input type="text" autocomplete="off" class="input -ml-8 w-full pl-8 rounded-full shadow
            focus:ring-0 focus:outline-none" @input="event => fetchSearch(event.target.value)">
            </div>
        </div>
        <div class="w-4/6 mx-auto mb-4">
            <!--
            Search Results
        -->
            <div class="rounded-lg w-full mt-5 text-sm text-base-200-content uppercase font-bold">Verein</div>
            <div id="clubs" class="grid gap-2">
                <div v-for="item in data_clubs"
                    class="btn btn-primary h-8 min-h-8 flex justify-start hover:shadow-inner transform transition-all duration-300 scale-100 hover:scale-95 w-full"
                    @click="$router.push('club#' + item.no)">
                    {{ item.lname }}
                </div>
                <div v-show="data_clubs.length < 1" class="text-sm text-base-200-content">
                    Keine Ergebnisse
                </div>
            </div>
            <div class="rounded-lg w-full mt-5 text-sm text-base-200-content uppercase font-bold">Halle</div>
            <div id="gyms" class="grid gap-2">
                <div v-for="item in data_gyms"
                    class="btn h-8 min-h-8 flex justify-start hover:shadow-inner transform transition-all duration-300 scale-100 hover:scale-95 w-full"
                    @click="$router.push('gym#' + item.id)">
                    {{ item.lname }}
                </div>
                <div v-show="data_gyms.length < 1" class="text-sm text-base-200-content">
                    Keine Ergebnisse
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import Multiselect from "@vueform/multiselect";
import { ref } from "vue";
import { SearchIcon } from "@heroicons/vue/outline";
import NavBar from "./helpers/NavBar.vue";
import { delay } from "./functions/misc";
const isLoading = ref(false);
const searchData = ref([]);
const searchResult = ref("");
const limitText = ref("Show more");
const data_clubs = ref([]);
const data_gyms = ref([]);
const query = ref("");

const fetchSearch = async (query) => {
    isLoading.value = true;
    await delay(200);
    const response_clubs = await fetch(
        "https://spo.handball4all.de/misc/mobApp.php?jsoncallback=jQuery18206208759815204975_1660312955458&cmd=clubSearch&_=1660312978585&searchString=" + query
    );
    await delay(200);
    const response_gyms = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs=" + query
    );
    console.log(response_clubs);
    const text_clubs = await response_clubs.text();
    const json_clubs = JSON.parse(text_clubs.replace("jQuery18206208759815204975_1660312955458(", "").replace(")", ""));
    const json_gyms = await response_gyms.json();
    console.log(json_clubs);
    data_clubs.value = json_clubs[0][0].resultObjects;
    data_gyms.value = json_gyms[0].searchResult.list;

    console.log(data_clubs.value);

    isLoading.value = false;
};
</script>

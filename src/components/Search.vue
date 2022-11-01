<template>
    <div class="w-full grid gap-4">
        <NavBar title="Suche" subtitle="Verein/Halle" />
        <div class="flex justify-center w-full">
            <div class="flex w-4/6 items-center">
                <SearchIcon class="ml-auto h-6 text-neutral-800 mr-0 z-10" />
                <input type="text" autocomplete="off" class="input -ml-9 -mr-9 w-full px-10 rounded-full shadow
            focus:ring-0 focus:outline-none" @input="event => fetchSearch(event.target.value)">
                <div class="h-5 w-5">
                    <StatusOfflineIcon v-show="netError && !isLoading" class="text-red-600 h-5 w-5" />
                    <div v-show="isLoading" role="status" class="w-5">
                        <svg aria-hidden="true"
                            class="mr-2 w-5 h-5 text-base-100 animate-spin dark:text-gray-600 fill-accent"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
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
                    @click="$router.push('club#' + item.id)">
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
import { SearchIcon, StatusOfflineIcon } from "@heroicons/vue/outline";
import NavBar from "./helpers/NavBar.vue";
import { delay } from "./functions/misc";
const isLoading = ref(false);
const searchData = ref([]);
const searchResult = ref("");
const limitText = ref("Show more");
const netError = ref(false);


const data_clubs = ref([]);
const data_gyms = ref([]);
const data_leagues = ref([]);

const query = ref("");

const fetchSearch = async (query) => {
    if (query.length < 3) {
        data_clubs.value = [];
        data_gyms.value = [];
        data_leagues.value = [];
        return;
    }
    isLoading.value = true;

    try {
        //
        // Requests
        //

        // Clubs
        const response_clubs = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs=" + query);

        // Teams & Leagues
        //const response_leagues = await fetch("https://www.handball.net/a/sportdata/1/tournaments/search?query=" + query);

        // Gyms
        const response_gyms = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs=" + query);

        const response_club_json = await response_clubs.json();
        //const response_leagues_json = await response_leagues.json();
        const response_gyms_json = await response_gyms.json();
        console.log(response_clubs);
        data_clubs.value = response_club_json[0].searchResult.list;
        data_gyms.value = response_gyms_json[0].searchResult.list;
        //data_leagues.value = JSON.parse(response_leagues).data;

        console.log(data_clubs.value);

        isLoading.value = false;
    }
    catch (error) {
        netError.value = true;
        isLoading.value = false;
        return;
    }


};
</script>

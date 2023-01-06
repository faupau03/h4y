<template>
    <div class="w-full h-full flex text-3xl">
        <div class="w-full">
            <div v-if="!og && !o" id="overview" class="mx-3 sm:mx-10">
                <NavBar title="Ligen" subtitle="Übersicht" />
                <!-- all registered organizations from handball4all  -->
                <div class="flex gap-4 flex-noshrink flex-wrap pb-4">
                    <div v-for="level, key in leagues" class="mt-4 card p-4 bg-base-100 w-fit h-fit shadow-xl">
                        <h1 class="text-2xl">{{ key }}</h1>
                        <div v-for="org, key in level">
                            <router-link class="btn btn-sm btn-primary" :to="'#' + org.o + ';' + org.og">{{ key }}
                            </router-link>
                        </div>
                    </div>
                </div>

            </div>
            <div v-else class="sm:mx-10 mx-3">
                <div v-if="!games_loading">
                    <h1 class="text-3xl font-bold text-base-200-content mt-4">{{ name }}</h1>
                    <p class="text-sm text-base-200-content uppercase mb-4">{{ league }}</p>
                </div>
                <div v-else>
                    <div class="flex flex-wrap mt-4 gap-2">
                        <div class="w-60 h-8 rounded-lg bg-base-100 animate-pulse"></div>
                        <div class="w-48 h-8 rounded-lg bg-base-100 animate-pulse"></div>
                    </div>
                    <div class="flex flex-wrap mb-3 gap-2 mt-2">
                        <div class="w-64 h-4 rounded-lg bg-base-100 animate-pulse"></div>
                        <div class="w-44 h-4 rounded-lg bg-base-100 animate-pulse"></div>

                    </div>
                </div>

                <div class="card p-2 bg-base-100 shadow-xl mb-4">
                    <div id="menu" class="flex flex-wrap items-center gap-5 sm:text-xl text-sm mb-1 overflow-auto">
                        <RegionSelect @updateRegion="(id) => updateRegion(id)" :list="region_list"
                            :selected="region_selected" :loading="games_loading" />
                        <Period class="" @updatePeriod="(id) => updatePeriod(id)" :loading="games_loading"
                            :list="period_list" :selected="period_selected" />
                        <Week class="mr-auto" @updateWeek="(id) => updateWeek(id)" :loading="games_loading"
                            :list="week_list" :selected="week_selected" />
                        <div class="text-sm m-2 flex">
                            Alle
                            <span class="sm:block hidden ml-1">
                                Spiele
                            </span>
                            <input class="ml-1 mt-0.5 rounded" type="checkbox" name="" id=""
                                @click="showAll = !showAll, updateFilter(showAll)" />
                        </div>
                    </div>
                    <div v-if="!games_loading" class="w-full mx-auto">
                        <Disclosure v-for="(team) in classes" :key="team.gClassID" v-slot="{ open }">
                            <div class="bg-primary text-primary-content content-center p-0 rounded-md uppercase flex text-sm justify-between bg-opacity-75 disabled:bg-neutral/50 w-full flex-nowrap gap-3 pl-3 my-1"
                                :class="[open ? 'rounded-b-none mb-0' : '', classes.find(c => c.gClassID === team.gClassID).games.every(element =>
                                element[Object.keys(element)[0]].length < 1) ? 'bg-opacity-50' : 'font-bold']">
                                <div id="class-name" class="mr-auto my-auto">
                                    <a :href="'/league#' + team.gClassID" class="link link-hover"><span
                                            class="h-fit my-auto sm:hidden block">{{
                                                team.gClassSname
                                            }}</span></a>
                                    <a :href="'/league#' + team.gClassID" class="link link-hover"><span
                                            class="h-fit my-auto hidden sm:block">{{
                                                team.gClassLname
                                            }}</span></a>
                                </div>
                                <span id="league-info"
                                    class="ml-auto h-fit my-auto text-primary-content mr-5 text-gray-500 text-xs">
                                    <span class="h-fit" v-if="team.games.length < 1">
                                        <span class=""
                                            v-if="games_data.content.classes.find(c => c.gClassID === team.gClassID).games.length < 1">
                                            spielfrei
                                        </span>
                                        <span v-else>
                                            Keine zukünftigen Spiele
                                        </span>
                                    </span>
                                </span>
                                <DisclosureButton class="btn btn-primary justify-self-end  flex-nowrap gap-3" @click="
                                    team.gClassID !== teamClassID
                                        ? (teamClassID = team.gClassID,
                                            open = true)
                                        : (teamClassID = null, open = false)
                                " :disabled="classes.find(c => c.gClassID === team.gClassID).games.every(element =>
element[Object.keys(element)[0]].length < 1)" :class="[open ? 'rounded-b-none mb-0' : '']">

                                    <ChevronUpIcon class="w-5 h-5" :class="[
                                        open ? 'transform rotate-180' : '',
                                        classes.find(c => c.gClassID === team.gClassID).games.every(element => element[Object.keys(element)[0]].length < 1) ? 'text-gray-500' : 'text-primary-content',
                                    ]" />
                                </DisclosureButton>

                            </div>
                            <DisclosurePanel static v-show="team.gClassID === teamClassID"
                                class="px-4 pt-4 pb-2 text-sm bg-primary bg-opacity-20 rounded-b-lg">
                                <div>

                                    <hr class="bg-gray-400 text-black h-[1.5px] -mt-3" />
                                    <!-- <router-link v-if="Object.keys(subTeam)[0]" :to="
                                    'team#' +
                                    Object.keys(subTeam)[0] +
                                    ';' +
                                    team.gClassID +
                                    ';'
                                
                                "
                                    class="ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900">
                                    Zum Team</router-link> -->
                                    <div id="league-info">
                                        <!-- Information about how many games and button to team component -->
                                    </div>
                                    <Match v-for="match in team.games" :key="match.gID" :match="match" :teamID="null"
                                        :teamClassID="team.gClassID"></Match>
                                    <div id="no-data" v-show="!team.games.length" class="mb-2">
                                        <div id="no-future-matches" v-show="!showAll">
                                            Keine zukünftigen Spiele
                                        </div>
                                        <div v-show="showAll">
                                            Keine Spiele in dieser Klasse
                                        </div>
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </div>
                    <div v-else class="overflow-auto max-h-[50%] w-full mx-auto">
                        <div v-for="i in 10"
                            class="btn btn-primary border-none bg-opacity-25 w-full flex justify-end flex-nowrap gap-3 my-1 disabled">
                            <div class="animate-pulse rounded-lg bg-base-100 h-3 sm:w-44 w-16">
                            </div>
                            <div class="animate pulse rounded-full bg-base-100 h-3 sm:w-44 w-3 ml-auto mr-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, onUpdated, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
    ChevronUpIcon,
} from "@heroicons/vue/24/solid";

import { filterGames } from "./functions/misc.js";

import NavBar from "./helpers/NavBar.vue";
import Match from "./helpers/Match.vue";
import MatchLoading from "./helpers/MatchLoading.vue";

import Period from "./helpers/Period.vue";
import Week from "./helpers/Week.vue";
import RegionSelect from "./helpers/RegionSelect.vue";

const route = useRoute();
const router = useRouter();

const games_loading = ref(true);
const games_data = ref(null);
const period_list = ref([]);
const period_selected = ref(null);
const region_list = ref([]);
const region_selected = ref(null);
const week_list = ref({});
const week_selected = ref(null);
const classes = ref([]);

const teamClassID = ref(null);
const showAll = ref(false);

const leagues = ref({});
const loading = ref(true);
const name = ref('');
const league = ref('');
const o = ref(null);
const og = ref(null);

//watch route change
watch(route, async (newVal, oldVal) => {
    console.log("route changed", newVal.hash);
    if (newVal.hash) {
        o.value = newVal.hash.replace("#", "").split(';')[0];
        if (o.value == "undefined") {
            o.value = null;
        }
        og.value = newVal.hash.replace("#", "").split(';')[1];
        if (og.value == "undefined") {
            og.value = null;
        }
        period_selected.value = newVal.hash.replace("#", "").split(';')[2];
        if (period_selected.value == "undefined") {
            period_selected.value = null;
        }
        week_selected.value = newVal.hash.replace("#", "").split(';')[3];
        if (week_selected.value == "undefined") {
            week_selected.value = null;
        }
    }
    else {
        o.value = null;
        og.value = null;
    }
    await getLeagues();
    if (og.value || o.value) {
        await fetchGames();
    }

});

const updateRegion = (id) => {
    console.log("updateRegion");
    console.log(region_list.value[id]);
    region_selected.value = id;
    o.value = id;
    router.push({ path: '/leagues', hash: '#' + o.value + ';' + og.value + ';' + period_selected.value + ';' + week_selected.value });
}
const updateWeek = (id) => {
    console.log("updateWeek");
    console.log(week_list.value[id]);
    week_selected.value = id;
    router.push({ path: '/leagues', hash: '#' + o.value + ';' + og.value + ';' + period_selected.value + ';' + week_selected.value });
}

const updatePeriod = (id) => {
    console.log("updatePeriod");
    console.log(id);
    console.log(period_list.value[id]);
    period_selected.value = id;
    router.push({ path: '/leagues', hash: '#' + o.value + ';' + og.value + ';' + period_selected.value + ';' + week_selected.value });
}

const updateFilter = (show) => {
    const all_classes = JSON.parse(JSON.stringify(games_data.value.content.classes));
    //console.log("Before:", JSON.stringify(games_data.value.content.classes).length);

    classes.value = all_classes.map((club_class) => {
        club_class.games = filterGames(club_class.games, show);
        return club_class;
    });
    //console.log("After:", JSON.stringify(classes.value).length);
}

const fetchGames = async () => {

    //console.log("o", o.value);
    //console.log("og", og.value);
    games_loading.value = true;

    //console.log(selected.value);
    //console.log(period.value);
    let response;
    if (week_selected.value || period_selected.value) {
        if (o.value && og.value) {
            response = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=po&o=" + o.value + "&og=" + og.value + "&do=" + week_selected.value + "&p=" + period_selected.value);
        }
        else if (og.value) {
            response = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=po&og=" + og.value + "&do=" + week_selected.value + "&p=" + period_selected.value);
        }
        else {
            response = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=po&o=" + o.value + "&do=" + week_selected.value + "&p=" + period_selected.value);
        }
    }
    else {
        if (o.value && og.value) {
            response = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=po&o=" + o.value + "&og=" + og.value);
        }
        else if (og.value) {
            response = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=po&og=" + og.value);
        }
        else {
            response = await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=po&o=" + o.value);
        }
    }


    const data = await response.json();
    games_data.value = data[0];

    period_list.value = games_data.value.menu.period.list;
    period_selected.value = games_data.value.menu.period.selectedID;

    //console.log("periods", periods.value);
    //console.log("period", period.value);

    week_list.value = games_data.value.menu.dt.list;
    week_selected.value = games_data.value.menu.dt.selected;

    region_list.value = games_data.value.menu.org.list;
    region_selected.value = games_data.value.menu.org.selectedID;

    classes.value = games_data.value.content.classes;

    name.value = region_list.value[Object.keys(region_list.value)[0]];
    league.value = games_data.value.head.headline2;
    updateFilter(showAll.value);

    games_loading.value = false;
};


const goPeriodBack = () => {
    //console.log("Objects", periods.value);
    //console.log("Array", Object.keys(periods.value));
    const index = Object.keys(periods.value).indexOf(String(period.value));
    const newPeriod = Object.keys(periods.value)[index - 1];
    //console.log(index);
    if (!newPeriod) return;
    period.value = newPeriod;
    fetchGames();
};

const goPeriodForward = () => {
    const index = Object.keys(periods.value).indexOf(String(period.value));
    const newPeriod = Object.keys(periods.value)[index + 1];
    if (!newPeriod) return;
    period.value = newPeriod;
    fetchGames();
};


const goDateBack = () => {
    //console.log(date_list.value);
    const index = Object.keys(date_list.value).findIndex((element) => element == selected.value);
    //console.log(index);
    selected.value = Object.keys(date_list.value)[index - 1];
    //console.log(selected.value);
    fetchGames();
};
const goDateForward = () => {
    const index = Object.keys(date_list.value).findIndex((element) => element == selected.value);
    selected.value = Object.keys(date_list.value)[index + 1];
    fetchGames();
};

const getLeagues = async () => {
    loading.value = true;
    const response = await fetch("/organizations.json");
    const data = await response.json();
    leagues.value = data;
    loading.value = false;
}

onMounted(async () => {
    if (route.hash) {
        o.value = route.hash.replace("#", "").split(';')[0];
        if (o.value == "undefined") {
            o.value = null;
        }
        og.value = route.hash.replace("#", "").split(';')[1];
        if (og.value == "undefined") {
            og.value = null;
        }
    }
    else {
        o.value = null;
        og.value = null;
    }

    console.log("o", o.value);
    console.log("og", og.value);
    await getLeagues();
    console.log("leagues", leagues.value);


    if (o.value || og.value) {
        await fetchGames();
    }
});
</script>
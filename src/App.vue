<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ViewListIcon, StarIcon, SearchIcon, UserGroupIcon, } from "@heroicons/vue/outline";
import ReloadPWA from "./components/ReloadPWA.vue";
import { ref, onMounted, onUpdated, watch, handleError } from "vue";
import { useRoute } from "vue-router";
import { isDark } from "./components/functions/misc.js";
import { themeChange } from 'theme-change';

const showUpdate = ref(false);

const localFavorites = ref([]);
const gym = ref({});
const last_tab = ref("");
const now_tab = ref("");
const isTab = ref(false);
const show_last_page = ref(true);
const route = useRoute();
const is_dark = ref(isDark());

//watch route change
watch(route, (newVal, oldVal) => {
    //console.log("route changed", newVal, oldVal);
    updateTab();
});

const updateTab = () => {
    if (window.location.href.includes('team') || window.location.href.includes('match') || window.location.href.includes('gym') || window.location.href.includes('club')) {
        last_tab.value = window.location.href;
        isTab.value = true;
    }
    now_tab.value = window.location.href;
}


window.addEventListener('storage', () => {
    console.log("storage changed");
    show_last_page.value = localStorage.getItem("show_last_page") === "true";
    console.log(show_last_page.value);
    updateTab();
});

onUpdated(() => {
    console.log("onUpdated");
    updateTab();
    is_dark.value = isDark();
});

onMounted(() => {
    themeChange(false);
    is_dark.value = isDark();
    console.log("onMounted");
    console.log("new version 14");
    localFavorites.value = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );
    updateTab();
});




</script>

<template>
    <div class="h-screen w-screen overflow-x-hidden bg-base-200">
        <ReloadPWA />
        <div class="w-full h-[calc(100%-4rem)] overflow-y-scroll bg-gradient-to-r from-primary to-secondary">
            <div class="min-h-full w-full scrolled bg-base-100/50">

            
            <router-view v-slot="{ Component }">
                <keep-alive include="['search', 'favorites']">
                    <component :is="Component" />
                </keep-alive>
            </router-view>
            </div>
        </div>
        <div class="z-10 h-16 bg-base-300 fixed bottom-0 w-full flex text-base-200-content  fill-base-200-content">
            <router-link to="leagues"
                class="flex flex-grow items-center justify-center p-2 hover:text-accent brightness-50 saturate-200"
                :class="is_dark ? 'brightness-100' : ''" active-class="active text-accent">
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <ViewListIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Ligen</span>
                </div>
            </router-link>
            <router-link to="favorites" active-class="active text-accent" :class="is_dark ? 'brightness-100' : ''"
                class="flex flex-grow items-center justify-center p-2 hover:text-accent brightness-50 saturate-200 dark:brightness-100">
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <StarIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Favoriten</span>
                </div>
            </router-link>
            <router-link to="search" :class="is_dark ? 'brightness-100' : ''"
                class="flex flex-grow items-center justify-center p-2 hover:text-accent brightness-50 saturate-200 dark:brightness-100"
                active-class="active text-accent">
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <SearchIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Suche</span>
                </div>
            </router-link>

            <router-link v-if="isTab && show_last_page" :to="last_tab"
                class="flex flex-grow items-center justify-center p-2 hover:text-accent hover:fill-accent brightness-50 saturate-200 dark:brightness-100"
                :class="(now_tab.includes('team') || now_tab.includes('match') || now_tab.includes('gym') || now_tab.includes('club')) ? 'text-accent fill-accent active' : '', is_dark ? 'brightness-100' : ''">
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <UserGroupIcon v-if="last_tab.includes('team')" class="h-7 w-7 mx-auto" />
                        <svg v-if="last_tab.includes('match')" class="h-7 w-7 mx-auto " width="700pt" height="700pt"
                            version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path
                                    d="m224.32 196.48-78.406 58.789 23.652 104.21 5.8125 0.96094 83.5 13.91 33.426-105.04zm-2.0859 23.414 50.277 53.867-25.703 80.836-62.754-10.461-18.594-81.656 56.773-42.59z"
                                    fill-rule="evenodd" />
                                <path
                                    d="m386.98 245.26-105.99 17.668 2.8711 17.262 96.762-16.133 56.668 60.461-26.523 87.195-87.227 15.141-65.145-68.668-12.68 12.066 71.605 75.469 107.05-18.629 32.605-107.15-70-74.68z"
                                    fill-rule="evenodd" />
                                <path
                                    d="m361.79 88.68-106.78 23.207-39.785 92.867 16.098 6.8711 36.23-84.562 87.535-19.004 52.465 63.676-31.891 80.082 16.27 6.4609 35.684-89.688-65.832-79.91z"
                                    fill-rule="evenodd" />
                                <path
                                    d="m417.81 158.92-3.6914 17.09 84.562 18.355 14.766 84.938-70.207 35.102 7.8281 15.656 81.859-40.914-19.039-109.38-96.078-20.848z"
                                    fill-rule="evenodd" />
                                <path d="m418.91 412.63-11.074 13.535 46.449 38.008 11.074-13.535z"
                                    fill-rule="evenodd" />
                                <path
                                    d="m545 415.5-94.609 32.504-32.676 60.395 15.379 8.3398 29.465-54.414 88.148-30.281z"
                                    fill-rule="evenodd" />
                                <path d="m528.45 275.5-11.965 12.781 63.848 59.746 11.965-12.785-63.848-59.746z"
                                    fill-rule="evenodd" />
                                <path d="m536.96 123.2-38.043 59.129 14.73 9.4688 38.008-59.129-14.699-9.4688z"
                                    fill-rule="evenodd" />
                                <path d="m402.7 37.512-50.688 54.926 12.852 11.863 50.688-54.926-12.852-11.859z"
                                    fill-rule="evenodd" />
                                <path d="m168.57 344.68-25.359 71.812 16.508 5.8086 25.328-71.812z"
                                    fill-rule="evenodd" />
                                <path d="m113.41 225.84-8.375 15.379 46.449 25.328 8.4102-15.348z"
                                    fill-rule="evenodd" />
                                <path d="m220.7 70.77-11.758 12.957 46.449 42.246 11.793-12.953-46.484-42.246z"
                                    fill-rule="evenodd" />
                                <path d="m210.17 471.94-0.88672 17.5 88.594 4.4102 0.85547-17.465-88.559-4.4414z"
                                    fill-rule="evenodd" />
                                <path
                                    d="m312.47 432.63-26.352 57.113 81.93 43.031 8.1367-15.48-67.199-35.309 19.379-42.039z"
                                    fill-rule="evenodd" />
                                <path
                                    d="m170.69 456.04c3.5625 0.12891 6.8438-1.918 8.3008-5.168 1.457-3.25 0.79687-7.0586-1.668-9.6328-61.883-66.281-80.387-162.09-47.613-246.64 32.773-84.547 111-142.83 201.39-150.08 90.387-7.2539 176.91 37.805 222.75 116.04 1.1289 2.0859 3.0547 3.6211 5.3359 4.2617 2.2812 0.63672 4.7227 0.32422 6.7695-0.87109 2.0469-1.1953 3.5234-3.168 4.0859-5.4688 0.56641-2.3008 0.17578-4.7344-1.0859-6.7383-49.215-84-142.22-132.48-239.26-124.69-97.039 7.7891-181.11 70.453-216.29 161.23s-15.305 193.73 51.133 264.89c1.582 1.7461 3.8008 2.7812 6.1523 2.8711z" />
                                <path
                                    d="m228.22 501.5c4.0391 0.12891 7.6445-2.5273 8.7188-6.4258 1.0703-3.8984-0.66797-8.0234-4.207-9.9805-11.184-6.3945-21.828-13.711-31.82-21.84h-0.003906c-1.7891-1.5508-4.1289-2.3086-6.4883-2.1055-2.3594 0.20703-4.5352 1.3594-6.0312 3.1953-1.4922 1.8359-2.1797 4.2031-1.8984 6.5547 0.27734 2.3516 1.4961 4.4883 3.3789 5.9258 10.734 8.7344 22.168 16.578 34.18 23.445 1.2656 0.75391 2.6992 1.1758 4.1719 1.2266z" />
                                <path
                                    d="m380.28 531.92c41.148-4.9453 81.102-19.945 116-44.57 69.809-49.25 110.15-130.36 107.32-215.74h0.003906c-0.066406-2.3281-1.0586-4.5312-2.7578-6.125-1.6953-1.5938-3.957-2.4453-6.2812-2.3672-2.3281 0.074218-4.5273 1.0742-6.1133 2.7773-1.5898 1.7031-2.4336 3.9648-2.3477 6.293 2.6328 79.52-34.895 154.98-99.906 200.84-65.012 45.863-148.72 55.945-222.75 26.797-2.1758-0.94141-4.6367-0.96094-6.8281-0.054688-2.1875 0.91016-3.9141 2.668-4.7852 4.8711s-0.80859 4.6641 0.16797 6.8242c0.97656 2.1602 2.7891 3.8281 5.0195 4.6289 39.746 15.648 82.105 20.773 123.25 15.824z" />
                                <path
                                    d="m590.8 243.45c2.6211-0.011718 5.0977-1.1953 6.7539-3.2266s2.3125-4.6992 1.7891-7.2695c-3.043-16.129-7.6484-31.926-13.738-47.168v0.003906c-0.79297-2.25-2.4688-4.082-4.6406-5.0664-2.1719-0.98828-4.6523-1.043-6.8672-0.15625s-3.9688 2.6367-4.8633 4.8477c-0.89453 2.2109-0.84375 4.6914 0.13281 6.8672 5.6719 14.188 9.9492 28.906 12.785 43.922 0.73437 4.1992 4.3867 7.2578 8.6484 7.2461z" />
                            </g>
                        </svg>
                        <img v-if="last_tab.includes('gym')" src="/icons/football-field.png" class="h-7 w-7 mx-auto" />
                        <img v-if="last_tab.includes('club')" src="/icons/verein.png" class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">
                        {{ (last_tab.includes('team')) ? 'Team' : '' }}
                        {{ (last_tab.includes('match')) ? 'Spiel' : '' }}
                        {{ (last_tab.includes('gym')) ? 'Gym' : '' }}
                        {{ (last_tab.includes('club')) ? 'Club' : '' }}
                    </span>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style>
.scrolled {
    -webkit-box-shadow: inset 5px -27px 36px -23px rgba(160, 160, 160, 0.2);
    box-shadow: inset 5px -27px 36px -23px rgba(160, 160, 160, 0.2);
}
/* width */
::-webkit-scrollbar {
    width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
    background: hsl(var(--b3));
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: hsl(var(--a));
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--a));
}
</style>
<style scoped>
.active {
    border-top-color: hsl(var(--a));
    border-top-width: 2px;
}
</style>
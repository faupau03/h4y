<script setup>
import { Bars3Icon, StarIcon, MagnifyingGlassIcon, UserGroupIcon, } from "@heroicons/vue/24/outline";
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
    updateTab();
});

const updateTab = () => {
    if (window.location.href.includes('team') || window.location.href.includes('match') || window.location.href.includes('gym') || window.location.href.includes('club')) {
        last_tab.value = window.location.href;
        isTab.value = true;
    }
    now_tab.value = window.location.href;
}

// TODO: needed?
window.addEventListener('storage', () => {
    show_last_page.value = localStorage.getItem("show_last_page") === "true";
    updateTab();
});

onUpdated(() => {
    updateTab();
    is_dark.value = isDark();
});

onMounted(() => {
    themeChange(false);
    is_dark.value = isDark();
    localFavorites.value = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );
    updateTab();
});




</script>

<template>
    <div class="h-screen w-screen overflow-x-hidden bg-base-200">
        <ReloadPWA />
        <div id="wrapper-div"
            class="w-full h-[calc(100%-4rem)] overflow-y-scroll bg-gradient-to-r from-primary to-secondary">
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
                        <Bars3Icon class="h-7 w-7 mx-auto" />
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
                        <MagnifyingGlassIcon class="h-7 w-7 mx-auto" />
                    </span>
                    <span class="block text-xs leading-none">Suche</span>
                </div>
            </router-link>

            <router-link v-if="isTab && show_last_page" :to="last_tab"
                class="flex flex-grow items-center justify-center p-2 hover:text-accent hover:fill-accent fill-current inherit brightness-50 saturate-200 dark:brightness-100"
                :class="(now_tab.includes('team') || now_tab.includes('match') || now_tab.includes('gym') || now_tab.includes('club')) ? 'text-accent fill-accent active' : '', is_dark ? 'brightness-100' : ''">
                <div class="text-center">
                    <span class="block h-8 text-3xl leading-8">
                        <UserGroupIcon v-if="last_tab.includes('team')" class="h-7 w-7 mx-auto" />
                        <svg v-if="last_tab.includes('match')" class="h-7 w-7 mx-auto" width="700pt" height="700pt"
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
                                <path d="m418.91 412.63-11.074 13.535 46.449 38.008 11.074-13.535z" fill-rule="evenodd" />
                                <path d="m545 415.5-94.609 32.504-32.676 60.395 15.379 8.3398 29.465-54.414 88.148-30.281z"
                                    fill-rule="evenodd" />
                                <path d="m528.45 275.5-11.965 12.781 63.848 59.746 11.965-12.785-63.848-59.746z"
                                    fill-rule="evenodd" />
                                <path d="m536.96 123.2-38.043 59.129 14.73 9.4688 38.008-59.129-14.699-9.4688z"
                                    fill-rule="evenodd" />
                                <path d="m402.7 37.512-50.688 54.926 12.852 11.863 50.688-54.926-12.852-11.859z"
                                    fill-rule="evenodd" />
                                <path d="m168.57 344.68-25.359 71.812 16.508 5.8086 25.328-71.812z" fill-rule="evenodd" />
                                <path d="m113.41 225.84-8.375 15.379 46.449 25.328 8.4102-15.348z" fill-rule="evenodd" />
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
                        <svg v-if="last_tab.includes('gym')" class="h-7 w-7 mx-auto" width="700pt" height="700pt"
                            version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <symbol id="w" overflow="visible">
                                    <path
                                        d="m18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z" />
                                </symbol>
                                <symbol id="c" overflow="visible">
                                    <path
                                        d="m13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z" />
                                </symbol>
                                <symbol id="b" overflow="visible">
                                    <path
                                        d="m17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z" />
                                </symbol>
                                <symbol id="l" overflow="visible">
                                    <path
                                        d="m9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z" />
                                </symbol>
                                <symbol id="d" overflow="visible">
                                    <path
                                        d="m7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z" />
                                </symbol>
                                <symbol id="k" overflow="visible">
                                    <path
                                        d="m12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z" />
                                </symbol>
                                <symbol id="j" overflow="visible">
                                    <path
                                        d="m10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z" />
                                </symbol>
                                <symbol id="i" overflow="visible">
                                    <path
                                        d="m0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z" />
                                </symbol>
                                <symbol id="h" overflow="visible">
                                    <path
                                        d="m2.5781-20.406h5.25v7.4375l7.5938-7.4375h6.1094l-9.8281 9.6562 10.844 10.75h-6.5938l-8.125-8.0469v8.0469h-5.25z" />
                                </symbol>
                                <symbol id="f" overflow="visible">
                                    <path d="m2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z" />
                                </symbol>
                                <symbol id="e" overflow="visible">
                                    <path d="m2.3594-21.281h4.8906v21.281h-4.8906z" />
                                </symbol>
                                <symbol id="v" overflow="visible">
                                    <path d="m0.14062-20.406h18.812v3.9688h-6.7656v16.438h-5.2656v-16.438h-6.7812z" />
                                </symbol>
                                <symbol id="a" overflow="visible">
                                    <path
                                        d="m9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z" />
                                </symbol>
                                <symbol id="g" overflow="visible">
                                    <path
                                        d="m16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z" />
                                </symbol>
                                <symbol id="u" overflow="visible">
                                    <path
                                        d="m0.42188-15.312h4.8906l3.8281 10.578 3.7969-10.578h4.9062l-6.0312 15.312h-5.375z" />
                                </symbol>
                                <symbol id="t" overflow="visible">
                                    <path
                                        d="m12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z" />
                                </symbol>
                                <symbol id="s" overflow="visible">
                                    <path
                                        d="m17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z" />
                                </symbol>
                                <symbol id="r" overflow="visible">
                                    <path
                                        d="m2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z" />
                                </symbol>
                                <symbol id="q" overflow="visible">
                                    <path
                                        d="m2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z" />
                                </symbol>
                                <symbol id="p" overflow="visible">
                                    <path
                                        d="m17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z" />
                                </symbol>
                                <symbol id="o" overflow="visible">
                                    <path
                                        d="m2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z" />
                                </symbol>
                                <symbol id="n" overflow="visible">
                                    <path
                                        d="m2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z" />
                                </symbol>
                                <symbol id="m" overflow="visible">
                                    <path
                                        d="m14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z" />
                                </symbol>
                            </defs>
                            <g>
                                <path
                                    d="m98 115.92v327.61h255.36l248.64-0.007813v-327.04l-504 0.003907zm10.078 53.199c44.801 5.0391 80.078 43.121 80.078 89.602v43.121c0 46.48-35.281 84.559-80.078 89.602zm43.121 264.32c2.8008-1.1211 5.0391-2.2383 7.2812-3.3594l-3.3594-6.7188c-2.8008 1.1211-6.1602 2.8008-8.9609 3.9219l2.2383 6.1602h-10.641l-1.1211-2.8008c-3.3594 1.1211-6.1602 1.6797-9.5195 2.2383v0.55859h-19.039v-35.281c49.281-5.0391 87.359-46.48 87.359-96.879v-43.121c0-50.398-38.641-91.84-87.359-96.879v-35.281h19.602v0.55859c3.3594 0.55859 6.1602 1.6797 9.5195 2.8008l1.1211-3.3594h10.641l-2.2383 6.1602c2.8008 1.1211 6.1602 2.2383 8.9609 3.9219l3.3594-6.7188c-2.8008-1.1211-5.0391-2.2383-7.8398-3.3594h194.88v307.44zm440.72-42.562c-44.801-5.0391-80.078-43.121-80.078-89.602v-43.121c0-46.48 35.281-84.559 80.078-89.602zm-87.363-132.72v43.121c0 50.398 38.641 91.84 87.359 96.879v35.281h-19.602v-0.55859c-3.3594-0.55859-6.1602-1.6797-9.5195-2.8008l-1.1211 3.3594h-10.641l2.2383-6.1602c-2.8008-1.1211-6.1602-2.2383-8.9609-3.9219l-3.3594 6.7188c2.8008 1.1211 5.0391 2.2383 7.8398 3.3594l-194.87 0.003906v-307.44h195.44c-2.8008 1.1211-5.0391 2.2383-7.2812 3.3594l3.3594 6.7188c2.8008-1.1211 6.1602-2.8008 8.9609-3.9219l-2.8008-6.1562h10.641l1.1211 2.8008c3.3594-1.1211 6.1602-1.6797 9.5195-2.2383v-0.55859h19.039v35.281c-49.281 5.0352-87.363 46.477-87.363 96.875z" />
                                <path d="m486.08 272.72h7.8398v14.559h-7.8398z" />
                                <path d="m206.08 272.72h7.8398v14.559h-7.8398z" />
                                <path
                                    d="m220.08 185.36c-1.6797-2.8008-3.9219-6.1602-5.6016-8.9609l-6.1602 4.4805c1.6797 2.8008 3.9219 5.6016 5.6016 8.3984z" />
                                <path
                                    d="m231.84 245.28 7.2812-0.55859c-0.55859-3.3594-0.55859-6.7188-1.6797-10.641l-6.7227 1.1172c0.5625 3.3594 1.1211 6.7227 1.1211 10.082z" />
                                <path
                                    d="m228.48 225.68 7.2812-1.6797c-1.1211-3.3594-1.6797-6.7188-2.8008-10.078l-7.2812 2.2383c1.1211 2.8008 2.2422 6.1602 2.8008 9.5195z" />
                                <path
                                    d="m222.32 206.64 6.7188-2.8008c-1.1211-3.3594-2.8008-6.1602-4.4805-9.5195l-6.7188 3.3594c2.2383 2.8008 3.3594 6.1602 4.4805 8.9609z" />
                                <path
                                    d="m164.08 418.88 3.9219 6.7188c2.8008-1.6797 6.1602-3.3594 8.9609-5.6016l-3.9219-6.1602c-3.3594 1.6836-6.1602 3.3633-8.9609 5.043z" />
                                <path
                                    d="m208.32 168c-2.2383-2.8008-4.4805-5.6016-6.7188-7.8398l-5.6016 5.0391c2.2383 2.2383 4.4805 5.0391 6.7188 7.2812z" />
                                <path
                                    d="m230.72 325.36 7.2812 1.1211c0.55859-3.3594 1.1211-6.7188 1.6797-10.078l-7.2812-0.55859c-0.55859 2.7969-1.1172 6.1562-1.6797 9.5156z" />
                                <path
                                    d="m164.64 141.12c2.8008 1.6797 5.6016 3.3594 8.3984 5.0391l4.4805-6.1602c-2.8008-1.6797-5.6016-3.9219-8.9609-5.6016z" />
                                <path
                                    d="m225.68 344.4 7.2812 2.2383c1.1211-3.3594 2.2383-6.7188 2.8008-10.078l-7.2812-1.6797c-0.55859 3.3594-1.6797 6.7227-2.8008 9.5195z" />
                                <path d="m240.24 254.8h-7.2812v3.3594 6.7188h7.2812v-6.7188-3.3594z" />
                                <path d="m232.96 274.96h7.8398v10.078h-7.8398z" />
                                <path d="m232.96 301.84v3.9219h7.2812v-4.4805-6.1602h-7.2812z" />
                                <path
                                    d="m180.32 408.24 4.4805 6.1602c2.8008-2.2383 5.6016-4.4805 7.8398-6.7188l-5.0391-5.6016c-1.6797 1.6836-4.4805 3.9219-7.2812 6.1602z" />
                                <path
                                    d="m180.88 152.32c2.8008 2.2383 5.0391 3.9219 7.8398 6.1602l5.0391-5.6016c-2.8008-2.2383-5.0391-4.4805-7.8398-6.7188z" />
                                <path
                                    d="m195.44 394.8 5.6016 5.0391c2.2383-2.2383 4.4805-5.0391 6.7188-7.8398l-5.6016-5.0391c-2.2383 2.8008-4.4805 5.5977-6.7188 7.8398z" />
                                <path
                                    d="m207.76 379.68 6.1602 4.4805c2.2383-2.8008 3.9219-5.6016 5.6016-8.9609l-6.7188-3.9219c-1.125 2.8008-2.8047 5.6016-5.043 8.4023z" />
                                <path
                                    d="m218.4 362.88 6.7188 3.3594c1.6797-3.3594 2.8008-6.1602 4.4805-9.5195l-6.7188-2.8008c-1.6797 2.8008-3.3594 5.6016-4.4805 8.9609z" />
                                <path
                                    d="m479.92 374.64c1.6797 2.8008 3.9219 6.1602 5.6016 8.9609l6.1602-4.4805c-1.6797-2.8008-3.9219-5.6016-5.6016-8.3984z" />
                                <path
                                    d="m468.16 314.72-7.2812 0.55859c0.55859 3.3594 0.55859 6.7188 1.6797 10.641l7.2812-1.1211c-1.1211-3.3555-1.6797-6.7188-1.6797-10.078z" />
                                <path
                                    d="m471.52 334.32-7.2812 1.6797c1.1211 3.3594 1.6797 6.7188 2.8008 10.078l7.2812-2.2383c-1.1211-2.8008-2.2422-6.1602-2.8008-9.5195z" />
                                <path
                                    d="m477.68 353.36-6.7188 2.8008c1.1211 3.3594 2.8008 6.1602 4.4805 9.5195l6.7188-3.3594c-2.2383-2.8008-3.3594-6.1602-4.4805-8.9609z" />
                                <path
                                    d="m523.04 140 3.9219 6.1602c2.8008-1.6797 5.6016-3.3594 8.3984-5.0391l-3.3594-6.7227c-2.8008 1.6797-5.6016 3.3633-8.9609 5.6016z" />
                                <path
                                    d="m491.68 392c2.2383 2.8008 4.4805 5.6016 6.7188 7.8398l5.6016-5.0391c-2.2383-2.2383-4.4805-5.0391-6.7188-7.2812z" />
                                <path
                                    d="m469.28 234.64-7.2812-1.1211c-0.55859 3.3594-1.1211 6.7188-1.6797 10.078l7.2812 0.55859c0.55859-2.7969 1.1172-6.1562 1.6797-9.5156z" />
                                <path
                                    d="m535.36 418.88c-2.8008-1.6797-5.6016-3.3594-8.3984-5.0391l-3.9219 6.1602c2.8008 1.6797 5.6016 3.9219 8.9609 5.6016z" />
                                <path
                                    d="m474.32 215.6-7.2812-2.2383c-1.1211 3.3594-2.2383 6.7188-2.8008 10.078l7.2812 1.6797c0.55859-3.3594 1.6797-6.7227 2.8008-9.5195z" />
                                <path
                                    d="m467.04 301.84v-6.7188h-7.8398v6.7188 3.3594h7.2812c0.55859-1.1211 0.55859-2.2383 0.55859-3.3594z" />
                                <path d="m459.76 274.4h7.8398v10.078h-7.8398z" />
                                <path d="m467.04 258.16v-3.9219h-7.2812v4.4805 6.1602h7.8398l0.003906-6.7188z" />
                                <path
                                    d="m506.8 152.88 5.0391 5.6016c2.2383-2.2383 5.0391-4.4805 7.8398-6.1602l-4.4805-6.1602c-3.3594 1.6797-5.5977 3.918-8.3984 6.7188z" />
                                <path
                                    d="m519.12 407.68c-2.8008-2.2383-5.0391-3.9219-7.8398-6.1602l-5.0391 5.6016c2.8008 2.2383 5.0391 4.4805 7.8398 6.7188z" />
                                <path
                                    d="m492.24 167.44 5.6016 5.0391c2.2383-2.8008 4.4805-5.0391 6.7188-7.2812l-5.6016-5.0391c-2.2383 2.2383-4.4766 5.0391-6.7188 7.2812z" />
                                <path
                                    d="m492.24 180.32-6.1602-4.4805c-2.2383 2.8008-3.9219 5.6016-5.6016 8.9609l6.7188 3.9219c1.125-2.8008 2.8047-5.6016 5.043-8.4023z" />
                                <path
                                    d="m481.6 197.12-6.7188-3.3594c-1.6797 3.3594-2.8008 6.1602-4.4805 9.5195l6.7188 2.8008c1.6797-2.8008 3.3594-5.6016 4.4805-8.9609z" />
                            </g>
                        </svg>


                        <svg v-if="last_tab.includes('club')" class="h-7 w-7 mx-auto" width="700pt" height="700pt"
                            version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="m225.49 35.98c-4.4844 0.023437-8.2266 3.4336-8.6641 7.8945-4.0508 40.312-37.824 70.922-78.34 70.922-8.3906-0.027344-16.723-1.4375-24.68-4.0859v0.003906c-2.6484-0.87891-5.5586-0.4375-7.832 1.1836-2.2734 1.6172-3.6367 4.2266-3.668 7.0195-0.49609 49.645 1.543 103.66 18.406 163.55 10.145 36.027 27.598 69.879 50.348 101.34-5.5781 0.81641-10.652 1.4414-16.422 2.3242l-0.003906-0.003907c-2.543 0.39063-4.7852 1.8789-6.1328 4.0742-1.3477 2.1914-1.6602 4.8633-0.85547 7.3086l5.4023 16.184-62.035 16.355h-0.003906c-3.6211 0.98047-6.2148 4.1562-6.4531 7.8984-0.23438 3.7422 1.9414 7.2227 5.4102 8.6445l29.719 12.082-19.895 25.191h0.003906c-2.3086 2.9492-2.4883 7.0352-0.44531 10.172 2.0469 3.1367 5.8555 4.625 9.4844 3.707l93.07-24.539v-0.003907c4.6758-1.2148 7.4844-5.9883 6.2734-10.664l-2.9414-11.109c7.5938-1.1055 15.883-2.3711 22.953-3.332 34.004 31.988 73.324 60.711 115.82 85.5v0.003907c2.7344 1.6016 6.1211 1.6016 8.8555 0 42.48-24.781 81.488-53.543 115-85.602 6.9336 0.9375 14.98 2.1523 22.422 3.2305l-3.0078 11.312c-1.2109 4.6758 1.5977 9.4492 6.2734 10.664l93.07 24.539c3.6406 0.96094 7.4844-0.51172 9.5508-3.6602 2.0664-3.1445 1.8867-7.2617-0.44141-10.215l-19.961-25.191 29.719-12.082c3.4688-1.4258 5.6445-4.9023 5.4102-8.6484-0.23828-3.7422-2.832-6.918-6.4531-7.8945l-60.668-16.012 5.5195-16.527c0.80469-2.4453 0.48828-5.1211-0.85547-7.3125-1.3477-2.1914-3.5898-3.6836-6.1328-4.0703-6.457-1-12.133-1.6992-18.355-2.6172 22.273-31.605 39.227-65.625 48.98-101.75 16.422-60.844 20.008-111.7 20.609-162.27v0.003906c0.042969-2.8203-1.2773-5.4883-3.5469-7.1641-2.2656-1.6797-5.2031-2.1602-7.8867-1.2969-7.6328 2.4414-15.641 3.7227-23.652 3.7617-40.484-0.027343-74.223-30.641-78.27-70.922l-0.003906-0.003906c-0.47266-4.4609-4.2422-7.8398-8.7305-7.8242zm4.7148 17.516h236.52c8.8398 44.496 45.523 78.766 91.723 78.801 5.5039-0.015625 10.816-1.625 16.219-2.5781-0.94531 46.516-3.7656 92.273-18.664 147.45-9.8906 36.637-27.812 71.262-51.746 103.55-58.793-8.0625-108.27-12.23-156.89-12.152-48.934 0.066406-98.199 4.4414-156.51 12.441-24.504-32.219-42.992-66.762-53.285-103.32-15.172-53.883-16.699-102.07-16.594-148.29 5.8047 1.0977 11.508 2.8867 17.43 2.9062h0.070312c46.199-0.003906 82.84-34.32 91.723-78.801zm117.68 31.77c-71.754 0-130.16 58.336-130.16 130.09 0 71.754 58.402 130.16 130.16 130.16 71.754 0 130.09-58.402 130.09-130.16 0-71.754-58.336-130.09-130.09-130.09zm0 17.516c8.9844 0 17.676 1.1523 26.043 3.1289l-18.988 4.8711-17.02-7.5195c3.2852-0.29688 6.6016-0.48047 9.9648-0.48047zm-38.656 6.9219 35.375 15.656-4.7695 39.527-40.914 29.41-0.99219-0.42578-29.754-12.816 0.59766-45.887c11.367-11.199 25.148-19.883 40.453-25.465zm93.02 7.0234c14.078 7.7617 26.223 18.508 35.785 31.309l-5.6562 36.539-35.051 10.594-39.938-29.41 0.32422-2.6836 4.5469-36.059zm-151.25 41.305-0.35938 25.754-14.457 17.621c1.9375-15.707 7.1094-30.371 14.816-43.375zm200.96 14.34c3.8789 9.4102 6.5039 19.477 7.707 29.977l-10.305-13.363zm-104.01 8.2891 37.445 27.48-12.512 37.801-2.0508 6.2031-46.449-0.26562-14.098-44.23zm-85.945 16.832 23.449 10.066 7.4492 3.2109 15.484 48.535-16.867 26.062-37.992-8.5117c-9.1836-14.078-15.285-30.336-17.398-47.852zm174.9 4 22.422 29.105c-2.3125 17.133-8.3906 33.051-17.484 46.828l-33.668 6.2539-21.191-24.676 7.7422-23.43 7.8438-23.637zm-114.21 67.965 50.414 0.26562 3.1953 3.707 17.945 21.02-16.508 29.43c-9.5156 2.6055-19.5 4.1172-29.855 4.1172-8.0195 0-15.836-0.875-23.379-2.4609l-18.527-30.25 7.5898-11.758zm100.9 29.156c-5.9883 5.4531-12.535 10.285-19.602 14.355l6.6836-11.93zm-150.95 0.46094 17.586 3.9297 8.2383 13.484c-9.4297-4.6094-18.102-10.473-25.824-17.414zm74.801 86.867c54.633-0.097656 111.36 5.9297 181.68 16.473l-11.742 35.461c-141.33-21.414-196.22-21.48-337.82 0l-11.824-35.461c69.031-10.238 125.1-16.387 179.7-16.473zm-188.84 44.398 6.5625 19.672v0.003906c1.3477 4.0391 5.4102 6.5195 9.6211 5.8789 4.7227-0.72656 8.5-1.2344 13.023-1.9141l1.1797 4.4961-59.164 15.637 10.852-13.688v-0.003906c1.7188-2.168 2.3125-5.0156 1.6016-7.6914-0.71094-2.6719-2.6406-4.8516-5.207-5.875l-16.152-6.582zm379.63 0.33203 36.367 9.6055-16.219 6.5781v0.003906c-2.5664 1.0234-4.5 3.207-5.2109 5.8789-0.70703 2.6719-0.11328 5.5234 1.6055 7.6914l10.852 13.688-59.164-15.637 1.2461-4.6836c4.9688 0.74609 9.1602 1.3008 14.371 2.1016h0.003907c4.2344 0.67969 8.3359-1.8086 9.6914-5.8789zm-189.7 7.7578c29.926 0.003906 60.613 2.4531 96.609 6.8008-28.73 25.777-61.633 49.094-96.746 69.965-35.152-20.883-68.281-44.156-97.395-69.879 36.426-4.418 67.371-6.8945 97.531-6.8867z" />
                        </svg>

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
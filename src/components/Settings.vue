<template>
    <div class="w-full pb-5">
        <div class="flex justify-between items-center pt-3 mb-3 mx-10">
            <button class="text-base-200 h-6 w-6 opacity-[0%]" disabled>
                <XIcon />
            </button>
            <div class="text-center">
                <h1 class="text-3xl text-base-200-content font-bold">{{ title }}</h1>
                <p class="text-sm text-base-200-content uppercase">
                    {{ subtitle }}
                </p>
            </div>
            <button @click="closeSettings" class="hover:text-accent h-6 w-6"
                aria-label="settings">
                <XIcon />
            </button>
        </div>
        <div class="w-5/6 grid gap-4 p-4 justify-center mx-auto card bg-base-100 shadow-xl">

            <span class="text-center text-xl">Über</span>
            <div id="links" class="flex justify-evenly">
                <a href="https://github.com/faupau03/h4y" class="hover:text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                        class="bi bi-github" viewBox="0 0 16 16">
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                </a>
                <a href="https://linkedin.com/in/faupau" class="hover:text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                        class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path
                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                </a>

            </div>

            

            <div id="dependencies">
                <span class="font-bold">Bibliotheken</span>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-0.5">
                    <div v-for="dep in dependencies" class="grid gap-2 grid-cols-8 items-center">
                        <div class="col-span-3 text-xs sm:text-md">{{ dep.name }}</div>
                        <a :href="'https://github.com/' + dep.github_user + '/' + dep.github_repo"
                            class="hover:text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-github" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>

                        <img class="col-span-2"
                            :src="'https://img.shields.io/github/license/' + dep.github_user + '/' + dep.github_repo + '?\style=flat'"
                            alt="Licence Batch">
                        <img class="col-span-2"
                            :src="'https://img.shields.io/github/stars/' + dep.github_user + '/' + dep.github_repo"
                            alt="Github Stars">
                    </div>
                </div>

            </div>

            <div id="developer-options">
                <span class="font-bold">Entwickleroptionen</span>
                <div class="mt-1 flex gap-1 flex-wrap">
                    <button @click="clearCache" class="btn btn-neutral items-center flex">
                        <TrashIcon class="h-6" />Cache leeren
                    </button>
                    <button @click="clearStorage" class="btn items-center flex">
                        <TrashIcon class="h-6" />Speicher leeren
                    </button>
                    <div id="last-page" class="items-center flex gap-2">
                        <span>
                            Letze Seite
                        </span>

                        <input class="toggle toggle-md !focus:!outline-0 checked:bg-none" type="checkbox"
                            v-model="show_last_page">
                    </div>
                    <div id="dark-mode">
                        <ThemeSwitcher class="btn px-0" />
                    </div>

                </div>
            </div>

            <div id="license">
                <span class="font-bold">Lizenz</span>
                <p class="max-h-64 text-xs overflow-auto">
                    MIT License
                    <br />
                    <br />
                    Copyright (c) 2022 Paul Paffe
                    <br />
                    <br />
                    Permission is hereby granted, free of charge, to any person obtaining a copy
                    of this software and associated documentation files (the "Software"), to deal
                    in the Software without restriction, including without limitation the rights
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                    <br />
                    <br />
                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.
                    <br />
                    <br />
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                    SOFTWARE.
                </p>
            </div>
        </div>
        <!-- <div v-else
                class="overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2">
                <div v-for="i in 10" class="p-3 bg-gray-300 rounded-lg my-1 flex">
                    <div class="animate-pulse rounded-lg bg-gray-400 h-3 sm:w-44 w-16">
                    </div>
                    <div class="animate pulse rounded-full bg-gray-400 h-3 sm:w-44 w-3 ml-auto mr-2">
                    </div>
                </div>

            </div> -->

    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { watch } from "vue";

import { themeChange } from 'theme-change';

import { XIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";

import { TrashIcon } from "@heroicons/vue/outline";

import { Switch } from '@headlessui/vue'
import ThemeSwitcher from './helpers/ThemeSwitcher.vue'


const offline = ref(false);
const dependencies = ref([]);
const show_last_page = ref(true);
const darkmode = ref(false);

const title = "Einstellungen";
const subtitle = "Infos";

const router = useRouter();


const fetchDeps = async () => {
    fetch("dependencies.json")
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("dependencies", JSON.stringify(res));
        })
        .then(() => {
            console.log("Dependencies fetched");
        })
        .then(() => {
            dependencies.value = JSON.parse(localStorage.getItem("dependencies"));
        })
}

const loadDeps = () => {
    dependencies.value = JSON.parse(localStorage.getItem("dependencies"));
    if (offline.value) {
        return;
    }
    fetchDeps();
}

const clearCache = () => {
    //clear cache (saved games of clubs)
    const club_addresses = localStorage.getItem("club_addresses");
    const favorites = localStorage.getItem("favorites");
    const selectedFavorite = localStorage.getItem("selectedFavorite");
    localStorage.clear();
    localStorage.setItem("club_addresses", club_addresses);
    localStorage.setItem("favorites", favorites);
    localStorage.setItem("selectedFavorite", selectedFavorite);
}

const clearStorage = () => {
    //clear cache (saved games of clubs)
    localStorage.clear();
}

watch(show_last_page, async (newValue, oldValue) => {
    console.log("changed show_last_page");

    if (newValue) {
        console.log("show_last_page is true");
        localStorage.setItem("show_last_page", "true");
    }
    else {
        console.log("show_last_page is false");
        localStorage.setItem("show_last_page", "false");
    }
    window.dispatchEvent(new Event("storage"));
});

const setShowLastPage = () => {
    show_last_page.value = localStorage.getItem("show_last_page") === "true";
}


const closeSettings = () => {
    //Simply go a step back in the history
    router.back();
}


const checkOffline = () => {
    if (navigator.onLine) {
        offline.value = false;
    }
    else {
        offline.value = true;
    }
}

window.addEventListener("online", checkOffline);

onMounted(() => {
    themeChange(false);
    loadDeps();
    setShowLastPage();
});

</script>


<style scoped>
[type='checkbox']:focus {
    outline: 0 !important;
    outline-offset: 0 !important;
    --tw-ring-inset: var(--tw-empty,
            /*!*/
            /*!*/
        ) !important;
}
[type='checkbox'] {
    color: var(--bg-b) !important;
    height: 1.5rem !important;
    width: 3rem !important;
    transition-duration: 300ms !important;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
}

</style>
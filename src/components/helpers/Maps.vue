<template>
<div class="flex items-center">
    <div @click="gym()" class="flex w-fit hover:cursor-pointer hover:text-indigo-500 border-r-[0.5px] mr-2 border-r-gray-600 text-ellipsis break-words">
        <LocationMarkerIcon class="h-6 w-6" />
        <div class="sm:flex">
            <div class="w-fit mr-1">
            {{ name }}
        </div>
        <div class="hidden xs:block w-fit ml-1 mr-2">
            {{ town }}
        </div>
        </div>
        
        
    </div>
    <button @click="maps()" class="rounded flex w-fit p-1  sm:text-base text-xs underline-none text-white items-center hover:bg-indigo-300 hover:text-indigo-900 bg-indigo-500">
            Öffnen in
            <img class="h-6 ml-1" src="/icons/maps.png" alt="">
    </button>
</div>
</template>

<script setup>
import { LocationMarkerIcon } from "@heroicons/vue/outline";

const navigator = window.navigator;
const props = defineProps(["location", "name", "town", "id"]);

const maps = () => {
    console.log(props.location);
    if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPad") != -1 ||
        navigator.platform.indexOf("iPod") != -1 ||
        (navigator.userAgentData &&
            (navigator.userAgentData.platform.indexOf("iOS") != -1 ||
                navigator.userAgentData.platform.indexOf("iPadOS") != -1))
    ) {
        console.log("iOS");
        window.open(
            "maps://www.google.com/maps/search/?api=1&query=" + props.location
        );
    } else {
        window.open(
            "https://www.google.com/maps/search/?api=1&query=" + props.location
        );
        console.log("Not iOS");
    }
};

const gym = () => {
    // redirecting to gym
    console.log("gym");
    console.log(props.id);
}
</script>

<template>
<div class="flex items-center">
    <div @click="gym()" class="flex flex-wrap items-center gap-1 text-sm w-fit hover:cursor-pointer hover:text-accent border-r-[0.5px] mr-2 border-r-gray-600 text-ellipsis break-words">
        <LocationMarkerIcon class="h-6 w-6" />
        <div class="sm:flex">
            <div class="xs:w-fit w-min mr-1">
            {{ name }}
        </div>
        <div class="hidden xs:block w-fit ml-1 mr-2">
            {{ town }}
        </div>
        </div>
        
        
    </div>
    <button @click="maps()" class="btn btn-sm btn-primary xs:flex grid w-fit p-1  text-xs underline-none items-center">
            Öffnen in
            <img class="h-6 ml-1" src="/icons/maps.png" alt="">
    </button>
</div>
</template>

<script setup>
import { LocationMarkerIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";

const navigator = window.navigator;
const props = defineProps(["location", "name", "town", "id"]);

const router = useRouter();

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
    router.push("/gym#" + props.id);
}
</script>

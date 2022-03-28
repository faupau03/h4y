<template>
    <LocationMarkerIcon @click="maps()" class="h-6 w-6 hover:text-indigo-500" />
</template>

<script setup>
import { LocationMarkerIcon } from "@heroicons/vue/outline";

const navigator = window.navigator;
const props = defineProps(["location"]);

const maps = () => {
    console.log(props.location);
    if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPad") != -1 ||
        navigator.platform.indexOf("iPod") != -1 ||
        (navigator.userAgentData && (
            navigator.userAgentData.platform.indexOf("iOS") != -1 ||
            navigator.userAgentData.platform.indexOf("iPadOS") != -1
        ))
    ) {
        console.log("iOS");
        window.open(
            "maps://www.google.com/maps/search/?api=1&query=" + props.location
        );
    }
    else {
        window.open(
            "https://www.google.com/maps/search/?api=1&query=" + props.location
        );
        console.log("Not iOS");
    }
};
</script>

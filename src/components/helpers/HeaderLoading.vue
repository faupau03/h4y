<template>
    <div
        id="header"
        class="w-full flex p-5 sm:gap-5 xs:gap-3 gap-1 justify-end animate-pulse"
    >
        <div id="clock" class="flex mr-auto">
            <div class="h-6 w-6 bg-gray-300 rounded-full">

            </div>
            <span class="sm:text-xl sm:mt-0.5 mt-1 ml-2 w-20 h-4 bg-gray-300 rounded">
            </span>
        </div>
        <div class="h-6 w-6 bg-gray-300 rounded-full">

        </div>
        <div class="h-6 w-6 bg-gray-300 rounded-full">

        </div>
        <div class="h-6 w-6 bg-gray-300 rounded-full">

        </div>
    </div>
</template>

<script setup>

import {
    ShareIcon,
    ClockIcon,
    StarIcon as StarIconOutline,
} from "@heroicons/vue/outline";
import { DocumentIcon, AnnotationIcon, StarIcon } from "@heroicons/vue/solid";
</script>
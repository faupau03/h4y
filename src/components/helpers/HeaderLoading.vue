<template>
    <div id="header" class="w-full flex p-5 sm:gap-5 xs:gap-3 gap-1 justify-end">
        <div id="clock" class="flex mr-auto animate-pulse">
            <div class="h-6 w-6 bg-gray-300 rounded-full">

            </div>
            <span class="sm:text-xl sm:mt-0.5 mt-1 ml-2 w-20 h-4 bg-gray-300 rounded">
            </span>
        </div>

        <Popover v-if="net_error" class="relative">
            <PopoverButton class="flex items-center btn-error btn-sm btn-outline -mt-1 btn-circle">
                <ExclamationCircleIcon class="h-8 text-red-600" />
            </PopoverButton>

            <PopoverPanel
                class="right-0 absolute z-10 bg-base-100 outline-1 w-20 outline outline-indigo-200 rounded-lg p-2 shadow-2xl border-indigo-300 border-1">
                <p class="text-xs">
                    Du hast die maximale Anzahl an Anfragen erreicht. Bitte versuche es später noch einmal.
                </p>
            </PopoverPanel>
        </Popover>

        <div class="h-6 w-6 bg-gray-300 rounded-full animate-pulse">

        </div>
        <div class="h-6 w-6 bg-gray-300 rounded-full animate-pulse">

        </div>
        <div class="h-6 w-6 bg-gray-300 rounded-full animate-pulse">

        </div>
    </div>
</template>

<script setup>

import {
    ShareIcon,
    ClockIcon,
    StarIcon as StarIconOutline,
    ExclamationCircleIcon,
} from "@heroicons/vue/24/outline";
import { DocumentIcon, ChatBubbleBottomCenterTextIcon, StarIcon } from "@heroicons/vue/24/solid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const props = defineProps([
    "net_error",
]);
</script>
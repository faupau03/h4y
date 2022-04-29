<template>
    <div v-if="!loading" class="flex shadow-large rounded-lg bg-indigo-100 items-center">
        <button @click="$emit('goPeriodBack')" :disabled="Object.keys(periods).indexOf(String(period)) == 0"
            class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronLeftIcon class="h-5" />
        </button>
        <div>
            {{ periods[period] }}
        </div>
        <button @click="$emit('goPeriodForward')"
            :disabled="Object.keys(periods).indexOf(String(period)) == Object.keys(periods).length - 1"
            class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-400">
            <ChevronRightIcon class="h-5" />
        </button>
    </div>
    <div v-else
        class="flex shadow-large rounded-lg bg-indigo-100 items-center bg-gray-300 text-gray-400">
        <button disabled class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronLeftIcon class="h-5" />
        </button>
        <div class="sm:w-12 w-10 h-8 bg-gray-300">
        </div>
        <button disabled class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronRightIcon class="h-5" />
        </button>
    </div>
</template>

<script setup>
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/vue/solid";
const props = defineProps(["loading", "periods", "period"]);
</script>
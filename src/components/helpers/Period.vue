<template>
    <div v-if="!loading" class="flex shadow-large rounded-lg bg-indigo-100 items-center">
        <button @click="goPeriodBack" :disabled="Object.keys(list).indexOf(String(selected)) == 0"
            class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronLeftIcon class="h-5" />
        </button>
        <select :value="selected" @change="(event) => $emit('updatePeriod', event.target.value)" class="m-0 text-xs sm:text-base py-2 border-none bg-indigo-100 rounded-lg hover:bg-indigo-200 !ring-0">
            <option v-for="period, key in list" :value="key" class="bg-indigo-100 p-0 m-0">{{ period }}</option>
        </select>
        <button @click="goPeriodForward"
            :disabled="Object.keys(list).indexOf(String(selected)) == Object.keys(list).length - 1"
            class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-400">
            <ChevronRightIcon class="h-5" />
        </button>
    </div>
    <div v-else
        class="flex shadow-large rounded-lg bg-indigo-100 items-center bg-gray-300 text-gray-400 animate-pulse">
        <button disabled class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronLeftIcon class="h-5" />
        </button>
        <div class="sm:w-28 w-24 h-8 bg-gray-300">
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
const props = defineProps(["loading", "list", "selected"]);
const emit = defineEmits(["updatePeriod"]);

const goPeriodBack = () => {
    let selected = props.selected;
    const list = props.list;
    const index = Object.keys(list).indexOf(String(selected));
    if (index > 0) {
        selected = Object.keys(list)[index - 1];
        console.log("selected", selected);
        emit("updatePeriod", selected);
    }
};

const goPeriodForward = () => {
    let selected = props.selected;
    const list = props.list;
    const index = Object.keys(list).indexOf(String(selected));
    if (index < Object.keys(list).length - 1) {
        selected = Object.keys(list)[index + 1];
        console.log("selected", selected);
        emit("updatePeriod", selected);
    }
};

</script>
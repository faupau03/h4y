<template>
    <div v-if="!loading && list && Object.keys(list).length > 1"
        class="btn-group flex flex-nowrap shadow-large rounded-lg items-center">
        <button @click="goPeriodBack" :disabled="Object.keys(list).indexOf(String(selected)) == 0"
            class="btn btn-sm rounded-r-none w-8 border-solid border-1 border-base">
            <ChevronLeftIcon class="h-5 flex-none" />
        </button>
        <select :value="selected" @change="(event) => $emit('updatePeriod', event.target.value)"
            class="select h-8 min-h-[2rem] border-1 border border-neutral dark:hover:brightness-150 hover:brightness-50 rounded-none py-0 outline-none ring-none outline-0 focus:border-neutral focus:ring-none focus:ring-0 focus:outline-0">
            <option v-for="period, key in list" :value="key" class="">{{ period }}</option>
        </select>
        <button @click="goPeriodForward"
            :disabled="Object.keys(list).indexOf(String(selected)) == Object.keys(list).length - 1"
            class="btn rounded-l-none btn-sm w-8 border-solid border-1 border-base">
            <ChevronRightIcon class="h-5 flex-none" />
        </button>
    </div>
    <div v-else class="flex flex-nowrap shadow-large rounded-lg items-center" :class="loading ? 'animate-pulse' : ''">
        <button disabled class="btn btn-sm rounded-r-none w-8">
            <ChevronLeftIcon class="h-5 flex-none" />
        </button>
        <div class="sm:w-28 w-24 h-8 bg-neutral/20">
        </div>
        <button disabled class="btn btn-sm rounded-l-none w-8">
            <ChevronRightIcon class="h-5 flex-none" />
        </button>
    </div>
</template>

<script setup>
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/vue/24/solid";
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
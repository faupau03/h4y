<template>
    <div v-if=!loading class="btn-group flex flex-nowrap shadow-large rounded-lg items-center" :class="!selected ? 'bg-gray-300' : ''">
        <button @click="goDateBack" class="btn btn-sm rounded-r-none w-8" :disabled="Object.keys(list).indexOf(String(selected)) <= 0">
            <ChevronLeftIcon class="h-5 flex-none" />
        </button>
        <select :value="selected" @change="(event) => $emit('updateWeek', event.target.value)" :disabled="Object.keys(list).length < 1" class=" select h-8 min-h-[2rem] border-1 border border-neutral dark:hover:brightness-150 hover:brightness-50 rounded-none py-0 outline-none ring-none outline-0 focus:border-neutral focus:ring-none focus:ring-0 focus:outline-0">
            <option v-for="date, key in list" :value="key" class="">{{ date }}</option>
        </select>

        <button @click="goDateForward" class="btn btn-sm rounded-l-none w-8" :disabled="Object.keys(list).indexOf(String(selected)) == Object.keys(list).length - 1">
            <ChevronRightIcon class="h-5 flex-none" />
        </button>
    </div>
    <div v-else
        class="flex shadow-large rounded-lg bg-indigo-100 items-center bg-gray-300 text-gray-400 animate-pulse">
        <button disabled class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronLeftIcon class="h-5" />
        </button>
        <div class="h-9 sm:w-32 w-28 bg-gray-300">
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
const props = defineProps(["selected", "list","loading"]);
const emit = defineEmits(["updateWeek"]);


const goDateBack = () => {
    let selected = props.selected;
    const list = props.list;
    const index = Object.keys(list).indexOf(String(selected));
    if (index > 0) {
        selected = Object.keys(list)[index - 1];
        emit("updateWeek", selected);
    }
};

const goDateForward = () => {
    let selected = props.selected;
    const list = props.list;
    const index = Object.keys(list).indexOf(String(selected));
    if (index < Object.keys(list).length - 1) {
        selected = Object.keys(list)[index + 1];
        emit("updateWeek", selected);
    }
};

</script>
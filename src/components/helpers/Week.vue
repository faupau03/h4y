<template>
    <div v-if=!loading class="flex shadow-large !text-xs rounded-lg bg-indigo-100 items-center" :class="!selected ? 'bg-gray-300' : ''">
        <button @click="goDateBack" class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400" :disabled="Object.keys(list).indexOf(String(selected)) <= 0">
            <ChevronLeftIcon class="h-5" />
        </button>
        <select v-model="selected" @change="$emit('updateWeek', selected)" class="m-0 text-xs sm:text-base py-2 border-none bg-indigo-100 rounded-lg hover:bg-indigo-200 !ring-0">
            <option v-for="date, key in list" :value="key" class="bg-indigo-100 p-0 m-0">{{ date }}</option>
        </select>

        <button @click="goDateForward" class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400" :disabled="Object.keys(list).indexOf(String(selected)) == Object.keys(list).length - 1">
            <ChevronRightIcon class="h-5" />
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
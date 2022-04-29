<template>
    <div v-if=!loading class="flex shadow-large rounded-lg bg-indigo-100 items-center" :class="!selected ? 'bg-gray-300' : ''">
        <button @click="$emit('goDateBack')" class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400" :disabled="Object.keys(date_list).indexOf(String(selected)) <= 0">
            <ChevronLeftIcon class="h-5" />
        </button>
        <div v-if="selected">
            {{ date_list[selected] }}
        </div>
        <div v-else class="w-12">
        </div>

        <button @click="$emit('goDateForward')" class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400" :disabled="Object.keys(date_list).indexOf(String(selected)) == Object.keys(date_list).length - 1">
            <ChevronRightIcon class="h-5" />
        </button>
    </div>
    <div v-else
        class="flex shadow-large rounded-lg bg-indigo-100 items-center bg-gray-300 text-gray-400">
        <button disabled class="p-2 rounded-lg hover:bg-indigo-200 disabled:bg-gray-300 disabled:text-gray-400">
            <ChevronLeftIcon class="h-5" />
        </button>
        <div class="h-9 sm:w-24 w-14 bg-gray-300">
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
const props = defineProps(["selected", "date_list","loading"]);

</script>
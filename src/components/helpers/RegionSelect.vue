<template>
    <div>
        <select v-if="!loading" :disabled="!list" @change="$emit('updateRegion', selected)" class="bg-indigo-100 disabled:bg-gray-300 rounded-lg border-none hover:bg-indigo-200 !ring-0 text-xs sm:text-base appearance-none" name="" id="" v-model="selected">
            <option v-for="region, key  in list" :value="key" class="bg-indigo-100 selected:bg-indigo-200">{{ region }}</option>
        </select>
        <div v-else class="rounded-lg sm:w-64 w-56 h-9 bg-gray-300 animate-pulse">

        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["selected","list","loading"]);
</script>
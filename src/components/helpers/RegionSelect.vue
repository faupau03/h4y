<template>
    <div>
        <select v-if="!loading" :disabled="!list" :value="selected"
            @change="(event) => $emit('updateRegion', event.target.value)"
            class="ring-0 focus:outline-0 focus:border-black select select-bordered select-sm">
            <option v-for="region, key  in list" :value="key" class="">{{ region }}</option>
        </select>
        <div v-else
            class="select select-bordered select-sm disabled bg-neutral/20 text-neutral/20 border-none animate-pulse -mb-1.5 w-64">

        </div>
    </div>
</template>

<script setup>
const props = defineProps(["selected", "list", "loading"]);
</script>
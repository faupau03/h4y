<template>
    <div>
        <select v-if="!loading" :disabled="!list" :value="selected" @change="(event) => $emit('updateRegion', event.target.value)" class="select h-8 min-h-[2rem] border-1 border border-neutral dark:hover:brightness-150 hover:brightness-50 rounded-none py-0 outline-none ring-none outline-0 focus:border-neutral focus:ring-none focus:ring-0 focus:outline-0 bg-neutral text-neutral-content !rounded-lg">
            <option v-for="region, key  in list" :value="key" class="">{{ region }}</option>
        </select>
        <div v-else class="rounded-lg sm:w-64 w-56 h-9 bg-gray-300 animate-pulse">

        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["selected","list","loading"]);
</script>
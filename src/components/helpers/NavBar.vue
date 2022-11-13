<template>
    <div class="bg-base-100/30 flex justify-between items-center my-2 p-2 rounded-lg sm:mx-10 mx-4">
        <button @click="navBack" class="btn btn-sm sm:btn-md btn-ghost" aria-label="go page back">
            <ChevronLeftIcon class="flex-none sm:h-10 h-8" />
        </button>
        <div class="text-center">
            <h1 class="text-3xl text-base-200-content font-bold">{{ title }}</h1>
            <p class="text-sm text-base-200-content uppercase">
                {{ subtitle }}
            </p>
        </div>
        <router-link class="btn btn-sm sm:btn-md btn-ghost disabled:text-gray-500" aria-label="settings" to="settings">
            <CogIcon class="flex-none h-6" />
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import { CogIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(["title", "subtitle"]);

const navBack = () => {
    router.back();
};

</script>
<template>
    <div class="flex justify-between items-center pt-3 mb-3 mx-10">
        <button @click="navBack" class="hover:text-accent h-10 w-10" aria-label="go page back">
            <ChevronLeftIcon/>
        </button>
        <div class="text-center">
            <h1 class="text-3xl font-bold">{{ title }}</h1>
            <p class="text-sm text-gray-500 uppercase font-bold">
                {{ subtitle }}
            </p>
        </div>
        <router-link class="hover:text-accent disabled:text-gray-500 h-6 w-6" aria-label="settings" to="settings">
            <CogIcon/>
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import { ChevronLeftIcon } from '@heroicons/vue/solid';
    import { CogIcon } from '@heroicons/vue/outline';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const props = defineProps(["title", "subtitle"]);

    const navBack = () => {
        router.back();
    };

</script>
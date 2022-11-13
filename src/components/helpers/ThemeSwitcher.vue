<template>

    <div class="flex items-stretch">
        <div class="dropdown dropdown-end">
            <div tabindex="0" class="btn">Change Theme
                <ChevronDownIcon class="h-8 ml-2" />
            </div>
            <ul tabindex="0"
                class="h-60 gap-2 overflow-scroll p-2 shadow menu dropdown-content bg-base-200 rounded-box w-52"
                data-choose-theme="">
                <li @click="updateTheme(theme)" v-for="theme in themes"><a :data-set-theme="theme" :data-theme="theme"
                        class="text-base-content"
                        :class="actualTheme == theme ? 'outline outline-2 outline-base-content' : ''">
                        <div class="bg-primary w-2 h-5 rounded"></div>
                        <div class="bg-secondary w-2 h-5 rounded"></div>
                        <div class="bg-accent w-2 h-5 rounded"></div>
                        <div class="bg-neutral w-2 h-5 rounded"></div>
                        {{ theme }}
                    </a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { hslToHex } from '../functions/misc.js';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];
const actualTheme = ref("light");

onMounted(() => {
    actualTheme.value = localStorage.getItem("theme") || "light";
    updateTheme(actualTheme.value);
});

const updateTheme = (theme) => {
    actualTheme.value = theme;
    console.log(theme);
    let color = getComputedStyle(document.documentElement).getPropertyValue('--b2');
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "hsl(" + color + ")");
    console.log(color);
};


</script>
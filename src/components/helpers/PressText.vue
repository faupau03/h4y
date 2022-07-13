<template>
    <!-- Press text div -->
    <div v-if="showText && pressText.robotext"
        class="pressText fixed left-0 bottom-0 right-0 top-0 w-screen bg-base-content bg-opacity-30 z-30 flex justify-center items-center">
        <div class="z-30 max-h-screen overflow-auto flex justify-center">
            <div class="grid overflow-auto my-10 lg:max-w-[50%] rounded-lg shadow-2xl bg-base-100 justify-right z-30 p-3 sm:mx-20 mx-5">
                <button class="btn btn-ghost ml-auto">
                    <XIcon @click="showText = false" class="h-6" />
                </button>
                <span v-html="pressText.robotext.text"> </span>
                <span v-html="pressText.robotext.footer"> </span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { XIcon } from "@heroicons/vue/outline";
import { ref, watch } from "vue";

const props = defineProps(["getText", "game_id"]);

const showText = ref(false);
const pressText = ref({});

const showPressText = async () => {
    const response = await fetch(
        "https://spo.handball4all.de/service/robotext/if_robotext.php?cmd=text&game=" +
        props.game_id
    );
    const data = await response.json();

    if (data) {
        pressText.value = data;
        showText.value = true;
    }
};

//watch get text prop
watch(
    () => props.getText,
    (newVal, oldVal) => {
        if (newVal != null) {
            showPressText();
        }
    },
    { immediate: true }
);
</script>

<style>
.pressText h1 {
    font-size: 1.5rem !important;
    margin: 0.5em 0;
}

.pressText h3 {
    font-size: 1rem !important;
    font-weight: 700;
    margin: 0.5em 0;
}

.pressText p:first-of-type {
    background-color: hsl(var(--s));
    color: hsl(var(--sc));
    padding: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 0.5em;
}
</style>

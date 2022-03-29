<template>
    <div v-if="side == 'left' && !guest">
        <div class="flex mr-1 ml-auto sm:mr-10 w-fit">
            {{ info }}
            <img class="h-5 w-5 ml-1 sm:mt-1 -mt-0.5" :src="src" alt="">
        </div>
    </div>
    <div v-else-if="side == 'right' && guest">
        <div class="flex ml-1 mr-auto sm:ml-10 w-fit">
            <img class="h-5 w-5 mr-1 sm:mt-1 -mt-0.5" :src="src" alt="">
            {{ info }}
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { ref, toRef, watch } from 'vue';
const props = defineProps(["message", "side"]);
const info = ref(null);
const src = ref(null);
const guest = ref(false);

const init = () => {
    const message = props.message;
    // 1. Halbzeit
    if (message == "Spielstand 1. Halbzeit") {
        info.value = "Spielstand";
        src.value = "https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg";
    }
    // 2. Halbzeit
    else if (message == "Spielstand 2. Halbzeit") {
        info.value = "Spielstand";
        src.value = "https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg";
    }
    // 7m Tor
    else if (message.includes("7m") && (message.includes("Tor") || message.includes("Erfolgreicher"))) {
        info.value = "7m Tor durch Nr. " + message.replace("7m", "").match(/\d+/)[0];
        src.value = "https://spo.handball4all.de/service/ticker/doZSekQl.svg";
    }
    // 7m
    else if (message.includes("7m")) {
        info.value = "7m von Nr. " + message.replace("7m", "").match(/\d+/)[0];
        src.value = "https://spo.handball4all.de/service/ticker/OBOdJWyJ.svg";
    }
    // Tor
    else if (message.includes("Tor")) {
        info.value = "Tor durch Nr. " + message.match(/\d+/)[0];
        src.value = "https://spo.handball4all.de/service/ticker/3GjFnr19.svg";
    }
    // Auszeit
    else if (message.includes("Mannschafts-Auszeit")) {
        info.value = "Auszeit";
        src.value = "https://spo.handball4all.de/service/ticker/3B6Hgy_M.svg";
    }
    // Verwarnung
    else if (message.includes("Verwarnung")) {
        info.value = "Verwarnung für Nr. " + message.match(/\d+/)[0];
        src.value = "https://spo.handball4all.de/service/ticker/jAfYIp8x.svg";
    }
    // 2-min
    else if (message.includes("2-min")) {
        info.value = "2-min Strafe für Nr. " + message.replace("2-min", "").match(/\d+/)[0];
        src.value = "https://spo.handball4all.de/service/ticker/V-fktpyp.svg";
    }
    else {
        info.value = "error";
        src.value = "";
    }

    if (message.includes("Gastmannschaft")) {
        guest.value = true;
    }
    else {
        guest.value = false;
    }

};

init();

const message_ref = toRef(props, "message");
watch(message_ref, async (newValue, oldValue) => {
    if (newValue) {
        init();
    }
});

</script>

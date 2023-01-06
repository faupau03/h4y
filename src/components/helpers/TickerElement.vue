<template>
    <div v-if="side == 'left' && !guest">
        <div class="flex mr-1 ml-auto sm:mr-10 w-fit items-center">
            <div class="hidden sm:block">
                {{ info_long }}
            </div>
            <div class="block sm:hidden">
                {{ info }}
            </div>

            <img class="h-5 w-5 ml-1 sm:mt-1 -mt-0.5" :src="src" alt="" />
        </div>
    </div>
    <div v-else-if="side == 'right' && guest">
        <div class="flex ml-1 mr-auto sm:ml-10 w-fit items-center">
            <img class="h-5 w-5 mr-1 sm:mt-1 -mt-0.5" :src="src" alt="" />
            <div class="hidden sm:block">
                {{ info_long }}
            </div>
            <div class="block sm:hidden">
                {{ info }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { ref, toRef, watch } from "vue";
const props = defineProps(["message", "side", "team_home", "team_guest"]);
const info = ref(null);
const info_long = ref(null);
const src = ref(null);
const guest = ref(false);

const init = () => {
    const message = props.message;
    if (!message) {
        return;
    }
    let team_members = props.team_home.team_members;

    //console.log(props.team_home);

    if (message.includes("Gastmannschaft")) {
        guest.value = true;
        team_members = props.team_guest.team_members;
    } else {
        guest.value = false;
    }

    // 1. Halbzeit
    if (message == "Spielstand 1. Halbzeit") {
        info.value = "Spielstand";
        info_long.value = "Spielstand 1. Halbzeit";
        src.value = "https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg";
    }
    // 2. Halbzeit
    else if (message == "Spielstand 2. Halbzeit") {
        info.value = "Spielstand";
        info_long.value = "Spielstand 2. Halbzeit";
        src.value = "https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg";
    }
    // 7m Tor
    else if (
        message.includes("7m") &&
        (message.includes("Tor") || message.includes("Erfolgreicher"))
    ) {
        let player_no = message.replace("7m", "").match(/\d+/);
        if (!player_no) {
            player_no = message.charAt(message.length - 1);
        }
        else {
            player_no = player_no[0];
        }
        const player = team_members.find(m => m.player_no == player_no);
        info.value =
            "7m Tor durch Nr. " + player_no;
        info_long.value = "7m Tor durch die Nummer" + player_no;
        if (player.prename != "N.N." && player.name != "N.N.") {
            info_long.value = "7m Tor durch " + player.prename + " " + player.name + "(" + player_no + ")";
        }
        src.value = "https://spo.handball4all.de/service/ticker/doZSekQl.svg";
    }
    // 7m
    else if (message.includes("7m")) {
        let player_no = message.replace("7m", "").match(/\d+/);
        if (!player_no) {
            player_no = message.charAt(message.length - 1);
        }
        else {
            player_no = player_no[0];
        }
        const player = team_members.find(m => m.player_no == player_no);
        info.value = "7m von Nr. " + player_no;
        info_long.value = "7m von der Nummer " + player_no;
        if (player.prename != "N.N." && player.name != "N.N.") {
            info_long.value = "7m von " + player.prename + " " + player.name + "(" + player_no + ")";
        }
        src.value = "https://spo.handball4all.de/service/ticker/OBOdJWyJ.svg";
    }
    // Tor
    else if (message.includes("Tor")) {
        let player_no = message.match(/\d+/);
        if (!player_no) {
            player_no = message.charAt(message.length - 1);
        }
        else {
            player_no = player_no[0];
        }

        const player = team_members.find(m => m.player_no == player_no);
        info.value = "Tor durch Nr. " + player_no;
        info_long.value = "Tor durch die Nummer " + player_no;
        if (player.prename != "N.N." && player.name != "N.N.") {
            info_long.value = "Tor durch " + player.prename + " " + player.name + "(" + player_no + ")";
        }
        src.value = "https://spo.handball4all.de/service/ticker/3GjFnr19.svg";
    }
    // Auszeit
    else if (message.includes("Mannschafts-Auszeit")) {
        info.value = "Auszeit";
        info_long.value = "Mannschafts-Auszeit";
        src.value = "https://spo.handball4all.de/service/ticker/3B6Hgy_M.svg";
    }
    // Verwarnung
    else if (message.includes("Verwarnung")) {
        let player_no = message.match(/\d+/);
        if (!player_no) {
            player_no = message.replace("Verwarnung für die Nummer ", "").charAt(0);
        }
        else {
            player_no = player_no[0];
        }
        const player = team_members.find(m => m.player_no == player_no);
        info.value =
            "Verwarnung für Nr. " + player_no;
        info_long.value = "Verwarnung für die Nummer " + player_no;
        if (player.prename != "N.N." && player.name != "N.N.") {
            info_long.value = "Verwarnung für " + player.prename + " " + player.name + "(" + player_no + ")";
        }
        src.value = "https://spo.handball4all.de/service/ticker/jAfYIp8x.svg";
    }
    // Disqualifikation
    else if (message.includes("Disqualifikation")) {
        let player_no = message.match(/\d+/)[0];
        if (!player_no) {
            player_no = message.replace("Disqualifikation für die Nummer ", "").charAt(0);
        }
        else {
            player_no = player_no[0];
        }
        const player = team_members.find(m => m.player_no == player_no);
        info.value = "Disqualifikation für Nr. " + player_no;
        info_long.value = "Disqualifikation für die Nummer " + player_no;
        if (player.prename != "N.N." && player.name != "N.N.") {
            info_long.value = "Disqualifikation für " + player.prename + " " + player.name + "(" + player_no + ")";
        }
        src.value = "https://spo.handball4all.de/service/ticker/2wU3SwVT.svg";
    }
    // 2-min
    else if (message.includes("2-min")) {
        let player_no = message.replace("2-min", "").match(/\d+/);
        if (!player_no) {
            player_no = message.replace("2-min Strafe für die Nummer ", "").charAt(0);
        }
        else {
            player_no = player_no[0];
        }
        const player = team_members.find(m => m.player_no == player_no);
        info.value =
            "2-min Strafe für Nr. " + player_no;
        info_long.value = "2-min Strafe für die Nummer " + player_no;
        if (player.prename != "N.N." && player.name != "N.N.") {
            info_long.value = "2-min Strafe für " + player.prename + " " + player.name + "(" + player_no + ")";
        }
        src.value = "https://spo.handball4all.de/service/ticker/V-fktpyp.svg";
    }
    // error
    else {
        info.value = "error";
        info_long.value = "error";
        src.value = "";
    }


};

init();

const message_ref = toRef(props, "message");
watch(message_ref, async (newValue, oldValue) => {
    if (newValue && props.team_home) {
        init();
    }
});
</script>

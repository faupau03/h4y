<template>
    <div class="">
        <CalendarIcon @click="createIcal" class="h-6 mt-0.5 hover:text-indigo-500" />
        <a class="hidden" ref="download"></a>
    </div>
</template>
<script setup>
import ical from 'ical-generator';
import { getDate } from '../functions/misc.js';
import { CalendarIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';

const props = defineProps(["game"]);
const download = ref(null);

const createIcal = () => {
    const cal = ical();
let dateEnd = getDate(props.game);
dateEnd.setHours(dateEnd.getHours() + 1.5);
const event = cal.createEvent({
    start: getDate(props.game),
    end: dateEnd,
    summary: 'Handball Spiel ' + props.game.gHomeTeam + ' - ' + props.game.gGuestTeam,
});
download.value.href = "data:text/calendar;" + cal.toBlob();
download.value.click();
}



</script>
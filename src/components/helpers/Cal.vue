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
dateEnd.setMinutes(dateEnd.getMinutes() + 90);
const event = cal.createEvent({
    start: getDate(props.game),
    end: dateEnd,
    summary: 'Handball Spiel ' + props.game.gHomeTeam + ' - ' + props.game.gGuestTeam,

    url: window.location.href,
});
event.location({
    title: props.game.gGymnasiumName,
    address: props.game.gGymnasiumStreet + ', ' + props.game.gGymnasiumPostal + ', ' + props.game.gGymnasiumTown,
});

event.description({
    plain: 'Handballspiel, ' + props.game.gHomeTeam + ' gegen ' + props.game.gGuestTeam + ' in  ' + props.game.gGymnasiumName + ' in ' + props.game.gGymnasiumTown + ' am ' + getDate(props.game).toLocaleString('de-DE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }) + ' Uhr',
})

cal.prodId({
    company: 'h4y.paffnet.de',
    product: 'Handball4You',
    language: 'DE',
})
console.log(cal.toString());
download.value.href = "data:text/calendar;charset=utf8," + encodeURIComponent(cal.toString());
download.value.setAttribute('download', "Handballspiel.ics");
download.value.click();
}



</script>
<template>
    <div v-if="game || games.length" class="">
        <CalendarIcon @click="createIcal" class="h-6 mt-0.5 hover:text-indigo-500" />
        <a class="hidden" ref="download"></a>
    </div>
    <div v-else>
        <!-- TODO: Disabled icon -->
    </div>
</template>
<script setup>
import ical from 'ical-generator';
import { getDate } from '../functions/misc.js';
import { CalendarIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';

const props = defineProps(["game", "type", "games", "team", "club"]);
const download = ref(null);

const createIcal = () => {
    const cal = ical();

    if (props.type == "single") {

        let dateEnd = getDate(props.game);
        if (dateEnd.getMinutes() != 0 || dateEnd.getHours() != 0) {
            dateEnd.setMinutes(dateEnd.getMinutes() + 90);
        }
        let dateStart = getDate(props.game);
        const event = cal.createEvent({
            start: dateStart,
            end: dateEnd,
            summary: 'Handball Spiel, ' + props.game.gHomeTeam + ' - ' + props.game.gGuestTeam,

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
    }

    else if (props.type == "multiple") {
        console.log(props.games);
        for (let game of props.games) {
            let dateStart = getDate(game);
            let dateEnd = getDate(game);
            if (dateEnd.getMinutes() != 0 || dateEnd.getHours() != 0) {
                dateEnd.setMinutes(dateEnd.getMinutes() + 90);
            }
            console.log(dateStart);
            const event = cal.createEvent({
                start: dateStart,
                end: dateEnd,
                summary: 'Handball Spiel, ' + game.gHomeTeam + ' - ' + game.gGuestTeam,

                url: window.location.href,
            });
            event.location({
                title: game.gGymnasiumName,
                address: game.gGymnasiumStreet + ', ' + game.gGymnasiumPostal + ', ' + game.gGymnasiumTown,
            });

            event.description({
                plain: 'Handballspiel, ' + game.gHomeTeam + ' gegen ' + game.gGuestTeam + ' in  ' + game.gGymnasiumName + ' in ' + game.gGymnasiumTown + ' am ' + getDate(game).toLocaleString('de-DE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }) + ' Uhr',
            })
        }
    }


    cal.prodId({
        company: 'h4y.paffnet.de',
        product: 'Handball4You',
        language: 'DE',
    })
    //console.log(cal.toString());
    download.value.href = "data:text/calendar;charset=utf8," + encodeURIComponent(cal.toString());
    if (props.type == "single") {
        download.value.setAttribute('download', props.game.gDate + ", " + props.game.gHomeTeam + " - " + props.game.gGuestTeam + ".ics");
    }
    else {
        download.value.setAttribute('download', props.club.lname + " " +  props.team.head.name + ".ics");
    }
    download.value.click();
}



</script>
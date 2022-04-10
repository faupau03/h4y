<template>
    <div>
        <div v-if="loading">
            <MatchLoading v-for="i in 3" :key="i"></MatchLoading>
        </div>
        <div v-else>
            <Match v-for="game in games" :key="game.gID" :match="game"></Match>
            <div v-show="!games.length && !showAll">
                Keine zukünftigen Spiele in dieser Klasse
            </div>
        </div>
        
    </div>
</template>

<script setup>
    import Match from "./Match.vue";
    import MatchLoading from "./MatchLoading.vue";
    const props = defineProps(["games","loading","showAll"]);
</script>
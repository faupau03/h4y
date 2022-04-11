<template>
    <div>
        <div v-if="Object.keys(groups).length && games.length">
            <div v-for="group in groups" :key="group[0]['gGroupsortTxt']">
                <div>
                    {{ group[0]["gGroupsortTxt"] }}
                </div>
                <div v-if="group.length">
                    <Match v-for="game in group" :key="game.gID" :match="game" :teamClassID="teamClassID" @gameUpdate="(gID,tID,cID) => $emit('gameUpdate',gID,tID,cID)"></Match>
                </div>
                <div v-else>
                    Keine Spiele in dieser Gruppe
                </div>
                
            </div>
        </div>
        <div v-else>
            <Match v-for="game in games" :key="game.gID" :match="game" :teamClassID="teamClassID"   @gameUpdate="(gID,tID,cID) => $emit('gameUpdate',gID,tID,cID)"></Match>
            <div v-show="!games.length && !showAll">
                Keine zukünftigen Spiele in dieser Klasse
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import Match from "./Match.vue";
    import MatchLoading from "./MatchLoading.vue";
    import { onMounted, ref } from "vue";

    const groups = ref({});
    const emits = defineEmits(["gameUpdate"]);
    const props = defineProps(["games","loading","showAll","teamClassID"]);
    onMounted(() => {
        //console.log(props.games);
        //console.log(props.games[0]["gGroupsortTxt"]);
        if(!props.games.length) {
            return;
        }
        if (props.games[0]["gGroupsortTxt"]) {
            //console.log("grouped");
            for (let game of props.games) {
                //console.log(game);
                if (groups.value[game["gGroupsortTxt"]]) {
                    groups.value[game["gGroupsortTxt"]].push(game);
                } else {
                    groups.value[game["gGroupsortTxt"]] = [game];
                }
            }
            
        }
        //console.log(groups.value);
    });
</script>
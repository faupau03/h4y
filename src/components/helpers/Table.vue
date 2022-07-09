<template>
    <div class="flex p-1 my-0.5 bg-secondary bg-opacity-20 rounded-lg">
        <div class="text-sm mr-1">
            {{ team_score.tabScore }}
        </div>
        <div
            class="font-bold text-sm"
            v-html="wbr(team_score.tabTeamname)"
        ></div>
        <div class="ml-auto hidden sm:flex mr-7 text-sm">
            <img class="h-5 w-5 mt-0.5 mr-1" src="/icons/goal.png" alt="" />
            {{ team_score.numGoalsShot }} : {{ team_score.numGoalsGot }}
        </div>
        <div class="text-sm flex sm:ml-0 ml-auto mr-7 w-fit">
            <img class="h-4 mt-1" src="/icons/ball.svg" alt="" />
            {{ team_score.numPlayedGames }}
        </div>
        <div class="text-sm mr-2 sm:mr-0.5 sm:ml-5 font-bold">
            {{ team_score.pointsPlus }}
        </div>
        <div class="text-sm mr-2 hidden sm:block">
            : {{ team_score.pointsMinus }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["team_score"]);

const wbr = (str) => {
    return str.replace("/", "/<wbr>");
};
</script>

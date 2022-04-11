<template>
    <div class="w-full">
        <MatchLoading v-for="i in 3" :key="i"></MatchLoading>
    </div>
</template>

<script setup>
import MatchLoading from "./MatchLoading.vue";
</script>
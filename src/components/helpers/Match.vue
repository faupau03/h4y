<template>
    <!-- TODO: fix this -->
    <div class="btn btn-primary h-auto p-0 bg-opacity-30 dark:brightness-150 border-opacity-20 hover:bg-opacity-50 btn-lg my-1 p-2 justify-between px-5 hover:scale-95 scale-100 w-full flex text-base-content"
        @click="if (!$event.target.classList.contains('gym')) {
            $router.push(
                'match#' + match.gID + ';' + teamID + ';' + teamClassID
            );
            $emit('gameUpdate', match.gID, teamID, teamClassID);
        }
                                                                                            ">
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-1 w-full m-0 items-center">
            <div id="teams" class=" w-fit col-span-2 text-xs font-bold">
                <!-- teams -->
                {{ match.gHomeTeam }} :
                {{ match.gGuestTeam }}
            </div>

            <div id="date-time" class="w-fit text-xs">
                <div class="flex">
                    {{ match.gWDay }}
                    {{ match.gDate }}
                </div>
                <div class="flex">
                    <ClockIcon class="h-4 mr-1" />
                    {{ match.gTime }}
                </div>
            </div>

            <div id="location" class="flex col-span-2">
                <!-- Gymnasium -->
                <MapPinIcon class="h-4 w-4  shrink-0" />
                <span class="truncate text-xs underline opacity-75 hover:text-indigo-500">
                    <!-- TODO: add link to gym -->
                    <router-link class="gym" :to="'/gym#' + match.gGymnasiumID">{{ match.gGymnasiumName }}</router-link>
                </span>
            </div>

            <div id="score" class="flex w-fit">
                <div class="min-w-[20px] mr-1 text-right">
                    {{ match.gHomeGoals }}
                </div>
                :
                <div class="min-w-[20px] ml-1">
                    {{ match.gGuestGoals }}
                </div>
                <!-- Live animation -->
                <LiveElement v-show="match.live == true" class="text-xs ml-2" />
            </div>

            <div id="info" class="col-span-3 text-xs text-base-content opacity-50" v-if="match.gComment"
                :class="match.gComment.length > 1 ? 'flex' : 'hidden'">
                <InformationCircleIcon class="h-4 w-4 mr-1" />
                {{ match.gComment }}
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ClockIcon,
    MapPinIcon,
    InformationCircleIcon,
} from "@heroicons/vue/24/solid";

import LiveElement from "./LiveElement.vue";

const emits = defineEmits(["gameUpdate"]);
const props = defineProps(["match", "teamID", "teamClassID"]);
</script>

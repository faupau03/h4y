<template>
<!-- TODO: fix this -->
    <div
        class="rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"
        
        @click="if (!$event.target.classList.contains('gym')) {
            $router.push(
                'match#' + match.gID + ';' + teamID + ';' + teamClassID
            );
            $emit('gameUpdate',match.gID,teamID,teamClassID);
        }
        "
    >
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-1">
            <div
                id="teams"
                class="text-black w-fit col-span-2 text-xs font-bold"
            >
                <!-- teams -->
                {{ match.gHomeTeam }} :
                {{ match.gGuestTeam }}
            </div>

            <div id="date-time" class="w-fit text-xs text-gray-800">
                <div class="flex">
                    {{ match.gWDay }}
                    {{ match.gDate }}
                </div>
                <div class="flex">
                    <ClockIcon class="h-4 mr-1 text-indigo-900" />
                    {{ match.gTime }}
                </div>
            </div>

            <div id="location" class="flex text-black col-span-2">
                <!-- Gymnasium -->
                <LocationMarkerIcon class="h-4 w-4 text-indigo-900 shrink-0" />
                <span class="truncate text-xs underline hover:text-indigo-500">
                    <!-- TODO: add link to gym -->
                    <router-link class="gym" :to="'/gym#' + match.gGymnasiumID">{{ match.gGymnasiumName }}</router-link>
                </span>
            </div>

            <div id="score" class="flex w-fit text-black">
                <div class="min-w-[20px] mr-1 text-right">
                    {{ match.gHomeGoals }}
                </div>
                :
                <div class="min-w-[20px] ml-1">
                    {{ match.gGuestGoals }}
                </div>
                <!-- Live animation -->
                <div
                    v-show="match.live == true"
                    class="rounded-full relative w-4 h-4 mt-0.5"
                >
                    <div
                        class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-500 opacity-75"
                    ></div>
                    <div
                        class="z-20 mx-auto my-auto mt-0.5 animate-none rounded-full h-3 w-3 bg-red-500"
                    ></div>
                </div>
            </div>

            <div
                id="info"
                class="col-span-3 text-xs text-gray-600"
                v-if="match.gComment"
                :class="match.gComment.length > 1 ? 'flex' : 'hidden'"
            >
                <InformationCircleIcon class="h-4 w-4 mr-1" />
                {{ match.gComment }}
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ClockIcon,
    LocationMarkerIcon,
    InformationCircleIcon,
} from "@heroicons/vue/solid";

const emits = defineEmits(["gameUpdate"]);
const props = defineProps(["match", "teamID", "teamClassID"]);
</script>

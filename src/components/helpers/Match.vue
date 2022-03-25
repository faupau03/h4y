<template>
    <div
        class="rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"
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
                <span class="truncate text-xs">
                    {{ match.gGymnasiumName }}
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
            </div>
            <div
                id="info"
                class="col-span-3 text-xs text-gray-600"
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



const props = defineProps(['match']);

</script>

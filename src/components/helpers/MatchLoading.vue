<template>
    <div
        class="bg-primary text-base-content rounded-lg py-4 bg-opacity-30 dark:brightness-150 items-center border-opacity-20  w-full  my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"
    >
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-1 w-full items-center">
            <div
                id="teams"
                class=" w-fit col-span-2 text-xs font-bold"
            >
                <!-- teams -->
                <span
                    class="w-12 h-4 animate-pulse rounded -mb-1 bg-gray-500 inline-block"
                ></span>
                :
                <span
                    class="w-12 h-4 animate-pulse rounded -mb-1 bg-gray-500 inline-block"
                ></span>
            </div>

            <div id="date-time" class="w-fit text-xs text-gray-800">
                <span
                    class="inline-block w-6 animate-pulse rounded xs:hidden h-3 bg-gray-500"
                ></span>
                <div class="flex">
                    <span
                        class="w-4 mr-1 hidden xs:block animate-pulse rounded h-3 bg-gray-500"
                    ></span>
                    <span
                        class="w-12 animate-pulse rounded h-3 bg-gray-500"
                    ></span>
                </div>
                <div class="flex">
                    <div
                        class="h-4 w-4 mt-0.5 animate-pulse bg-gray-500 rounded-full mr-1 shrink-0"
                    ></div>
                    <span
                        class="w-8 h-3 mt-1 animate-pulse rounded m-0.5 bg-gray-500"
                    ></span>
                </div>
            </div>

            <div id="location" class="flex col-span-2 mt-1">
                <!-- Gymnasium -->
                <div
                    class="h-4 w-4 bg-gray-500 animate-pulse rounded-full mr-1 shrink-0"
                ></div>
                <span class="truncate text-xs">
                    <span
                        class="w-20 rounded animate-pulse h-4 bg-gray-500 inline-block"
                    ></span>
                </span>
            </div>

            <div id="score" class="flex w-fit">
                <div class="min-w-[20px] mr-1 text-right">
                    <span
                        class="w-5 animate-pulse -mb-1 h-4 inline-block rounded bg-gray-500"
                    ></span>
                </div>
                :
                <div class="min-w-[20px] ml-1">
                    <span
                        class="w-5 animate-pulse -mb-1 h-4 inline-block rounded bg-gray-500"
                    ></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<template>

    <div class="w-full grid gap-4">
        <NavBar title="Verein" subtitle="Spielübersicht" />
        <div id="club-header" class="grid w-5/6 m-auto relative bg-base-100 card shadow-xl">
        </div>
        <div class="w-5/6 m-auto gap-4 p-2 mb-4 card bg-base-100 shadow-xl overflow-hidden">
            <!-- Control bar for Analysis, select position, player no, player name, mode: auto, manuell -->
            <div class="flex gap-2 items-center flex-wrap">
                <!-- select player position -->
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Position</span>
                    </label>
                    <select class="select select-bordered">
                        <option disabled selected>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>
                </div>
                <!-- select player no, show name -->
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Nummer</span>
                    </label>
                    <select class="select select-bordered">
                        <option disabled selected>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>
                </div>
                <!-- toggle auto mode -->
                <div class="form-control w-full max-w-xs">
                    <label class="label cursor-pointer grid text-center">
                        <span class="label-text">Auto</span>
                        <input type="checkbox" class="toggle toggle-primary" checked />
                    </label>
                </div>
            </div>
            <div class="box relative w-full aspect-[4/3] items-center flex flex-col relative">
                <div id="goal"
                    class="relative border-x-4 border-t-4 before:border-dashed before:border-red-600 before:border-x-4 before:border-t-4 before:box-border before:absolute before:-ml-1 before:-mt-1 before:block before:h-[calc(100%+4px)] before:w-[calc(100%+8px)] border-black w-1/3 h-1/3">
                    <div id="ball" @dragEnd="logCoordinates" class="sm:w-1/6 w-1/5 text-red-100 absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-accent">
                            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path
                                d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6h59.2c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z" />
                        </svg>
                    </div>
                </div>
                <div id="field" class=" w-full aspect-video border border-1 border-black">
                    <svg id="eANB2SGzTMY1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1600 900" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <ellipse rx="840" ry="720" transform="translate(800 0)" fill="none" fill-rule="evenodd"
                            stroke="#f00" stroke-width="5" stroke-dasharray="50" />
                        <ellipse rx="600" ry="480" transform="translate(800 0)" fill="#f00" fill-opacity="0.2"
                            stroke="#f00" stroke-width="5" />
                    </svg>
                    <div id="player" class="w-[10%] top-1/2 absolute fill-accent" draggable="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path
                                d="M256 48c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z" />
                        </svg>
                    </div>

                </div>
                <!-- Player no and name -->
                <div class="absolute top-0 left-0 w-1/3 h-1/4 grid justify-center text-center items-center">
                    <span class="font-bold text-2xl sm:text-5xl">21</span>
                    <span class="hidden xs:block sm:text-2xl">A. Krenkel</span>
                </div>
                <!-- Player position and goals -->
                <div class="absolute top-0 right-0 w-1/3 h-1/4 grid justify-center text-center items-center">
                    <span class="font-bold xs:text-xl sm:text-3xl word-break">Links Außen</span>
                    <span class="hidden xs:block sm:text-5xl">6</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref, watch, onMounted } from 'vue'
import Draggabilly from 'draggabilly'

onMounted(async () => {
    console.log('mounted')
    var ball = document.querySelector('#ball')
    var drag_ball = new Draggabilly(ball, {
        containment: '#goal'
    })

    drag_ball.on('dragEnd', (event, pointer) => {
        console.log('dragEnd')
        console.log(document.querySelector("#goal").offsetWidth)
        console.log(document.querySelector("#goal").offsetHeight)

        //Goal dimensions
        var goal_width = document.querySelector("#goal").offsetWidth
        var goal_height = document.querySelector("#goal").offsetHeight

        //Ball position
        var pos_x = parseInt(String(ball.style.left).replace("px", "")) + ball.offsetWidth / 2
        var pos_y = parseInt(String(ball.style.top).replace("px", "")) + ball.offsetHeight / 2

        console.log(pos_x / goal_width)
        console.log(1 - pos_y / goal_height)

        const rel_pos_x = pos_x / goal_width
        const rel_pos_y = 1 - (pos_y / goal_height)
    })

    var player = document.querySelector('#player')
    var drag_player = new Draggabilly(player, {
        containment: '#field'
    })
})

const logCoordinates = () => {
    console.log("drag end");
}

</script>

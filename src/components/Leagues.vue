<template>
    <div class="w-full h-full flex text-3xl">
        <div class="h-full">

            <div v-if="!og && !o" id="overview" class="mb-20 ml-10">
                <h1 class="text-3xl font-bold mt-4">Übersicht</h1>
                <p class="text-sm text-gray-500 uppercase font-bold mb-4">Ligen</p>
                <!-- all registered organizations from handball4all  -->
                <div v-for="level, key in leagues" class="mt-4">
                    <h1 class="text-2xl">{{ key }}</h1>
                    <div v-for="org, key in level">
                        <router-link class="bg-indigo-100 text-lg p-1 rounded-lg shadow-2xl hover:bg-indigo-200"
                            :to="'#' + org.o + ';' + org.og">{{ key }}</router-link>
                    </div>
                </div>
            </div>
            <div v-else class="ml-10">
                <h1 class="text-3xl font-bold mt-4">{{ name }}</h1>
                <p v-if="!loading" class="text-sm text-gray-500 uppercase font-bold mb-4">{{ league }}</p>

                <div id="menu">
                    
                </div>

            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, onUpdated, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const leagues = ref({});
const loading = ref(true);
const name = ref('');
const league = ref('');
const o = ref(null);
const og = ref(null);

//watch route change
watch(route, (newVal, oldVal) => {
    console.log("route changed", newVal.hash);
    if (newVal.hash) {
        o.value = newVal.hash.split(';')[0];
        if (o.value == "undefined") {
            o.value = null;
        }
        og.value = newVal.hash.split(';')[1];
        if (og.value == "undefined") {
            og.value = null;
        }
    }
    else {
        o.value = null;
        og.value = null;
    }
    getName();
});

const getName = () => {
    const json = leagues.value;
    console.log(json);
    for (let element of Object.keys(json)) {
        //console.log(element);
        for (let object of Object.keys(json[element])) {
            console.log("O:", json[element][object].o);

            if (json[element][object].o == o.value || json[element][object].og == og.value) {
                name.value = object + ' (' + json[element][object].name + ')';
                league.value = element;
                return;
            }
        } 
    }
    
}

const getLeagues = async () => {
    loading.value = true;
    const response = await fetch("/organizations.json");
    const data = await response.json();
    leagues.value = data;
    loading.value = false;
}

onMounted(async () => {
    await getLeagues();
    if (route.hash) {
        o.value = route.hash.split(';')[0];
        if (o.value == "undefined") {
            o.value = null;
        }
        og.value = route.hash.split(';')[1];
        if (og.value == "undefined") {
            og.value = null;
        }
    }
    else {
        o.value = null;
        og.value = null;
    }
    getName();
});
</script>
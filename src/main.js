import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onOfflineReady() { },
})


// Components
import Search from "./components/Search.vue";
import Leagues from "./components/Leagues.vue";
import League from "./components/League.vue";
import Favorites from "./components/Favorites.vue";
import Settings from "./components/Settings.vue";
import Match from "./components/Match.vue";
import Club from "./components/Club.vue";
import Gym from "./components/Gym.vue";
import Team from "./components/Team.vue";
import Analysis from "./components/Analysis.vue";
import Test from "././components/helpers/Test.vue";

const routes = [
    {
        path: import.meta.env.BASE_URL + '/test', component: Test
    },
    {
        path: import.meta.env.BASE_URL + '/', redirect: import.meta.env.BASE_URL + 'favorites'
    },
    {
        path: import.meta.env.BASE_URL + '/team', component: Team, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/leagues', component: Leagues, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/league', component: League, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/favorites', component: Favorites, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/search', component: Search, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/match', component: Match, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/club', component: Club, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/gym', component: Gym, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/settings', component: Settings, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: import.meta.env.BASE_URL + '/analysis', component: Analysis, meta: {
            KeepAlive: true // Need to be cached
        }
    },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.config.globalProperties.$location = window.location;
app.use(router)
app.use(createHead())
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'

// Components
import Search from "./components/Search.vue";
import Leagues from "./components/Leagues.vue";
import Favorites from "./components/Favorites.vue";
import Settings from "./components/Settings.vue";
import Match from "./components/Match.vue";
import Club from "./components/Club.vue";
import Gym from "./components/Gym.vue";

const routes = [
    {
        path: '/', component: Leagues, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/leagues', component: Leagues, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/favorites', component: Favorites, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/search', component: Search, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/match', component: Match, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/club', component: Club, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/gym', component: Gym, meta: {
            KeepAlive: true // Need to be cached
        }
    },
    {
        path: '/settings', component: Settings, meta: {
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
app.use(router)
app.mount('#app')

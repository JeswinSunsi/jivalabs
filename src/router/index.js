import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import IntroView from '../views/Intro.vue'
import ScanView from '../views/Scan.vue'
import VoiceView from '../views/Voice.vue'
import ProfileView from '../views/Profile.vue'
import ChatView from "../views/Chat.vue"

const routes = [
  { path: '/', component: IntroView },
  { path: '/home', component: HomeView },
  { path: '/profile', component: ProfileView },
  { path: '/scan/:disease', component: ScanView },
  { path: '/voice/:disease', component: VoiceView },
  { path: '/chat', component: ChatView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
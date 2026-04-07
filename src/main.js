import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './reset.css'
import router from "./router";
import App from './App.vue'

createApp(App).use(router).use(MotionPlugin).mount('#app')

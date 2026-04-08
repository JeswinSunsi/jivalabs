import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './reset.css'
import router from "./router";
import App from './App.vue'
import i18n from './i18n';

createApp(App).use(router).use(i18n).use(MotionPlugin).mount('#app')

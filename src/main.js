import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseMusicCards from './components/BaseMusicCards'

const myApp=createApp(App)
myApp.component('base-musiccard', BaseMusicCards)
myApp.use(router).mount('#app')

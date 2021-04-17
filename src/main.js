import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseMusicCards from './components/BaseMusicCards'
import BaseSearchBar from './components/BaseSearchBar'
import BaseButton from './components/BaseButton'
import MusicCards from './components/MusicCards'
import AddMusicCard from './components/AddMusicCard'

const myApp=createApp(App)
myApp.component('base-musiccard', BaseMusicCards)
myApp.component('base-searchbar', BaseSearchBar)
myApp.component('base-button', BaseButton)
myApp.component('music-cards', MusicCards)
myApp.component('add-musiccard', AddMusicCard)
myApp.use(router).mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import  router  from './router/routes'
import  store  from './store/store'
import axios from 'axios'

const token = localStorage.getItem('token');
if(token){
    axios.defaults.headers.common['Authorization'] = token;
}

createApp(App).use(router).use(store).mount('#app')

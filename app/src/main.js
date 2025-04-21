import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
})

const app = createApp(App)
app.config.globalProperties.$api = api
app.use(router)
app.mount('#app')
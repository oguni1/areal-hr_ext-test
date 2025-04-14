import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const app = createApp(App)
app.config.globalProperties.$api = api
app.mount('#app')
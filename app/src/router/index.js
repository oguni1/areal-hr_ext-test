import { createRouter, createWebHistory } from 'vue-router'
import Organizations from '../components/Organizations.vue'

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: Organizations
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
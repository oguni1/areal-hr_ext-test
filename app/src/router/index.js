import { createRouter, createWebHistory } from 'vue-router'
import Organizations from '../components/Organizations.vue'
import Roles from '../components/Roles.vue'

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: Organizations
  },
  {
      path: '/roles',
      name: 'roles',
      component:Roles
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
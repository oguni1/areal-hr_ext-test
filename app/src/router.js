import { createRouter, createWebHistory } from 'vue-router'
import organizationsList from './models/organizationsList.vue'

const routes = [
  {
    path: '/',
    redirect: '/organizations'
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: organizationsList
  },
  {
    path: '/organizations/:id',
    name: 'OrganizationDetail',
    component: () => import('./models/organizations.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
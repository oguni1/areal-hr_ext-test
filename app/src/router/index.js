import { createRouter, createWebHistory } from 'vue-router'
import Organizations from '../components/Organizations.vue'
import Roles from '../components/Roles.vue'
import Departments from '../components/Departments.vue'
import Employees from '../components/Employees.vue'
import Files from '../components/Files.vue'
import Passports from '../components/Passports.vue'
import Registrations from '../components/Registrations.vue'
import OperationHistory from '../components/OperationHistory.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
  },
  {
        path: '/departments',
        name: 'departments',
        component: Departments
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  },
  {
    path: '/passports',
    name: 'Passports',
    component: Passports
  },
  {
    path: '/registrations',
    name: 'Registrations',
    component: Registrations
  },
  {
    path: '/operation-history',
    name: 'OperationHistory',
    component: OperationHistory
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
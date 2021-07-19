import { createWebHistory, createRouter } from 'vue-router'
import TodoHome from './container/TodoHome.vue'

const routes = [
  {
    path: '/',
    name: 'TodoHome',
    component: TodoHome,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

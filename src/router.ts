import { createWebHistory, createRouter } from 'vue-router'
import TodoHome from './container/TodoHome.vue'
import Counter from './components/Counter.vue'
import NotFound from './container/NotFound.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
  {
    path: '/',
    name: 'TodoHome',
    component: TodoHome,
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter,
    props: { msg: 'message' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

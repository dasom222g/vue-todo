import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './store'
import './assets/style/pages.scss'
import './assets/style/todo.scss'
import { worker } from './mocks/browser'
import router from './router'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

// createApp(App).mount('#app')
const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')

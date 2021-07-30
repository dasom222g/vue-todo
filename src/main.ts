import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './store'
import './assets/style/pages.scss'
import './assets/style/todo.scss'
import { worker } from './mocks/browser'
import router from './router'

const app = createApp(App)

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSquare, faCheckSquare, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faSquare, faCheckSquare, faEdit, faTrashAlt)
app.component('font-awesome-icon', FontAwesomeIcon)

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

// createApp(App).mount('#app')
app.use(store, key)
app.use(router)
app.mount('#app')

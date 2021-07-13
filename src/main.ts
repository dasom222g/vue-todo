import { createApp } from "vue";
import App from "./App.vue";
import { key, store } from "./store";
import "./assets/style/pages.scss";
import "./assets/style/todo.scss";
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  console.log('worker', worker)
  worker.start()
}


// createApp(App).mount('#app')
const app = createApp(App);
app.use(store, key);
app.mount("#app");

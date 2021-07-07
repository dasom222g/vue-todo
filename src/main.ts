import { createApp } from "vue";
import App from "./App.vue";
import { key, store } from "./store";
import "./assets/style/pages.scss";
import "./assets/style/todo.scss";

// createApp(App).mount('#app')
const app = createApp(App);
app.use(store, key);
app.mount("#app");

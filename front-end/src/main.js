import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "./assets/app.css";
import router from "./router";
createApp(App)
    .use(router)
    .mount("#app");

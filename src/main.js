import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);

// Make BootstrapVue available throughout your project
// Optionally install the BootstrapVue icon components plugin
app.use(store).use(router).mount("#app");

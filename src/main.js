import { createApp } from 'vue';
import router from "./router";
import store from "./pages/store/store";
import App from "./App";
import BaseCard from "./pages/components/ui/BaseCard";
import BaseSpinner from "./pages/components/ui/BaseSpinner";
import BaseBadge from "./pages/components/ui/BaseBadge";
import BaseDialog from "./pages/components/ui/BaseDialog";
const app = createApp(App)

app.use(store)
app.use(router)

app.component('base-card', BaseCard)
app.component('base-button', BaseCard)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)
app.mount('#app');



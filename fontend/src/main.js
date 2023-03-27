import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PiniaPersistPlugin  from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia=createPinia()
pinia.use(PiniaPersistPlugin)
app.use(router)

app.use(pinia).mount('#app')

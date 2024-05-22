
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue3FormWizard from 'vue3-form-wizard'
// import 'vue3-form-wizard/dist/style.css'
const app = createApp(App)

app.use(router)
app.mount('#app')

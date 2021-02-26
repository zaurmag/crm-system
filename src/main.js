import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import toasts from '@/utils/toasts.js'
import '@/assets/index.css'
import 'materialize-css/dist/js/materialize.min'

createApp(App)
  .use(toasts)
  .use(store)
  .use(router)
  .mount('#app')

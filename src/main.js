import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import toasts from '@/utils/toasts.js'
import ThePreloader from '@/components/App/ThePreloader'
import '@/assets/index.css'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  // apiKey: process.env.VUE_APP_FB_APIKEY,
  apiKey: 'AIzaSyCw1IvnZbs1KfzfrObf6DOr4grRFnCFbBw',
  authDomain: "vue-srm-417fb.firebaseapp.com",
  projectId: "vue-srm-417fb",
  storageBucket: "vue-srm-417fb.appspot.com",
  messagingSenderId: "547584906950",
  appId: "1:547584906950:web:15d48f017589e40df469c7"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app =  createApp(App)
    .component('ThePreloader', ThePreloader)
    .use(toasts)
    .use(store)
    .use(router)
    .mount('#app')
  }
})



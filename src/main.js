import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app'
import router from './router/index';
import vuetify from './plugins/vuetify';
import store from './store'

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu5tSy_lF6r7ykR10GAnxXCcT1zxIYzUA",
  authDomain: "dewit-d9191.firebaseapp.com",
  databaseURL: "https://dewit-d9191.firebaseio.com",
  projectId: "dewit-d9191",
  storageBucket: "dewit-d9191.appspot.com",
  messagingSenderId: "450842853798",
  appId: "1:450842853798:web:ce86eb0b6a5ada233acf67",
  measurementId: "G-TYR9FCMLG7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const bus = new Vue();

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

import store from '@/store/index'
import firebase from 'firebase/app'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCrfodW7MExAjvYgZbRYK5ypNjXGmjTkqA',
  authDomain: 'dewit-77361.firebaseapp.com',
  databaseURL: 'https://dewit-77361.firebaseio.com',
  projectId: 'dewit-77361',
  storageBucket: 'dewit-77361.appspot.com',
  messagingSenderId: '232567635333',
  appId: '1:232567635333:web:488fd7abc55886225258ec',
  measurementId: 'G-5CBXY0SMYX',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('auth/fetchAuthUser')
  }
})
Vue.use(require('vue-moment'))

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app')

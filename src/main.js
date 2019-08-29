import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';

import jwtDecode from 'jwt-decode';

 const token = localStorage.FBidToken

 if(token) {
   const decodedToken = jwtDecode(token);
   if(decodedToken.exp * 1000 > Date.now()) {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch('AUTH_USER', decodedToken);
   }
   store.state.path = '/login'
 }
 if(!token) {
   store.state.path = '/signup'
 }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  beforeCreate() {
    if (store.state.authId) {
      this.$store.dispatch('FETCH_AUTH_USER');
    } else {
      router.push(store.state.path)
    }
  },
}).$mount('#app')

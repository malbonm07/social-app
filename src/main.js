import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import jwtDecode from 'jwt-decode';

 const token = localStorage.FBidToken
 if(token) {
   const decodedToken = jwtDecode(token);
   if(decodedToken.exp * 1000 < Date.now()) {
     window.location.href = '/login';
   }
 }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.mixin({
  data: function () {
    return {
      baseUrl: 'https://cors-anywhere.herokuapp.com/https://jopay-laravel-user-crud.herokuapp.com/api/v1/',
    }
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

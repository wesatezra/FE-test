import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { makeServer } from "./server"
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

if (process.env.NODE_ENV === "development") {
  makeServer()
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins' // 引入Vue插件
import '@/assets/css/reset.css' // 引入reset.css
import '@/assets/css/common.css'
import config from '@/config'

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

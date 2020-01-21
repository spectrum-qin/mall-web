// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import QS from 'qs'
import Axios from 'axios'


import 'element-ui/lib/theme-chalk/index.css';
import '@/icons' // icon

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(Axios);
Vue.prototype.qs = QS;
Vue.prototype.axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



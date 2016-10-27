// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from './router';
import VueResource from 'Vue-resource';
// import MintUI from 'mint-ui'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

/* eslint-disable no-new */
Vue.use(VueRouter);
Vue.use(Vuex);

// http setings
Vue.use(VueResource);
Vue.http.options.root = 'https://api.douban.com/v2';
Vue.http.interceptors.push((request, next) => {
  // continue to next interceptor
  next((response) => {
  });
});
// Router
const router = new VueRouter({
  routes,
  base: '/',
});
router.afterEach((to, from, next) => {
  Indicator.close();
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});

export default Vue;

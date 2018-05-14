




import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'common/store';
import router from 'src/router.js';

import 'static/css/icon/iconfont.css';
import 'static/css/reset.css';
/*import Mock from './mock/mock';
Mock.mockData();*/

const app = new Vue({
	store,
  	router
}).$mount('#app')




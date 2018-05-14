
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



import store from 'common/store';
/*import {} from 'common/path';
import {} from 'common/consts';
import {} from 'common/public';*/

const login = r => require.ensure([], () => r(require('component/login')), 'login');
const phone = r => require.ensure([], () => r(require('view/Index/bizcomponent/phone')), 'phone');



const carousel = r => require.ensure([], () => r(require('view/Index/bizcomponent/carousel')), 'carousel');
const addCarousel = r => require.ensure([], () => r(require('view/Index/bizcomponent/addCarousel')), 'addCarousel');
const indexType = r => require.ensure([], () => r(require('view/Index/bizcomponent/indexType')), 'indexType');
const addIndexType = r => require.ensure([], () => r(require('view/Index/bizcomponent/addType')), 'addIndexType');

const product = r => require.ensure([], () => r(require('view/Product/bizcomponent/productList')), 'product');
const addProduct = r => require.ensure([], () => r(require('view/Product/bizcomponent/addProduct')), 'addProduct');
const company = r => require.ensure([], () => r(require('view/Message/bizcomponent/company')), 'company');
const addCompany = r => require.ensure([], () => r(require('view/Message/bizcomponent/addCompany')), 'addCompany');
const culture = r => require.ensure([], () => r(require('view/Message/bizcomponent/culture')), 'culture');
const addCulture = r => require.ensure([], () => r(require('view/Message/bizcomponent/addCulture')), 'addCulture');
const honor = r => require.ensure([], () => r(require('view/Message/bizcomponent/honor')), 'honor');
const addHonor = r => require.ensure([], () => r(require('view/Message/bizcomponent/addHonor')), 'addHonor');
const contact = r => require.ensure([], () => r(require('view/Message/bizcomponent/contact')), 'contact');
const addContact = r => require.ensure([], () => r(require('view/Message/bizcomponent/addContact')), 'addContact');
const news = r => require.ensure([], () => r(require('view/New/bizcomponent/news')), 'news');
const industry = r => require.ensure([], () => r(require('view/New/bizcomponent/industry')), 'industry');
const addNews = r => require.ensure([], () => r(require('view/New/bizcomponent/addNews')), 'addNews');
const infoNews = r => require.ensure([], () => r(require('view/New/bizcomponent/addNews')), 'infoNews');
const type = r => require.ensure([], () => r(require('view/Product/bizcomponent/type')), 'type');
const addType = r => require.ensure([], () => r(require('view/Product/bizcomponent/addType')), 'addType');
const leaving = r => require.ensure([], () => r(require('view/Message/bizcomponent/leaving')), 'leaving');
const infoLeaving = r => require.ensure([], () => r(require('view/Message/bizcomponent/infoLeaving')), 'infoLeaving');

const account = r => require.ensure([], () => r(require('view/Account/index/index')), 'account');
const addAccount = r => require.ensure([], () => r(require('view/Account/bizcomponent/addAccount')), 'addAccount');
const stick = r => require.ensure([], () => r(require('view/Stick/index/index')), 'stick');
const addStick = r => require.ensure([], () => r(require('view/Stick/bizcomponent/addStick')), 'addStick');
const comments = r => require.ensure([], () => r(require('view/Comment/index/index')), 'comments');
const commentDetail= r => require.ensure([], () => r(require('view/Comment/bizcomponent/detail')), 'detail');



import index from 'view/Index/index/index';




Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.debug = true;//开启错误提示


//router 配置
const routes = [
	{ 
		path: '/', 
		component: index,
		meta: { 
			title: "首页",
			AuthStatus: true,
		},
	},
	{ 
		path: '/carousel', 
		component: carousel,
		meta: { 
			title: "轮播图列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addCarousel/:id', 
		component: addCarousel,
		meta: { 
			title: "添加/编辑轮播图",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoCarousel/:id', 
		component: addCarousel,
		meta: { 
			title: "添加/编辑轮播图",
			AuthStatus: true,
		},
	},
	{ 
		path: '/indexType', 
		component: indexType,
		meta: { 
			title: "类型列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addIndexType/:id', 
		component: addIndexType,
		meta: { 
			title: "添加/编辑类型",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoIndexType/:id', 
		component: addIndexType,
		meta: { 
			title: "添加/编辑类型",
			AuthStatus: true,
		},
	},
	{ 
		path: '/type', 
		component: type,
		meta: { 
			title: "产品类型",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addType/:id', 
		component: addType,
		meta: { 
			title: "添加/编辑产品类型",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoType/:id', 
		component: addType,
		meta: { 
			title: "添加/编辑产品类型",
			AuthStatus: true,
		},
	},
	{ 
		path: '/leaving', 
		component: leaving,
		meta: { 
			title: "留言管理",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoLeaving/:id', 
		component: infoLeaving,
		meta: { 
			title: "查看留言",
			AuthStatus: true,
		},
	},
	{ 
		path: '/news', 
		component: news,
		meta: { 
			title: "新闻列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/industry', 
		component: industry,
		meta: { 
			title: "行业动态",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addNews/:id', 
		component: addNews,
		meta: { 
			title: "添加/编辑新闻",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoNews/:id', 
		component: addNews,
		meta: { 
			title: "查看新闻",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addProduct/:id', 
		component: addProduct,
		meta: { 
			title: "添加/编辑产品",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoProduct/:id', 
		component: addProduct,
		meta: { 
			title: "添加/编辑产品",
			AuthStatus: true,
		},
	},
	{ 
		path: '/product', 
		component: product,
		meta: { 
			title: "产品列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/account', 
		component: account,
		meta: { 
			title: "用户列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addAccount/:id', 
		component: addAccount,
		meta: { 
			title: "用户信息",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoAccount/:id', 
		component: addAccount,
		meta: { 
			title: "用户信息",
			AuthStatus: true,
		},
	},
	{ 
		path: '/stick', 
		component: stick,
		meta: { 
			title: "帖子列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addStick/:id', 
		component: addStick,
		meta: { 
			title: "帖子信息",
			AuthStatus: true,
		},
	},
	{ 
		path: '/infoStick/:id', 
		component: addStick,
		meta: { 
			title: "帖子信息",
			AuthStatus: true,
		},
	},
	{ 
		path: '/comments', 
		component: comments,
		meta: { 
			title: "评论列表",
			AuthStatus: true,
		},
	},
	{ 
		path: '/commentDetail/:id', 
		component: commentDetail,
		meta: { 
			title: "评论详情",
			AuthStatus: true,
		},
	},
	{ 
		path: '/company', 
		component: company,
		meta: { 
			title: "公司信息",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addCompany/:id', 
		component: addCompany,
		meta: { 
			title: "公司信息",
			AuthStatus: true,
		},
	},
	{ 
		path: '/culture', 
		component: culture,
		meta: { 
			title: "企业文化",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addCulture/:id', 
		component: addCulture,
		meta: { 
			title: "企业文化",
			AuthStatus: true,
		},
	},
	{ 
		path: '/honor', 
		component: honor,
		meta: { 
			title: "荣誉资质",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addHonor/:id', 
		component: addHonor,
		meta: { 
			title: "荣誉资质",
			AuthStatus: true,
		},
	},
	{ 
		path: '/contact', 
		component: contact,
		meta: { 
			title: "联系我们",
			AuthStatus: true,
		},
	},
	{ 
		path: '/addContact/:id', 
		component: addContact,
		meta: { 
			title: "联系我们",
			AuthStatus: true,
		},
	},
  	{
  		path: '/login', 
		component: login,
		meta: { 
			title: "登录",
			AuthStatus: false,
		},
  	},
  	{
  		path: '/phone', 
		component: phone,
		meta: { 
			title: "手机",
			AuthStatus: true,
		},
  	},
]



const router = new VueRouter({
  	routes, // （缩写）相当于 routes: routes
  	scrollBehavior (to, from, savedPosition) {
  	
	 	
	}
})


//标题设置   页面登录拦截
router.beforeEach((to, from, next) => {
	

	if((!store.state.TOKEN) || (store.state.TOKEN == undefined) || (store.state.TOKEN == '')) {
  		
  		next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
  		
  	}
  	
 	next()
  
})
//http请求拦截
// http request 拦截器
/*axios.interceptors.request.use(
config => {
    if (store.state.BASE_INFO) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${store.state.BASE_INFO}`;
    }
    return config;
},
err => {
    return Promise.reject(err);
});*/

// http response 拦截器
axios.interceptors.response.use(
response => {
	
	if (response.data) {
	
        switch (response.data.code) {
            case "3":
	           
                store.commit('INCREMENT', {
				  	TOKEN: ''
				})
                router.push({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
           	break;
           	case "2":
            	//Toast(response.data.msg);
            	this.$message({
		            type: 'warning',
		            message: response.data.msg
		        });
            	
            break;
            case "1":
            	
            break;
        }
    }
    return response;
},
error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
            	console.log('BASE_INFO失效');
                // 返回 401 清除BASE_INFO信息并跳转到登录页面
                store.commit('INCREMENT', {
				  	BASE_INFO: ''
				})
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

/*if(store.state.classification_first.length == 0){
	const _that = this;
	axios.post(api_classification_first)
	.then(function (response) {
		const data = response.data;
		if(data.success == 1000){
			
		}
		
	})
	.catch(function (error) {
		console.log(error);
	});
}*/











module.exports = router;



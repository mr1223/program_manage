<template>
	<div class="nav_left">
		<el-menu :default-active="activeIndex"
			background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#ffd04b"
			 class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="ISCOLLAPSE">
		  	<el-submenu  :index="tode.id" v-for="(tode,index) in navManage">
			    <template slot="title">
			      <i  :class="tode.icon"></i>
			      <span slot="title">{{tode.title}}</span>
			    </template>
			    <el-menu-item :index="tode.id + '-' + tod.id" @click="goNav(tode.id,tod.id)" v-for="(tod,indexs) in tode.group">{{tod.menu_team}}</el-menu-item>
		  	</el-submenu>
		</el-menu>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { NAVINDEX } from 'common/consts';
	import { local } from 'common/public';
	import { carousel,indexType,product,type,company,culture,honor,contact,news,industry,phone,leaving,account,stick,comments } from 'common/path';
	export default {
		data(){
			return {
				'isCollapse': false,
				'activeIndex': '',
				'navManage': [
					{
						'icon': 'el-icon-menu',
						'title': '用户管理',
						'id': "1",
						'group': [
							{
								'id': "1",
								'path': account,
								'menu_team': '用户列表',
							},
						]
					},
					{
						'icon': 'el-icon-tickets',
						'title': '首页管理',
						'id': "2",
						'group': [
							{
								'id': "1",
								'path': carousel,
								'menu_team': '轮播图列表',
							},
							{
								
								'id': "2",
								'path': indexType,
								'menu_team': '类型列表',
							},
						]
					},
					{
						'icon': 'el-icon-menu',
						'title': '产品管理',
						'id': "3",
						'group': [
							{
								'id': "1",
								'path': type,
								'menu_team': '产品类型',
							},
							{
								'id': "2",
								'path': product,
								'menu_team': '产品列表',
							},
						]
					},
					{
						'icon': 'el-icon-menu',
						'title': '帖子管理',
						'id': "4",
						'group': [
							{
								'id': "1",
								'path': stick,
								'menu_team': '帖子列表',
							},
						]
					},
					{
						'icon': 'el-icon-menu',
						'title': '评论管理',
						'id': "5",
						'group': [
							{
								'id': "1",
								'path': comments,
								'menu_team': '评论列表',
							},
						]
					},
					{
						'icon': 'el-icon-menu',
						'title': '新闻管理',
						'id': "7",
						'group': [
							{
								'id': "1",
								'path': news,
								'menu_team': '新闻列表',
							},
							{
								'id': "2",
								'path': industry,
								'menu_team': '行业动态',
							},
						]
					},
					{
						'icon': 'el-icon-menu',
						'title': '信息管理',
						'id': "7",
						'group': [
							{
								'id': "1",
								'path': company,
								'menu_team': '公司信息',
							},
							{
								'id': "2",
								'path': culture,
								'menu_team': '企业文化',
							},
							{
								'id': "3",
								'path': honor,
								'menu_team': '荣誉资质',
							},
							{
								'id': "4",
								'path': contact,
								'menu_team': '联系我们',
							},
							{
								'id': "5",
								'path': phone,
								'menu_team': '电话管理',
							},
							{
								'id': "6",
								'path': leaving,
								'menu_team': '留言管理',
							},
						]
					},
				]
			}
		},
		computed: {
			...mapState({
				ISCOLLAPSE: state => state.ISCOLLAPSE
			})
		},
		created(){
			this.activeIndex = local.get(NAVINDEX);
		},
		methods: {
			goNav(e,ev){
				this.activeIndex = e + '-' + ev;
				local.set(NAVINDEX,this.activeIndex);
				const route = this.navManage[e-1]['group'][ev-1]['path']; 
				this.$router.push({path: route });
			},
	      	handleOpen(key, keyPath) {
	      		
	      	},
	      	handleClose(key, keyPath) {
	        	
	      	}
	    }
	}
</script>

<style scoped>
	.nav_left {
		display:table-cell;
		position: relative;
		z-index: 1;
		/*position: absolute;
		top: 6.187rem;
		left: 0;
		z-index: 5;
		margin-top: 1px;
		width: 16.25rem;*/
		width: auto;
		height: 100%;
		min-height: 50rem;
		background: rgb(84, 92, 100);
	}
	.el-menu /deep/ {
		border-right: 0;
	}
	
</style>
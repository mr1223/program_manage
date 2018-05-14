<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">查看留言</h3>
			<div class="index_right">
				<div class="input-content">
					<label>ID:</label>
					<span class="input-html">{{list.id}}</span>
				</div>
				<div class="input-content">
					<label>名字:</label>
					<span class="input-html">{{list.name}}</span>
				</div>
				<div class="input-content">
					<label>电话:</label>
					<span class="input-html">{{list.tel}}</span>
				</div>
				<div class="input-content">
					<label>座机:</label>
					<span class="input-html">{{list.landline}}</span>
				</div>
				<div class="input-content">
					<label>提交时间:</label>
					<span class="input-html">{{list.creattime}}</span>
				</div>
				<div class="input-content">
					<label>内容:</label>
					<div class="input-html" v-html="list.content"></div>
				</div>
			</div>
		</el-content>
		<div id="con">
			
		</div>
	</div>
</template>

<script>
	import content from 'component/content';
	import { wind } from 'common/public';
	import { api_getLeaving } from 'common/path';
	export default {
		data(){
			return {
				'list': {}
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	const obj = {
  				'id': this.$route.params.id,
			}
	    	this.$http.post(api_getLeaving,wind.stringify(obj))
			.then(res => {
				const data = res.data;
				if( data.code == 1){
					this.list = data.info;
				}
			})
			.catch(function(error){
				
			})
	    },
		methods: {
			
		},
		components:{
			elContent: content,
		}
	}
</script>

<style scoped>
	.index_right {
		position: relative;
		margin-top: 20px;
		padding-top: 20px;
	}
    .input-content {
		margin-bottom: 40px;
		width: 100%;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
	.input-html {
		display: block;
		padding: 15px 20px;
		border: 1px #CCCCCC solid;
		border-radius: 4px;
	}
</style>
<template>
	<div class="index">
		<el-content>
			<el-title v-if="!id" :content="title"></el-title>
			<p v-if="id" @click="editCompany">编辑产品信息</p>
			<div class="index_right">
				<div class="right_content">
					<div class="iphone7_content">
						<img src="../../../static/image/iphone_7.png" />
					</div>
					<div class="content" v-html="data">
						
					</div>
				</div>
			</div>
		</el-content>
		<div id="con">
			
		</div>
	</div>
</template>

<script>
	import content from 'component/content';
	import title from 'component/title';
	import { dominImg,api_getCompany } from 'common/path';
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'data': null,
				'title': {
					'title': '新增产品信息',
					'path': '/addCompany/-1'
				}
			}
		},
		computed: {
	     
	    },
	    created(){
	    	this.$http.get(api_getCompany)
			.then(res => {
				const data = res.data;
				if(data.info && data.info.id){
					this.id = data.info.id;
					this.data = wind.clearLink(setRegexpLink,data.info.content,dominImg);
				}
			})
			.catch(function(error){
				
			})
	    },
		methods: {
      		editCompany(){
      			this.$router.push({path: '/addCompany/'+this.id});
      		}
		},
		components:{
			elContent: content,
			elTitle: title,
		}
		
	}
</script>

<style scoped>
	.index_right {
		position: relative;
		margin-top: 20px;
		height: 888px;
	}
	.editCompany {
		float: right;
	}
	.right_content {
		position: relative;
		margin: 0 auto;
		width: 450px;
	}
	.iphone7_content {
		position: absolute;
		top: 0;
		left: 0;
		width: 435px;
    	height: 888px;
	}
    .iphone7_content img {
    	width: 100%;
    }
    .content {
    	position: relative;
    	top: 113px;
		left: 33px;
    	width: 369px;
    	height: 662px;
    	overflow: hidden;
		overflow-y: scroll;
    }
    .content /deep/ img {
    	max-width: 100%;
    }
</style>
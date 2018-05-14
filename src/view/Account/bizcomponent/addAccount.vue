<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">新增/编辑用户</h3>
			<div class="index_right">
				<div class="input-content">
					<label>昵称： </label>
					<div>
						{{data.nickname}}
					</div>
				</div>
				<div class="input-content">
					<label>openID： </label>
					<div>
						{{data.openid}}
					</div>
				</div>
				<div class="input-content">
					<label>图像： </label>
					<div>
						<img :src="data.avatarurl" />
					</div>
				</div>
				<div v-if="data.country" class="input-content">
					<label>国家： </label>
					<div>
						{{data.country}}
					</div>
				</div>
				<el-title :list="list"></el-title>
            	<div class="btn" v-if="!status">
                	<el-button @click="save" type="primary">保存</el-button>
                </div>
			</div>
		</el-content>
		<div id="con">
			
		</div>
	</div>
</template>

<script>
	import content from 'component/content';
	import edit from 'component/edit';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { api_getAccount,api_changeAccount } from 'common/path';
	import { regexpLink,setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'data': {},
				'list': {
					'data': [
						{
							'title': '电话：',
							'val': '',
							'place': '请输入昵称',
							'type': 'text',
							'status': false,
						},
						{
							'title': '邮箱：',
							'val': '',
							'place': '请输入邮箱',
							'type': 'text',
							'status': false,
						},
					]
				},
				'status': false,
				'routePath': '/Account',
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	
	    	const re = /^\/infoAccount/;
	    	if(re.test(this.$route.path)){
	    		this.status = true;
	    		this.list.data.forEach(function(element){
	    			element['status'] = true;
	    		})
	    	}
	   		
	    	const obj = {
  				'id': this.$route.params.id,
			}
	    	this.$http.post(api_getAccount,wind.stringify(obj))
			.then(res => {
				const data = res.data.info;
				this.data = data;
				this.list.data[0]['val'] = data.phone;
				this.list.data[1]['val'] = data.email;
				
			})
			.catch(function(error){
				
			})
	    },
		methods: {
      		save(){
      			const obj = {
      				'id': this.$route.params.id,
      				'phone': this.list.data[0]['val'],
      				'email': this.list.data[1]['val'],
				}
				this.$http.post(api_changeAccount,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			
		    			this.$router.push({path: this.routePath});
		    		}
				})
				.catch(function(error){
					
				})
      		}
		},
		components:{
			elContent: content,
			edit,
			elTitle: title,
		}
	}
</script>

<style scoped>
	.index_right {
		position: relative;
		margin-top: 20px;
		padding-top: 20px;
	}
	/deep/ .quill-editor{
		height: 600px;
	}
  	/deep/ .ql-container{
  		height: 500px;
  	}
    .editStyle .ql-formats {
    	background: none;
	    border: none;
	    cursor: pointer;
	    display: inline-block;
	    float: left;
	    height: 24px;
	    padding: 3px 5px;
	    width: 28px;
    }
    .btn {
    	margin-top: 2rem;
    }
    .input-content {
		margin-bottom: 10px;
		width: 100%;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
	.input-content img {
		width: 10rem;
		height: 10rem;
	}
</style>
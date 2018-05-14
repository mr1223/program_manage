<template>
	<div class="index">
		<el-content>
			<h3 @click="addCompany" class="addCarousel">新增/编辑电话</h3>
			<div class="index_right">
				<div class="input-content">
					<el-input v-model="phone" :disabled="status" placeholder="请输入内容"></el-input>
				</div>
				<label @click="save">{{edit}}</label>
			</div>
		</el-content>
		
	</div>
</template>

<script>
	import content from 'component/content';
	import { api_getPhone,api_addPhone } from 'common/path';
	import { wind } from 'common/public';
	
	export default {
		data(){
			return {
				'phone': '',
				'edit': '编辑',
				'status': true,
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	this.$http.get(api_getPhone)
			.then(res => {
				const data = res.data;
		
				if(data.code == 1){
					
					this.phone = data.info.phone;
				}
			})
			.catch(function(error){
				
			})
	    },
		methods: {
			addCompany(){
				
			},
			save(){
				if(this.status){
					this.status = false;
					this.edit = '保存';
					return;
				}
				
				
				//,wind.stringify(obj)
			 	const obj = {
	      			'phone': this.phone,
				}
		    	this.$http.post(api_addPhone,wind.stringify(obj))
				.then(res => {
					const data = res.data;
				
					if(data.code == 1){
						this.$message({
				            type: 'success',
				            message: '修改成功!'
				        });
						this.status = true;
						this.edit = '编辑';
					}else{
						this.$message({
				            type: 'error',
				            message: '修改失败!'
				        });
					}
				})
				.catch(err => {
					this.$message({
			            type: 'warning',
			            message: '服务器问题，修改失败!'
			        });
				})
				
			}
      		
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
		height: 888px;
		text-align: center;
	}
	.input-content {
		float: left;
		width: 15rem;
	}
	.index_right label {
		float: left;
		width: 6rem;
		height: 40px;
		line-height: 40px;
		color: #7cb4f1;
		cursor: pointer;
	}
	
</style>
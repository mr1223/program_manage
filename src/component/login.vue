<template>
	<div class="login_back">
		<div class="login_back_con">
			<div class="input-content">
			    <label>用户名</label>
			    <div class="input-btn">
			    	<el-input v-model="name" placeholder="请输入用户名"></el-input>
			    </div>
			    <div style="clear: both;"></div>
			</div>
			<div class="input-content">
			    <label>密码&nbsp;&nbsp;&nbsp;</label>
			    <div class="input-btn">
			    	<el-input type="password" v-model="psw" placeholder="请输入密码" auto-complete="off"></el-input>
			    </div>
			    <div style="clear: both;"></div>
			</div>
			<!--<div class="input-content">
			    <span class="input-group-addon" id="sizing-addon2">验证码</span>
			    <div class="input-btn">
			    	<el-input v-model="code" placeholder="请输入验证码"></el-input>
			    </div>
			</div>
			<div class="input-group conpad">
				<span>验证码:</span>
				<img title="换一张" @click="saveCode(this)" :src="imgsrc" />
			</div>-->
			<div class="conpad">
				<el-button class="conpadInt" @click="subBtn()" type="primary">保存</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { api_login } from 'common/path';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'name': '',
				'psw': '',
				'imgsrc': 'Public/verify',
				'code': ''
			}
		},
		created(){
			/*var cookieKey = cookie.get(Key);
				if(cookieKey){
					var data = {
						'url': newIndex,
					}
					wind.open(data);
				}*/
		},
		props:{
			
		},
		methods: {
			'saveCode': function(ev){
				this.imgsrc = Admin + 'Public/verify?time=' + Math.random();
			},
			'subBtn'(){
				if(this.name == ''){
					this.$message({
		              	type: 'warning',
		              	message: '用户名为空'
		            })
					
				}else
				if(this.psw == ''){
					this.$message({
		              	type: 'warning',
		              	message: '密码为空'
		            })
					
				}else{
					const obj = {
	      				'username': this.name,
	      				'password': this.psw,
					}
					this.$http.post(api_login,wind.stringify(obj))
					.then(res => {
						const data = res.data;
						
			    		if(data.code == 1){
			    			//this.$store.dispatch('setLOGININ',true);
			    			this.$store.dispatch('setToken',data.info.token);
			    			this.$router.push(this.$route.query.redirect || '/');
			    		}
					})
					.catch(function(error){
						
					})
					/*$.ajax({
						type: "post",
						xhrFields: {
		                    withCredentials: true
		        		},
			            url: Admin + 'public/logo',
			            data:{
			            	name: this.name,
			            	psw: this.psw,
			            },
			            success: function(data){
			            	if(data.code == 1){
			            		
			            		cookie.set(Key,data.data.key,1,domin,'/');
			            		var data = {
									'url': newIndex,
								}
								wind.open(data);
			            	}else{
			            		alert(data.data);
			            	}
		                	       
			         	}
					})*/
				}
			}
		}
	}
</script>

<style scoped>

	.login_back {
		position: relative;
		width: 100%;
		height: 100%;
		background: url(../static/image/139-150604162F5.jpg);
	}
	.login_back_con {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 24rem;
		height: 200px;
		margin: auto;
	}
	.conpad {
		margin-top: 20px;
	}
	.input-content {
		margin-bottom: 30px;
	}
	.input-content label {
		float: left;
		width: 4rem;
		height: 40px;
		line-height: 40px;
		font-weight: 600;
		color: #fff;
	}
	.input-btn {
		float: left;
		width: 20rem;
	}
	.conpadInt  {
		margin-left: 4rem;
	}
</style>
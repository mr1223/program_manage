<template>
	<div class="header">
		<span class="logo">
			<!--<img :src="logo" />-->
		</span>
		<div class="user">
			<span class="user_img">
				<img :src="admin" />
			</span>
			<span class="user_admin">admin</span>
			<div style="clear: both;"></div>
			<ul class="user_content">
				<!--<li>
					<a>修改资料</a>
				</li>-->
				<li @click="loginout">
					<a>退出</a>
				</li>
			</ul>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import { api_loginout } from 'common/path';
	import { wind,local } from 'common/public';
	import { TOKEN } from 'common/consts';
	
	export default {
		data(){
			return {
				'logo': require('../../src/static/image/logo.jpg'),
				'admin': require('../../src/static/image/admin.png'),
			}
		},
		methods: {
			loginout(){
				const obj = {
					'token': local.get(TOKEN)
				}
				this.$http.post(api_loginout,wind.stringify(obj))
				.then(res => {
					
					const data = res.data;
					if(data.code == 1){
						this.$message({
							type: 'success',
					        message: '退出成功!'
						})
						this.$store.dispatch('setToken','');
						this.$router.push({path: '/login'});
					}else{
						this.$message({
							type: 'warning',
					        message: '退出失败，请稍候重试!'
						})
					}
					
				})
				.catch(() =>{
					this.$message({
						type: 'warning',
				        message: '因网络原因退出失败，请稍候重试!'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.header {
		height: 4.78rem;
		margin-bottom: 0.1rem;
		padding: 0.7rem 2rem;
		background: rgb(84, 92, 100);
	}
	.logo {
		float: left;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.logo img {
		width: 100%;
	}
	.user {
		float: right;
		color: #fff;
		cursor: pointer;
	}
	.user:hover .user_content {
		display: block;
	}
	.user_img {
		float: left;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}
	.user_img img {
		width: 100%;
	}
	.user_admin {
		float: left;
		margin-left: 0.5rem;
		margin-top: 0.5rem;
	}
	.user_content {
		display: none;
		width: 100%;
		text-align: right;
	}
	.user_content a {
		
	}
</style>
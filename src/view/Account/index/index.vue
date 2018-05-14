<template>
	<div class="index">
		<el-content>
			<el-title :content="title">
				<div class="input-content">
					<el-input @blur="getSearch" class="search" v-model="searchWord" prefix-icon="el-icon-search" placeholder="请输入手机号或是用户名"></el-input>
				</div>
			</el-title>
			<div class="index_right">
				
				<el-table :table="table">
					<tr class="table_content_tr" v-for="(tode,index) in table.body">
						<td>
							{{tode.id}}
						</td>
						<td>
							{{tode.openid}}
						</td>
						<td>
							{{tode.nickname}}
						</td>
						<td>
							<img :src="tode.avatarurl" />
						</td>
						<td>
							<el-button @click="look(tode.id)" type="primary">查看</el-button>
							<el-button @click="edit(tode.id)" type="warning">编辑</el-button>
							<el-button @click="showHide(tode.id,tode.status,index)" type="success">{{tode.message}}</el-button>
							<el-button @click="del(tode.id,index)" type="danger">删除</el-button>
						</td>
					</tr>
				</el-table>
				<div class="page">
					<el-pagination
					  background
					  layout="prev, pager, next"
					  @current-change = "handleCurrentChange"
					  :total="count">
					</el-pagination>
				</div>
			</div>
		</el-content>
		<div id="con">
			
		</div>
	</div>
</template>

<script>
	import content from 'component/content';
	import table from 'component/table';
	import title from 'component/title';
	import { dominImg,api_account,addAccount,api_changeAccount,api_seatchAccount} from 'common/path';
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'searchWord': '',
				'data': null,
				'page': 1,
				'num': 10,
				'count':10,
				'table': {
					'head': [
						{
							'name': 'ID',
							'width': '7%',
						},
						{
							'name': 'openId',
							'width': '20%',
						},
						{
							'name': '昵称',
							'width': '18%',
						},
						{
							'name': '图像',
							'width': '15%',
						},
						{
							'name': '操作',
							'width': '40%',
						},
					],
					'body': []
				},
				'title': {
					'title': '新增用户',
					'path': '/addAccount/-1',
				}
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	this.getList();
	    },
		methods: {
			handleCurrentChange(){
				
			},
			getSearch(){
				this.page = 1;
				this.getList();
			},
			getList(){
				const obj = {
	      			'page': this.page,
	      			'num': this.num,
	      			'search': this.searchWord
				}
		    	this.$http.post(api_account,wind.stringify(obj))
				.then(res => {
					const data = res.data;
					
					if(data.info.length > 0){
						var getData = data.info;
						getData.forEach(function(element){
							
							element['avatarurl'] = wind.clearLink(setRegexpLink,element['avatarurl'],dominImg);
							if(element['status'] == 1){
								element['message'] = '禁用';
							}else{
								element['message'] = '启用';
							}
							
						})
						this.count = parseInt(data.count);
						this.table.body = getData;
						this.page++;
						/*this.id = data.data.id;
						this.data = wind.clearLink(setRegexpLink,data.data.content,dominImg);*/
					}
				})
				.catch(function(error){
					
				})
			},
      		look(e){
      			this.$router.push({path: '/infoAccount/' + e});
      		},
      		edit(e){
      			this.$router.push({path: '/addAccount/' + e});
      		},
      		showHide(e,ev,el){
      			var status = '';
      			var message = ''; 
      			const info = this.table.body[el];
      			ev == 1 ? status = -1: status = 1;
      			
      			if(ev == 1){
					message = '禁用';
				}else{
					message = '启用';
				}
      			//api_showHideNew
      			this.$confirm('是否' + message + '?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
			        const obj = {
		      			'id': e,
		      			'status': status
					}
			    	this.$http.post(api_changeAccount,wind.stringify(obj))
					.then(res => {
						const data = res.data;
					
						if(data.code == 1){
							info['status'] = status;
							this.$message({
					            type: 'success',
					            message: '状态更新成功!'
					        });
							if(status == 1){
								info['message'] = '禁用';
								
							}else{
								info['message'] = '启用';
							}
							this.table.body[el] = info;
							
						}else{
							this.$message({
					            type: 'error',
					            message: '状态更新失败!'
					        });
						}
					})
					.catch(err => {
						this.$message({
				            type: 'warning',
				            message: '服务器问题，状态更新失败!'
				        });
					})
			        
			        
			        
		        }).catch(err => {
		          	this.$message({
			            type: 'warning',
			            message: '取消操作！'
			        });         
		        });
      		},
      		del(e,el){
      			this.$confirm('是否删除?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
			        const obj = {
		      			'id': e,
		      			'del': -1,
					}
			    	this.$http.post(api_changeAccount,wind.stringify(obj))
					.then(res => {
						const data = res.data;
					
						if(data.code == 1){
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
							this.table.body.splice(el,1);
							
						}else{
							this.$message({
					            type: 'error',
					            message: '删除失败!'
					        });
						}
					})
					.catch(err => {
						this.$message({
				            type: 'warning',
				            message: '服务器问题，删除失败!'
				        });
					})
			        
			        
			        
		        }).catch(err => {
		          	this.$message({
			            type: 'warning',
			            message: '取消操作！'
			        });         
		        });
      		},
		},
		components:{
			elContent: content,
			elTable: table,
			elTitle: title,
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
    .content img {
    	width: 100%;
    }
    .table_content_tr a {
    	cursor: pointer;
    }
    .input-content {
    	float: right;
    	display: inline-block;
    }
</style>
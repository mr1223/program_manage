<template>
	<div class="index">
		<el-content>
			<el-title :content="title"></el-title>
			<div class="index_right">
				
				<el-table :table="table">
					<tr class="table_content_tr" v-for="(tode,index) in table.body">
						<td>
							{{tode.id}}
						</td>
						<td>
							{{tode.title}}
						</td>
						<td>
							<img :src="tode.cover" />
						</td>
						<td>
							{{tode.author}}
						</td>
						<td>
							<el-button @click="look(tode.id)" type="primary">查看</el-button>
							<el-button @click="edit(tode.id)" type="warning">编辑</el-button>
							<el-button @click="showHide(tode.id,tode.show,index)" type="success">{{tode.message}}</el-button>
							<el-button @click="del(tode.id,index)" type="danger">删除</el-button>
						</td>
					</tr>
				</el-table>
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
	import { dominImg,api_getCompany,api_getNewsList,api_showHideNew,api_removeNew } from 'common/path';
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'data': null,
				'table': {
					'head': [
						{
							'name': 'ID',
							'width': '7%',
						},
						{
							'name': '标题',
							'width': '20%',
						},
						{
							'name': '封面图',
							'width': '18%',
						},
						{
							'name': '作者',
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
					'title': '新增新闻',
					'path': '/addNews/-1?type=1',
				}
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	const obj = {
      			'type': 1,
			}
	    	this.$http.post(api_getNewsList,wind.stringify(obj))
			.then(res => {
				const data = res.data;
				
				if(data.info.length > 0){
					var getData = data.info;
					getData.forEach(function(element){
						element['cover'] = wind.clearLink(setRegexpLink,element['cover'],dominImg);
						element['content'] = wind.clearLink(setRegexpLink,element['content'],dominImg);
						if(element['show'] == 1){
							element['message'] = '隐藏';
						}else{
							element['message'] = '显示';
						}
					})
					this.table.body = getData;
					/*this.id = data.data.id;
					this.data = wind.clearLink(setRegexpLink,data.data.content,dominImg);*/
				}
			})
			.catch(function(error){
				
			})
	    },
		methods: {
      		look(e){
      			this.$router.push({path: '/infoNews/' + e,query:{type: 1}});
      		},
      		edit(e){
      			this.$router.push({path: '/addNews/' + e,query:{type: 1}});
      		},
      		showHide(e,ev,el){
      			var show = '';
      			var message = ''; 
      			const info = this.table.body[el];
      			ev == 1 ? show = -1: show = 1;
      			
      			if(ev == 1){
					message = '隐藏';
				}else{
					message = '显示';
				}
      			//api_showHideNew
      			this.$confirm('是否' + message + '?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
			        const obj = {
		      			'id': e,
		      			'show': show
					}
			    	this.$http.post(api_showHideNew,wind.stringify(obj))
					.then(res => {
						const data = res.data;
					
						if(data.code == 1){
							info['show'] = show;
							this.$message({
					            type: 'success',
					            message: '状态更新成功!'
					        });
							if(show == 1){
								info['message'] = '隐藏';
								
							}else{
								info['message'] = '显示';
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
					}
			    	this.$http.post(api_removeNew,wind.stringify(obj))
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
</style>
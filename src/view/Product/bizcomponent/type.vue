<template>
	<div class="type">
		<el-content>
			<el-title :content="title"></el-title>
			<div class="index_right">
				<el-table :table="table">
					<tr class="table_content_tr" v-for="(tode,index) in table.body">
						<td>
							{{tode.id}}
						</td>
						<td>
							{{tode.name}}
						</td>
						<td>
							{{tode.creattime}}
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
	</div>
</template>

<script>
	import content from 'component/content';
	import table from 'component/table';
	import title from 'component/title';
	import { wind } from 'common/public';
	import { dominImg,api_getTypeList,api_showHideType,api_removeType } from 'common/path';
	export default {
		data(){
			return {
				'table': {
					'head': [
						{
							'name': 'ID',
							'width': '7%',
						},
						{
							'name': '类型名称',
							'width': '15%',
						},
						{
							'name': '创建时间',
							'width': '28%',
						},
						{
							'name': '操作',
							'width': '40%',
						},
					],
					'body': []
				},
				'title':{
					'title': '添加产品类型',
					'path': '/addType/-1',
				}
			}
		},
		created(){
	    
	    	this.$http.get(api_getTypeList)
			.then(res => {
				const data = res.data;
				
				if(data.info.length > 0){
					var getData = data.info;
					getData.forEach(function(element){
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
      			this.$router.push({path: '/infoType/' + e});
      		},
      		edit(e){
      			this.$router.push({path: '/addType/' + e});
      		},
      		showHide(e,ev,el){
      			
      			var show = '';
      			var message = '';
      			const info = this.table.body[el];
      			ev == 1 ? show = -1: show = 1;
      			info['show'] = show;
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
			    	this.$http.post(api_showHideType,wind.stringify(obj))
					.then(res => {
						const data = res.data;
					
						if(data.code == 1){
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
			        
			        
			        
		        })
		        .catch(err => {
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
			    	this.$http.post(api_removeType,wind.stringify(obj))
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
			        
			        
			        
		        })
		        .catch(() => {
		          	this.$message({
			            type: 'warning',
			            message: '取消操作！'
			        });         
		        });
      		},
		},
		components: {
			elContent: content,
			elTable: table,
			elTitle: title,
		}
	}
</script>

<style scoped>
	.index_right {
		text-align: center;
		padding: 1rem 0;
	}
	.table_content_tr a {
		cursor: pointer;
	}
</style>
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
							{{tode.name}}
						</td>
						<td>
							{{tode.sort}}
						</td>
						<td>
							{{tode.create_time}}
						</td>
						<td class="image">
							<img :src="tode.image" />
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
	</div>
</template>

<script>

	import content from 'component/content';
	import table from 'component/table';
	import title from 'component/title';
	import { dominImg,api_AssortIndex,api_changeAssort } from 'common/path';
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'count': 10,
				'page': 1,
				'table': {
					'head': [
						{
							'name': 'ID',
							'width': '7%',
						},
						{
							'name': '名字',
							'width': '15%',
						},
						{
							'name': '排序',
							'width': '7%',
						},
						{
							'name': '创建时间',
							'width': '11%',
						},
						{
							'name': '图标',
							'width': '20%',
						},
						{
							'name': '操作',
							'width': '40%',
						},
					],
					'body': []
				},
				'title': {
					'title': '添加类型',
					'path': '/addIndexType/-1'
				}
			}
		},
		computed: {},
        created(){
        	this.getList();
        },
		mounted(){},
		methods: {
			handleCurrentChange(e){
				this.page = e;
				this.getList();
			},
			getList(){
				const obj = {
					'page': this.page,
					'num': 10,
				}
				this.$http.post(api_AssortIndex,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			var getData = data.info;
		    			
		    			getData.forEach(function(element){
		    				element['image'] = wind.clearLink(setRegexpLink,element['image'],dominImg);
		    				if(element['status'] == 1){
								element['message'] = '隐藏';
							}else{
								element['message'] = '显示';
							}
		    			})
		    			
		    			this.count = parseInt(data.count);
		    			this.table.body = getData;
		    		}
				})
				.catch(function(error){
					
				})
			},
			look(e){
      			this.$router.push({path: '/infoIndexType/' + e});
      		},
      		edit(e){
      			this.$router.push({path: '/addIndexType/' + e});
      		},
      		showHide(e,ev,el){
      			var status = '';
      			var message = '';
      			const info = this.table.body[el];
      			ev == 1 ? status = -1: status = 1;
      			info['status'] = status;
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
		      			'status': status,
					}
			    	this.$http.post(api_changeAssort,wind.stringify(obj))
					.then(res => {
						const data = res.data;
					
						if(data.code == 1){
							this.$message({
					            type: 'success',
					            message: '状态更新成功!'
					        });
							if(status == 1){
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
		      			'del': -1,
					}
			    	this.$http.post(api_changeAssort,wind.stringify(obj))
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
		},
		watch: {}
	}
</script>

<style scoped>
	.index_right {
		padding: 1rem 0;
		text-align: center;
	}
	.addCarousel {
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		color: #000;
	}
	.table_content_tr a {
		cursor: pointer;
	}
	.table_content_tr .image img {
		max-width: 4rem;
		max-height: 4rem;
	}
	.page {
		text-align: left;
		margin-top: 1rem;
	}
</style>
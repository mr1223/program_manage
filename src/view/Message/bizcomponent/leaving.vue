<template>
	<div class="index">
		<el-content>
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
							{{tode.tel}}
						</td>
						<td>
							{{tode.landline}}
						</td>
						<td>
							{{tode.creattime}}
						</td>
						<td>
							<a @click="look(tode.id)">查看</a>
							<a @click="del(tode.id,index)">删除</a>
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
	import { wind } from 'common/public';
	import { api_getLeavingList,api_removeLeaving } from 'common/path';
	export default {
		data(){
			return {
				'id': '',
				'data': null,
				'table': {
					'head': [
						{
							'name': 'ID',
							'width': '5%',
						},
						{
							'name': '名字',
							'width': '10%',
						},
						{
							'name': '电话',
							'width': '15%',
						},
						{
							'name': '座机',
							'width': '10%',
						},
						{
							'name': '提交时间',
							'width': '30%',
						},
						{
							'name': '操作',
							'width': '30%',
						},
					],
					'body': [
						{}
					]
				},
				
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	this.$http.get(api_getLeavingList)
			.then(res => {
				const data = res.data;
				if(data.info.length > 0){
					var getData = data.info;
					this.table.body = getData;
				}
			})
			.catch(function(error){
				
			})
	    },
		methods: {
      		look(e){
      			this.$router.push({path: '/infoLeaving/' + e});
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
			    	this.$http.post(api_removeLeaving,wind.stringify(obj))
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
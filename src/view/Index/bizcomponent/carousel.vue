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
							<img :src="tode.image_src" />
						</td>
						<td>
							{{tode.image_src}}
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
	import { dominImg,api_getCarouselList,api_showhideCarousel,api_removeCarousel } from 'common/path';
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
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
							'name': '标题',
							'width': '10%',
						},
						{
							'name': '图像',
							'width': '18%',
						},
						{
							'name': '链接',
							'width': '25%',
						},
						{
							'name': '操作',
							'width': '40%',
						},
					],
					'body': []
				},
				'title': {
					'title': '添加轮播图',
					'path': '/addCarousel/-1'
				}
			}
		},
		computed: {},
        created(){
        	this.getList();
        },
		mounted(){},
		methods: {
			getList(){
				this.$http.get(api_getCarouselList)
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			var getData = data.info;
		    			getData.forEach(function(element){
		    				element['image_src'] = wind.clearLink(setRegexpLink,element['image_src'],dominImg);
		    				if(element['show'] == 1){
								element['message'] = '隐藏';
							}else{
								element['message'] = '显示';
							}
		    			})
		    			this.table.body = getData;
		    		}
				})
				.catch(function(error){
					
				})
			},
			look(e){
      			this.$router.push({path: '/infoCarousel/' + e});
      		},
      		edit(e){
      			this.$router.push({path: '/addCarousel/' + e});
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
			    	this.$http.post(api_showhideCarousel,wind.stringify(obj))
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
			    	this.$http.post(api_removeCarousel,wind.stringify(obj))
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
</style>
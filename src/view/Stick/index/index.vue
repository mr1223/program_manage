<template>
	<div class="index">
		<el-content>
			<el-title :content="title">
				<div class="setUp">
					<div class="setUp-content">
						<label>浏览量：</label>
						<el-select v-model="bar" placeholder="请选择">
						    <el-option
						      v-for="item in option"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
						<!--<i class="iconfont icon-yanjing bar"></i>
						<span>^</span>
						<span></span>-->
					</div>
					<div class="setUp-content">
						<label>身份类型：</label>
						<el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</div>
					<div class="setUp-content">
						<label>时间：</label>
					    <el-date-picker
					      v-model="value7"
					      type="daterange"
					      align="right"
					      format="yyyy-MM-dd"
					      value-format="yyyy-MM-dd"
					      unlink-panels
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期"
					      :picker-options="pickerOptions2">
					    </el-date-picker>
						<!--end-->
					</div>
					<div class="setUp-content">
						<label>搜索：</label>
						<el-input @blur="getSearch" class="search" v-model="input" prefix-icon="el-icon-search" placeholder="请输入要搜索的标题"></el-input>
					</div>
					<div class="setUp-content">
						<label>类型：</label>
						<el-select v-model="type" placeholder="请选择">
						    <el-option
						      v-for="item in listType"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</div>
				</div>
				
			</el-title>
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
							{{tode.name}}
						</td>
						<td>
							{{tode.utype}}
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
	import { dominImg,api_stick,api_changeStick,api_AssortIndex} from 'common/path';
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'sendData': {
					'page': 1,
					'num': 10,
					'type': 1,
					'method': '',
	      			'desc': '',
	      			'starttime': '',
	      			'endtime': '',
	      			'tid': '',
	      			'search': '',
				},
				'count': 10,
				'data': null,
				'input': '',
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
							'name': '作者',
							'width': '18%',
						},
						{
							'name': '身份类型',
							'width': '15%',
						},
						{
							'name': '操作',
							'width': '40%',
						},
					],
					'body': []
				},
				'bar': 0,
				'option': [
					{
						'id': 0,
						'name': '请选择'
					},
					{
						'id': 1,
						'name': '浏览量由高到低'
					},
					{
						'id': 2,
						'name': '浏览量由低到高'
					}
				],
				'value': 1,
				'options': [
					{
						'id': 1,
						'name': '全部用户'
					},
					{
						'id': 2,
						'name': '前台用户'
					},
					{
						'id': 3,
						'name': '后台用户'
					}
				],
				'type': 0,
				'listType': [
					
				],
				pickerOptions2: {
		          	shortcuts: [{
			            text: '最近一周',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			              picker.$emit('pick', [start, end]);
			            }
		          	}, 
		          	{
			            text: '最近一个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			              picker.$emit('pick', [start, end]);
			            }
			        }, 
			        {
			            text: '最近三个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			              picker.$emit('pick', [start, end]);
			            }
		          	}]
		        },
		        value7: '',
				'title': {
					'title': '添加帖子',
					'path': '/addStick/-1',
				}
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	const obj = {
      			'page': this.sendData.page,
      			'num': this.sendData.num,
      			'type': this.sendData.type
			}
	    	this.getList(obj);
	    	this.getType();
	    },
		methods: {
			getType(){
				const obj = {
					'page': 1,
					'num': 100,
				}
				this.$http.post(api_AssortIndex,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			var getData = data.info;
		    			var first = {
		    				'id': 0,
							'name': '请选择'		    			
		    			}
		    			getData.unshift(first);
		    			this.listType = getData;
		    		}
				})
				.catch(function(error){
					
				})
			},
			handleCurrentChange(e){
				this.sendData.page = e;
				this.setUpCondition();
			},
			setUpCondition(e){
				this.getList(this.sendData);
			},
			getList(obj){
				this.$http.post(api_stick,wind.stringify(obj))
				.then(res => {
					const data = res.data;
					
					if(data.info.length > 0){
						var getData = data.info;
						getData.forEach(function(element){
							
							element['image'] = wind.clearLink(setRegexpLink,element['image'],dominImg);
							element['content'] = wind.clearLink(setRegexpLink,element['content'],dominImg);
							if(element['status'] == 1){
								element['message'] = '禁用';
							}else{
								console.log('status  '+element['status']);
								element['message'] = '启用';
							}
							if(element['utype'] == 1){
								element['name'] = element['nickname'];
								element['utype'] = '前台用户'; 
							}else{
								element['name'] = element['username'];
								element['utype'] = '后台用户'; 
							}
							
						})
						this.count = parseInt(data.count);
						this.table.body = getData;
						this.sendData.page++;
						/*this.id = data.data.id;
						this.data = wind.clearLink(setRegexpLink,data.data.content,dominImg);*/
					}
				})
				.catch(function(error){
					
				})
			},
      		look(e){
      			this.$router.push({path: '/infoStick/' + e});
      		},
      		edit(e){
      			this.$router.push({path: '/addStick/' + e});
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
			    	this.$http.post(api_changeStick,wind.stringify(obj))
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
			    	this.$http.post(api_changeStick,wind.stringify(obj))
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
      		getSearch(){
      			this.sendData.page = 1;
      			this.sendData.search = this.input;
      			this.setUpCondition();
      		}
		},
		watch: {
			'value'(val,oldval){
				this.sendData.page = 1;
				if(val != 0){
					this.sendData.type = val;
				}else{
					this.sendData.type = '';
				}
				this.setUpCondition();
			},
			'bar'(val,oldval){
				this.sendData.page = 1;
				if(val != 0){
					var desc = '';
					var method = 'count';
					if(val == 2){
						desc = 'asc';
					}else{
						desc = 'desc';
					}
					this.sendData.method = method;
					this.sendData.desc = desc;
				}else{
					this.sendData.method = '';
					this.sendData.desc = '';
				}
				this.setUpCondition();
			},
			'value7'(val,oldval){
				this.sendData.page = 1;
				if(val){
					this.sendData.starttime = val[0];
					this.sendData.endtime = val[1];
				}else{
					this.sendData.starttime = '';
					this.sendData.endtime = '';
				}
				this.setUpCondition();
			},
			'type'(val,oldval){
				this.sendData.page = 1;
				if(val != 0){
					this.sendData.tid = val;
				}else{
					this.sendData.tid = '';
				}
				this.setUpCondition();
			}
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
    .setUp {
    	display: inline-block;
    }
    .setUp-content label {
    	display: block;
    	margin-bottom: 0.5rem;
    }
    .setUp-content {
    	display: inline-block;
    	margin-bottom: 1rem;
    	margin-right: 1rem;
    }
    .setUp-content span {
    	cursor: pointer;
    }
    .bar {
    	color: #ca2c47;
    }
  
</style>
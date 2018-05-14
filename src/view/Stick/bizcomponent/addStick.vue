<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">新增/编辑帖子</h3>
			<div class="index_right">
				
				<el-title :list="title"></el-title>
				<div class="input-content">
					<label>摘要： </label>
					<div>
						<el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="data.abstract">
						</el-input>
					</div>
				</div>
				<div class="stick-content">
					<div class="input-content">
						<label>类型： </label>
						<div>
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
					<div class="input-content">
						<label>作者： </label>
						<el-select :disabled="authStatus" v-model="authVal" placeholder="请选择">
						    <el-option
						      v-for="item in auther"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
						<!--<div class="input-list">
							{{data.name}}
						</div>-->
					</div>
					<div class="input-content">
						<label>身份类型：</label>
						<el-select disabled v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</div>
					<div class="input-content">
						<label>帖子状态： </label>
						<el-select v-model="barVal" placeholder="请选择">
						    <el-option
						      v-for="item in bar"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
						<!--<div>
							{{data.bar}}
						</div>-->
					</div>
					<div v-if="data.create_time" class="input-content">
						<label>创建时间： </label>
						<div class="input-list">
							{{data.create_time}}
						</div>
					</div>
					<div v-if="data.count" class="input-content">
						<label>浏览量： </label>
						<div class="input-list">
							{{data.count}}
						</div>
					</div>
				</div>
				<div class="input-content">
					<label>封面图： </label>
					<el-img-upload :status="status" :img-content="imgContent"></el-img-upload>
				</div>
				<div class="input-content">
					<label>内容： </label>
					<edit :edit="edit"></edit>
				</div>
				<div v-if="imagesList" class="input-content images">
					<label>前台图片： </label>
					<div class="image-content">
						<img v-for="(tode,index) in imagesList" :src="tode" />
					</div>
				</div>
            	<div class="btn" v-if="!status">
                	<el-button @click="save" type="primary">保存</el-button>
                </div>
			</div>
		</el-content>
		<div id="con">
			
		</div>
	</div>
</template>

<script>
	import content from 'component/content';
	import edit from 'component/edit';
	import imgUpload from 'component/imgUpload';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { api_getStick,api_changeStick,api_AssortIndex,dominImg,api_getUser,api_addStick } from 'common/path';
	import { regexpLink,setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': this.$route.params.id,
				'authStatus': false,
				'data': {},
				'title': {
					'data': [
						{
							'title': '标题：',
							'val': '',
							'place': '请输入标题',
							'type': 'text',
							'status': false,
						}
					]
				},
				'type': 1,
				'listType': [
					
				],
				'authVal': 1,
				'auther': [
					
				],
				'value': 2,
				'options': [
					{
						'id': 1,
						'name': '前台用户'
					},
					{
						'id': 2,
						'name': '后台用户'
					}
				],
				'barVal': 1,
				'bar': [
					{
						'id': 1,
						'name': '普通帖子'
					},
					{
						'id': 2,
						'name': '首页置顶'
					},
					{
						'id': 3,
						'name': '社区置顶'
					}
				],
				'imgContent': {
					'imgPath': [],
					'fileList': [],
				},
				'edit': {
					'content': '',
				},
				'imagesList': null,
				'status': false,
				'routePath': '/stick',
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	
	    	const re = /^\/infoStick/;
	    	if(re.test(this.$route.path)){
	    		this.status = true;
	    		/*this.list.data.forEach(function(element){
	    			element['status'] = true;
	    		})*/
	    	}
	   		if(this.id != -1){
	   			this.authStatus = true;
	   			const obj = {
	  				'id': this.id,
				}
	   			this.createdFn(obj);
	   		}else{
	   			this.id = '';
	   			this.getAuther();
	   		}
			this.getType();
			
	    },
		methods: {
			createdFn(obj){
				this.$http.post(api_getStick,wind.stringify(obj))
				.then(res => {
					
					var data = res.data.info;
					
					this.data = data;
					this.title.data[0]['val'] = data.title;
					this.type = data.tid;
					this.value = parseInt(data.utype); 
					this.barVal = parseInt(data.bar); 
					data.name = data.utype == 1 ? data.nickname : data.username;
					data.utype = data.utype == 1 ? '前台用户' : '后台用户';
					var authers = {
						'id': parseInt(data.uid),
						'name': data.name,
					}
					
					
					this.auther.push(authers);
					this.authVal = parseInt(data.uid);
					
					this.data = data;
					
					var imgcontent = {};
					imgcontent['name'] = '封面图';
					imgcontent['url'] = wind.clearLink(setRegexpLink,data.image,dominImg);
					this.imgContent.imgPath.push(data.image);
					this.imgContent.fileList.push(imgcontent);
					this.edit.content = wind.clearLink(setRegexpLink,data.content,dominImg);
					console.log(data.imageslist);
					if(data.imageslist){
						data.imageslist = wind.clearLink(setRegexpLink,data.imageslist,dominImg);
						this.imagesList = data.imageslist.split(',');
					}
					
				})
				.catch(function(error){
					
				})
			},
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
			getAuther(){
				//api_getUser
				this.$http.post(api_getUser,wind.stringify())
				.then(res => {
					const data = res.data;
					
		    		if(data.code == 1){
		    			
		    			var getData = data.info;
		    			
		    			getData.forEach(function(element){
		    				element['name'] = element['username'];
		    				element['id'] = parseInt(element['id']);
		    			})
		    			this.auther = getData;
		    		}
				})
				.catch(function(error){
					
				})
			},
      		save(){
      			let content = wind.clearLink(regexpLink,this.edit.content);
      			const obj = {
      				'id': this.id,
      				'uid': this.authVal,
      				'utype': this.value,
      				'tid': this.type,
      				'title': this.title.data[0]['val'],
      				'abstract': this.data.abstract,
      				'image': this.imgContent.imgPath[0],
      				'content': content,
      				'bar': this.barVal,
				}
				this.$http.post(api_addStick,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			
		    			this.$router.push({path: this.routePath});
		    		}
				})
				.catch(function(error){
					
				})
      		}
		},
		components:{
			elContent: content,
			edit,
			elTitle: title,
			elImgUpload: imgUpload,
		}
	}
</script>

<style scoped>
	.index_right {
		position: relative;
		margin-top: 20px;
		padding-top: 20px;
	}
	/deep/ .quill-editor{
		height: 600px;
	}
  	/deep/ .ql-container{
  		height: 500px;
  	}
    .editStyle .ql-formats {
    	background: none;
	    border: none;
	    cursor: pointer;
	    display: inline-block;
	    float: left;
	    height: 24px;
	    padding: 3px 5px;
	    width: 28px;
    }
    .btn {
    	margin-top: 2rem;
    }
    .input-content {
		margin-bottom: 10px;
		width: 100%;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
	.input-content img {
		width: 10rem;
		height: 10rem;
	}
	.stick-content .input-content {
		display: inline-block;
		width: auto;
	}
	.input-list {
		min-width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.images {
		margin-top: 2rem;
	}
	.image-content img {
		max-width: 5rem;
		max-height: 5rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
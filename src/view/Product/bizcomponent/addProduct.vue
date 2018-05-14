<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">新增/编辑产品</h3>
			<div class="index_right">
				<el-title :list="list"></el-title>
				<div class="input-content">
					<label>产品类型：</label>
					<el-select v-model="value" :disabled = "status" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</div>
				<div class="input-content">
					<label>产品规格：</label>
					<el-input
					  :disabled	= "status"
					  type="textarea"
					  :rows="3"
					  placeholder="请输入产品规格"
					  v-model="textarea">
					</el-input>
				</div>
				<div class="input-content input-content-active">
					<label>封面图：</label>
					<el-img-upload :status="status" :img-content="imgContent"></el-img-upload>
				</div>
				<edit :edit="edit"></edit>
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
	import imgUpload from 'component/imgUpload';
	import edit from 'component/edit';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { api_getTypeList,api_getProduct,api_addProduct,dominImg,imageUpload } from 'common/path';
	import { regexpLink,setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'data': null,
				'list': {
					'data': [
						{
							'title': '产品名称：',
							'val': '',
							'place': '请输入产品名称',
							'type': 'text',
							'status': false,
						},
					]
				},
				'status': false,
				'imgContent': {
					'imgPath': [],
					'fileList': [],
				},
				'edit': {
					'content': '测试',
				},
				'routePath': '/product',
				'textarea': '',
				'value': '',
				'options': [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	
	    	const re = /^\/infoProduct/;
	    	if(re.test(this.$route.path)){
	    		this.status = true;
	    		
	    		this.list.data.forEach(function(element){
	    			element['status'] = true;
	    		})
	    	}
	   		if(this.$route.query.type == 2){
	   			this.routePath = '/industry';
	   		}
	    	const obj = {
  				'id': this.$route.params.id,
			}
	    	this.getType();
	    	this.$http.post(api_getProduct,wind.stringify(obj))
			.then(res => {
				const data = res.data.info;
				const imgcontent = {};
				this.id = data.id;
				this.list.data[0]['val'] = data.name;
				this.value = data.utype;
				this.textarea = data.norms;
				imgcontent['name'] = '封面图';
				imgcontent['url'] = wind.clearLink(setRegexpLink,data.cover,dominImg);
				this.imgContent.imgPath.push(data.cover);
				this.imgContent.fileList.push(imgcontent);
				this.edit.content = wind.clearLink(setRegexpLink,data.content,dominImg);
			})
			.catch(function(error){
				
			})
	    },
		methods: {
			getType(){
				//api_getTypeList
				this.$http.get(api_getTypeList)
				.then(res => {
					const data = res.data;
					
					if(data.data.length > 0){
						this.options = data.data;
					}
				})
				.catch(function(error){
					
				})
				
			},
			success(data){
				if(data.code == 1){
					const imgcontent = {};
					this.fileList2.length = 0;
					this.$message({
		              type: 'success',
		              message: '上传成功'
		            })
					imgcontent['name'] = '封面图';
					imgcontent['url'] = wind.clearLink(setRegexpLink,data.path,dominImg);
					this.fileList2.push(imgcontent);
					this.imgContent = data.path;
				}else{
					this.$message({
		              type: 'error',
		              message: '上传失败'
		            })
				}
				
				
			},
			error(err){
				this.$message({
	              	type: 'error',
	              	message: '服务器问题，上传失败,请稍候重试'
	            })
			},
			remove(){
				this.imgContent	= '';
				this.$message({
	              	type: 'warning',
	              	message: '删除成功'
	            })
			},
      		save(){
      		
      			const content = wind.clearLink(regexpLink,this.edit.content);
      			const obj = {
      				'id': this.id,
      				'name': this.list.data[0]['val'],
      				'utype': this.value,
      				'norms': this.textarea,
      				'cover': this.imgContent.imgPath[0],
					'content': content,
				}
				this.$http.post(api_addProduct,wind.stringify(obj))
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
	.input-content-active {
		margin-bottom: 49px;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
</style>
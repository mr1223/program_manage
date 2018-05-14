<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">新增/编辑新闻</h3>
			<div class="index_right">
				<el-title :list="list"></el-title>
				<div class="input-content">
					<label>封面图：</label>
					<el-upload
					  class="upload-demo"
					  :name=name
					  :action=action
					  :disabled = "status"
					  :on-success="success"
					  :on-error="error"
					  :on-remove="remove"
					  :file-list="fileList2"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
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
	import edit from 'component/edit';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { api_addNews,api_getNews,dominImg,imageUpload } from 'common/path';
	import { regexpLink,setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'name': 'files',
				'action': imageUpload,
				'fileList2': [
					/*{	
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}*/
				],
				'edit': {
					'content': '测试',
				},
				'data': null,
				'list': {
					'data': [
						{
							'title': '标题：',
							'val': '',
							'place': '请输入标题',
							'type': 'text',
							'status': false,
						},
						{
							'title': '排序：',
							'val': '',
							'place': '请输入排序',
							'type': 'text',
							'status': false,
						},
						{
							'title': '作者：',
							'val': '',
							'place': '请输入作者',
							'type': 'text',
							'status': false,
						},
					]
				},
				'imgContent': '',
				'status': false,
				'routePath': '/news',
			}
		},
		computed: {
	     
	    },
	    created(){
	    	
	    	
	    	const re = /^\/infoNews/;
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
	    	this.$http.post(api_getNews,wind.stringify(obj))
			.then(res => {
				const data = res.data.data;
				const imgcontent = {};
				this.id = data.id;
				this.list.data[0]['val'] = data.title;
				this.list.data[1]['val'] = data.sort;
				this.list.data[2]['val'] = data.author;
				imgcontent['name'] = '封面图';
				imgcontent['url'] = wind.clearLink(setRegexpLink,data.cover,dominImg);
				this.fileList2.push(imgcontent);
				this.imgContent = data.cover;
				this.edit.content = wind.clearLink(setRegexpLink,data.content,dominImg);
			})
			.catch(function(error){
				
			})
	    },
		methods: {
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
      			
      			const imgContent = wind.clearLink(regexpLink,this.imgContent);
      			const content = wind.clearLink(regexpLink,this.edit.content);
      			const obj = {
      				'id': this.id,
      				'type': this.$route.query.type,
      				'title': this.list.data[0]['val'],
      				'sort': this.list.data[1]['val'],
      				'author': this.list.data[2]['val'],
      				'cover': imgContent,
					'content': content,
				}
				this.$http.post(api_addNews,wind.stringify(obj))
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
		margin-bottom: 40px;
		width: 100%;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
</style>
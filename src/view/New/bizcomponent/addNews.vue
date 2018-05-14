<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">新增/编辑新闻</h3>
			<div class="index_right">
				<el-title :list="list"></el-title>
				<div class="input-content">
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
	import edit from 'component/edit';
	import imgUpload from 'component/imgUpload';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { api_addNews,api_getNews,dominImg,imageUpload } from 'common/path';
	import { regexpLink,setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
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
				'imgContent': {
					'imgPath': [],
					'fileList': [],
				},
				'edit': {
					'content': '测试',
				},
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
				const data = res.data.info;
				const imgcontent = {};
				this.id = data.id;
				this.list.data[0]['val'] = data.title;
				this.list.data[1]['val'] = data.sort;
				this.list.data[2]['val'] = data.author;
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
      		save(){
      			
      			
      			const content = wind.clearLink(regexpLink,this.edit.content);
      			const obj = {
      				'id': this.id,
      				'type': this.$route.query.type,
      				'title': this.list.data[0]['val'],
      				'sort': this.list.data[1]['val'],
      				'author': this.list.data[2]['val'],
      				'cover': this.imgContent.imgPath[0],
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
		margin-bottom: 40px;
		width: 100%;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
</style>
<template>
	<div class="index">
		<el-content>
			<div class="index_right">
				<el-title :list="list"></el-title>
				<div class="input-content">
					<label>轮播图：</label>
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
				<div class="btn_content" v-if="!status">
					<el-button @click="save" type="primary">保存</el-button>
				</div>
			</div>
		</el-content>
	</div>
</template>

<script>
	import content from 'component/content';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { dominImg,api_addCarousel,api_getCarousel,imageUpload } from 'common/path';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'action': imageUpload,
				'name': 'files',
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
					]
				},
				'fileList2': [
					/*{	
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}*/
				],
				'status': false,
				'imgContent': '',
			}
		},
		computed: {},
        created(){
        	const re = /^\/infoCarousel/;
	    	if(re.test(this.$route.path)){
	    		this.status = true;
	    		this.list.data.forEach(function(element){
	    			element['status'] = true;
	    		})
	    	}
	    	const obj = {
  				'id': this.$route.params.id,
			}
	    	this.$http.post(api_getCarousel,wind.stringify(obj))
			.then(res => {
				const data = res.data.data;
				const imgcontent = {};
				this.id = data.id;
				this.list.data[0]['val'] = data.title;
				this.list.data[1]['val'] = data.sort;
				imgcontent['name'] = '轮播图';
				imgcontent['url'] = wind.clearLink(setRegexpLink,data.image_src,dominImg);
				this.imgContent = data.image_src;
				this.fileList2.push(imgcontent);
				console.log(this.imgContent);
			})
			.catch(function(error){
				
			})
	    	
	    	
        },
		mounted(){},
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
			remove(list){
				this.imgContent	= '';
				this.$message({
	              	type: 'warning',
	              	message: '删除成功'
	            })
			},
			save(){
				const obj = {
					'id': this.id,
					'title': this.list.data[0]['val'],
					'sort': this.list.data[1]['val'],
					'image_src': this.imgContent,
				}
				this.$http.post(api_addCarousel,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			this.$router.push({path: '/carousel'});
		    		}
				})
				.catch(function(error){
					
				})
			}
		},
		components:{
			elContent: content,
			elTitle: title,
		},
		watch: {}
	}
</script>

<style scoped>
	.index_content {
		display: block;
		padding: 0.5rem;
	}
	.index_content label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 700;
	}
	.el-input /deep/ {
		width: 22rem;
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
	.btn_content {
		margin-top: 50px;
	}
</style>
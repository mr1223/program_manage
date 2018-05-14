<template>
	<div class="imgUpload">
		<el-upload
		  class="upload-demo"
		  :name=name
		  :action=action
		  :disabled = "status"
		  :on-success="success"
		  :on-error="error"
		  :on-remove="remove"
		  :file-list="imgContent.fileList"
		  list-type="picture">
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</div>
</template>

<script>
	import { wind } from 'common/public';
	import { setRegexpLink } from 'common/allRegexp';
	import { dominImg,imageUpload } from 'common/path';
	export default {
		data(){
			return {
				'name': 'files',
				'action': imageUpload,
				//'fileListData': []
				/*'fileList2': [
					{	
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}
				],*/
			}
		},
		props: {
			'imgContent': null,
			'status': false,
		},
		methods: {
			success(data){
				if(data.code == 1){
					this.$message({
		              type: 'success',
		              message: '上传成功'
		            })
					var imgcontent = {};
					this.imgContent.fileList = [];
					imgcontent['name'] = '封面图';
					imgcontent['url'] = wind.clearLink(setRegexpLink,data.path,dominImg);
					
					this.imgContent.fileList[0] = imgcontent;
					this.imgContent.imgPath[0] = data.path;
					this.$emit('setImageUpload',data);
					/*const imgcontent = {};
					this.fileList2.length = 0;
					
					imgcontent['name'] = '封面图';
					imgcontent['url'] = wind.clearLink(setRegexpLink,data.path,dominImg);
					this.fileList2.push(imgcontent);
					this.imgContent = data.path;*/
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
				this.imgContent.imgPath[0] = '';
				this.$message({
	              	type: 'warning',
	              	message: '删除成功'
	            })
				//this.$emit('setImageRmove',data);
			},
		}
	}
</script>

<style scoped>
	
</style>
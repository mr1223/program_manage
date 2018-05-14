<template>
	<div class="index">
		<el-content>
			<div class="index_right">
				<el-title :list="list"></el-title>
				<div class="input-content">
					<label>样式：</label>
					<el-input
					  type="textarea"
					  :disabled = "status"
					  :autosize="{ minRows: 6, maxRows: 4}"
					  placeholder="请输入样式"
					  v-model="style">
					</el-input>
				</div>
				<div class="input-content">
					<label>简介：</label>
					<el-input
					  type="textarea"
					  :disabled = "status"
					  :autosize="{ minRows: 6, maxRows: 4}"
					  placeholder="请输入简介"
					  v-model="textarea">
					</el-input>
				</div>
				<div class="input-content">
					<label>图标：</label>
					<el-img-upload :status="status" :img-content="imgContent"></el-img-upload>
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
	import imgUpload from 'component/imgUpload';
	import title from 'src/view/New/bizcomponent/title';
	import { wind } from 'common/public';
	import { dominImg,api_addAssort,api_getAssort,imageUpload } from 'common/path';
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
							'title': '名字：',
							'val': '',
							'place': '请输入名字',
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
							'title': '背景颜色：',
							'val': '',
							'place': '请输入背景颜色 十六进制',
							'type': 'text',
							'status': false,
						},
						{
							'title': 'icon：',
							'val': '',
							'place': 'icon class',
							'type': 'text',
							'status': false,
						}
					]
				},
				'imgContent': {
					'imgPath': [],
					'fileList': [],
				},
				'status': false,
				'textarea': '',
				'style': '',
			}
		},
		computed: {},
        created(){
        	const re = /^\/infoIndexType/;
	    	if(re.test(this.$route.path)){
	    		this.status = true;
	    		this.list.data.forEach(function(element){
	    			element['status'] = true;
	    		})
	    	}
	    	const obj = {
  				'id': this.$route.params.id,
			}
	    	this.$http.post(api_getAssort,wind.stringify(obj))
			.then(res => {
				const data = res.data.info;
				const imgcontent = {};
				this.id = data.id;
				this.list.data[0]['val'] = data.name;
				this.list.data[1]['val'] = data.sort;
				this.list.data[2]['val'] = data.color;
				this.list.data[3]['val'] = data.icon;
				this.textarea = data.abstract;
				this.style = data.style;
				imgcontent['name'] = '轮播图';
				imgcontent['url'] = wind.clearLink(setRegexpLink,data.image,dominImg);
				this.imgContent.imgPath.push(data.image);
				this.imgContent.fileList.push(imgcontent);
				
			})
			.catch(function(error){
				
			})
	    	
	    	
        },
		mounted(){},
		methods: {
			
			save(){
				
				const obj = {
					'id': this.id,
					'name': this.list.data[0]['val'],
					'sort': this.list.data[1]['val'],
					'image': this.imgContent.imgPath[0],
					'abstract': this.textarea,
					'color': this.list.data[2]['val'],
					'icon': this.list.data[3]['val'],
					'style': this.style,
				}
				this.$http.post(api_addAssort,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			this.$router.push({path: '/indexType'});
		    		}
				})
				.catch(function(error){
					
				})
			}
		},
		components:{
			elContent: content,
			elTitle: title,
			elImgUpload: imgUpload,
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
<template>
	<div class="index">
		<el-content>
			<div class="index_right">
				<el-title :list="list"></el-title>
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
	import { dominImg,api_addType,api_getType } from 'common/path';
	import { setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'list': {
					'data': [
						{
							'title': '产品类型：',
							'val': '',
							'place': '请输入产品类型',
							'type': 'text',
							'status': false,
						},
					]
				},
				'status': false,
			}
		},
		computed: {},
        created(){
        	const re = /^\/infoType/;
	    	if(re.test(this.$route.path)){
	    		this.status = true;
	    		this.list.data.forEach(function(element){
	    			element['status'] = true;
	    		})
	    	}
	    	const obj = {
  				'id': this.$route.params.id,
			}
	    	this.$http.post(api_getType,wind.stringify(obj))
			.then(res => {
				const data = res.data.info;
				this.id = data.id;
				this.list.data[0]['val'] = data.name;
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
				}
				this.$http.post(api_addType,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			this.$router.push({path: '/type'});
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
<template>
	<div class="index">
		<el-content>
			<h3 class="addCarousel">新增产品信息</h3>
			<div class="index_right">
				<edit :edit="edit"></edit>
            	<div class="btn">
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
	import { wind } from 'common/public';
	import { api_addCompany,api_getCompany,dominImg } from 'common/path';
	import { regexpLink,setRegexpLink } from 'common/allRegexp';
	export default {
		data(){
			return {
				'id': '',
				'edit': {
					'content': '测试',
				},
				'data': null,
			}
		},
		computed: {
	     
	    },
	    created(){
	    	//response
	    	this.$http.get(api_getCompany)
			.then(res => {
				const data = res.data;
				this.id = data.info.id;
				this.edit.content = wind.clearLink(setRegexpLink,data.info.content,dominImg);
			})
			.catch(function(error){
				
			})
	    },
		methods: {
      		save(){
      			const content = wind.clearLink(regexpLink,this.edit.content);
      			this.data = content;
      			const obj = {
      				'id': this.id,
					'content': content,
				}
				this.$http.post(api_addCompany,wind.stringify(obj))
				.then(res => {
					const data = res.data;
		    		if(data.code == 1){
		    			this.$router.push({path: '/company'});
		    		}
				})
				.catch(function(error){
					
				})
      		}
		},
		components:{
			elContent: content,
			edit,
		}
	}
</script>

<style scoped>
	.index_right {
		position: relative;
		margin-top: 20px;
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
    
</style>
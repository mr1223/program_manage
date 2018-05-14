<template>
	<div class="title">
		<div class="input-content" v-for="(tode,index) in list.data">
			 <label>{{tode.title}}</label>
			 <el-input
			  :placeholder="tode.place"
			  :disabled	= "tode.status"
			  v-model="tode.val"
			  clearable>
			</el-input>
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:{
			list: null
		}
	}
</script>

<style scoped>
	.title {}
	.input-content {
		margin-bottom: 10px;
		width: 100%;
	}
	.input-content label {
		display: block;
		height: 34px;
		font-weight: 700;
	}
	
</style>
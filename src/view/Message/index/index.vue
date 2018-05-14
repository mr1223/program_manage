<template>
	<div class="index">
		<el-content>
			<h3 @click="addProduct" class="addCarousel">添加产品信息</h3>
			<div class="index_right">
				
			</div>
		</el-content>
	</div>
</template>

<script>
	import content from 'component/content';

	export default {
		data(){
			return {
				
			}
		},
		methods: {
			addProduct(){
				this.$router.push({path: 'addProduct'});
			}
		},
		components:{
			elContent: content,
			
		}
	}
</script>

<style>
</style>
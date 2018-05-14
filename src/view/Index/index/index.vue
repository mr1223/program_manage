<template>
	<div class="index">
		<el-content>
			<div class="index_right">
				欢迎进入管理后台
			</div>
		</el-content>
	</div>
</template>

<script>
	import content from 'component/content';
	
	export default {
		data(){
			return {}
		},
		computed: {},
        created(){},
		mounted(){},
		methods: {},
		components:{
			elContent: content
		},
		watch: {}
	}
</script>

<style scoped>
	.index_right {
		padding: 5rem;
		text-align: center;
	}
</style>
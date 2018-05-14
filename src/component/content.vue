<template>
	<div class="index">
		<el-header></el-header>
		<nav-left></nav-left>
		<div class="nav_right">
			<div class="nav_right_content">
				<righ-title></righ-title>
				<slot></slot>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
</template>

<script>
	import header from 'component/header';
	import navLeft from 'component/nav_left';
	import righTitle from 'component/righTitle';
	export default {
		data(){
			return {}
		},
		computed: {},
        created(){},
		mounted(){},
		methods: {},
		components:{
			elHeader: header,
			navLeft,
			righTitle,
		},
		watch: {}
	}
</script>

<style scoped>
	.nav_right {
		display:table-cell;
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
	}
	.nav_right_content {
		padding: 0 1rem 1.25rem 1rem;
	}
</style>
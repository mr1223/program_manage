<template>
	<div class="title">
		<a @click="goRoute" class="title-name">{{content.title}}</a>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			content: null	
		},
		methods: {
			goRoute(){
				this.$router.push({path: this.content.path});
			}
		}
	}
</script>

<style scoped>
	.title-name {
		display: inline-block;
		margin-bottom: 0.5rem;
		color: #000;
	}
</style>
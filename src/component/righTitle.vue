<template>
	<div class="rightTile">
		<span @click="setStatus">图标</span>
		<el-tabs>
		    <el-tab-pane :label="message" name="first">{{message}}</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data(){
			return {
				message: this.$router.currentRoute.meta.title
			}
		},
		computed: {
			...mapState({
				ISCOLLAPSE: state => state.ISCOLLAPSE
			})
		},
		created(){
			
		},
		methods: {
			setStatus(){
				if(this.ISCOLLAPSE){
					this.$store.dispatch('setISCOLLAPSE',false);
				}else{
					this.$store.dispatch('setISCOLLAPSE',true);
				}
				
			}
		}
	}
</script>

<style>
	
</style>
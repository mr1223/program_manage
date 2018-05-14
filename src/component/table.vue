<template>
	<div class="table">
		<table border="1" cellpadding="0" cellspacing="0" >
			<thead>
				<tr class="table_tr">
					<td v-for="(tode,index) in table.head" v-bind:style="{width: tode.width}">
						{{tode.name}}
					</td>
				</tr>
			</thead>
			<tbody class="table-body">
				<slot></slot>
				<!--<tr class="table_content_tr" v-for="(tode,index) in table.body">
					<td v-if="tode.id">
						{{tode.id}}
					</td>
					<td v-if="tode.name">
						{{tode.name}}
					</td>
					<td v-if="tode.img">
						<img :src="tode.img" />
					</td>
					<td v-if="tode.src">
						{{tode.src}}
					</td>
					<td>
						<a v-if="tode.look">查看</a>
						<a v-if="tode.edit">编辑</a>
						<a v-if="tode.del">删除</a>
					</td>
				</tr>-->
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			'table': null
		}
	}
</script>

<style scoped>
	table,table tr th, table tr td { 
		/*border:1px solid rgb(162, 182, 202); */
		border: solid 1px #DCDFE6;
	}
	td {
		padding: 0.4rem;
	}
	.table table {
		width: 100%;
		border: solid 1px;
		border-collapse: collapse;
	}
	.table_tr {
		width: 100%;
		min-height: 32rem;
		background: #99a9bf;
		color: #fff;
	}
	.table-body {
		color: #5a5e66;
	}
	.table_tr td {
		padding: 0.6rem;
	}
	.table_content_tr img {
		max-width: 8rem;
		max-height: 5.625rem;
	}
	.table_content_tr a {
		margin: 0 auto;
		display: inline-block;
		color: rgb(134, 158, 247);
	}
</style>
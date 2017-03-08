<template>
	<footer class="menu-foot">
		<router-link class="item" to="/chat">chat</router-link>
		<router-link class="item" to="/friend">friend</router-link>
		<router-link class="item" to="/find">find</router-link>
		<router-link class="item" to="/personal">personal</router-link>
	</footer>
</template>

<style lang="sass">
	.menu-foot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #e5e4e3;
		display: flex;
		background: #fff;
		.item{
			flex: 1;
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			text-align: center;
			color: #000;
			&.router-link-active{
				color: #4395ff;
			}
		}
	}
</style>

<script>
	export default {
	}
</script>
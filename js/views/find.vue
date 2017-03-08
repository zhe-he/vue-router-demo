<template lang="pug">
	article
		ul(class="chat-ul")
			li 朋友圈
			li 扫一扫
			li 摇一摇
			li 附近的人
			li 漂流瓶
			li 购物
			li 游戏
			li 小程序
		nv-menu

	
</template>

<style lang="sass" scoped>
	.chat-ul{
		padding-bottom: 40px;
		over-flow-x: hidden;
		over-flow-y: auto;

		> li{
			list-style: none;
			height: 60px;
			line-height: 60px;
			text-indent: 20px;
			border-bottom: 1px solid #e5e4e3;
		}
	}
</style>

<script>
	import nvMenu from '../modules/menu';
	export default {
		components: {
            nvMenu
        }
	}
</script>
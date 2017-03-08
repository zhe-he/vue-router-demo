<template lang="pug">
	article
		ul(class="chat-ul")
			li 相册
			li 收藏
			li 钱包
			li 卡包
			li 表情
			li 设置
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
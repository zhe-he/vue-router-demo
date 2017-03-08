<template lang="pug">
	article
		ul(class="chat-ul")
			li 新的朋友
			li 公众号
			li(v-for="item in 15") 朋友{{item}}
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
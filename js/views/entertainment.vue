<template lang="pug">
	article
		nv-title(title="娱乐")
		nav
			router-link(v-for="item in etmId2title",:key="item.id",:to="{name:'etmDetail',params:{id:item.id}}") {{item.name}}
		
		nv-menu
	
</template>

<style lang="sass" scoped>
	@import "../../css/base";
	nav{
		display: flex;
		padding: 0.3rem 0;
		@extend %ui-border-b;
		> a{
			display: block;
			flex: 1;
			padding-top: 0.7rem;
			text-align: center;
			font-size: 0.24rem;
			line-height: 0.24rem;
			color: #1A1919;
			background-position: center top;
		}
		@for $i from 1 to 6{
			> a:nth-child(#{$i}){
				@include bg('icon0#{$i}.png',0.6rem,0.6rem);
			}
		}
	}
</style>

<script>
	import etmId2title from '../data/etmId2title.data';
	import nvTitle from '../modules/title';
	import nvMenu from '../modules/menu';
	export default {
		data(){
			return {
				etmId2title
			}
		},
		components: {
            nvTitle,
            nvMenu
        }
	}
</script>
<template>
	<header class="nv-title">
		<h1><a v-if="isBack" @click="$router.go(-1)"></a>{{title}}</h1>
	</header>
</template>

<style lang="sass">
	@import "../../css/base";
	.nv-title{
		height: 0.8rem;
		> h1{
			z-index: 10;
			@include common-fixed; 
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: 0.36rem;
			text-align: center;
			font-weight: normal;
			color: #030303;
			@extend %ui-border-b;
			a{
				position: absolute;
				top: 0;
				left: 0.2rem;
				width: 0.44rem;
				height: 100%;
				@include bg2('toparrow',0.24rem,0.44rem);
				background-position: center center;
			}
		}
	}
</style>
<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			isBack: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
<template lang="pug">
	article
		nv-title(title="往返WiFi")
		section
			i
			p 成功连接@往返免费Wi-Fi
			p 剩余往返流量：90M
			a.a_c 兑换流量
		.bg
		nv-menu
</template>

<style lang="sass" scoped>
	@import "../../css/base";
	article{
		display: flex;
		position: relative;
		height: 100%;
		align-items: center;
		section{
			flex: 1;
			display: block;
			margin-top: -2.3rem;
			> i{
				display: block;
				margin: 0 auto 0.5rem;
				width: 3.4rem;
				height: 3.4rem;
				@include bg2('green');
			}
			> p{
				text-align: center;
				&:nth-of-type(1){
					font-size: 0.36rem;
					line-height: 0.36rem;
					color: #1A1919;
				}
				&:nth-of-type(2){
					margin-top: 0.17rem;
					font-size: 0.28rem;
					line-height: 0.28rem;
					color: #807E7D;
				}
			}
			> a {
				display: block;
				width: 6.4rem;
				height: 0.8rem;
				line-height: 0.8rem;
				margin: 1.1rem auto 0;
				text-align:center;
				border-radius: $radiuswidth;
				color: #fff;
				font-size: 0.36rem;
				background-color: #FF7733;
			}
		}
	}
	.bg{
		position: absolute;
		bottom: 0.88rem;
		left: 0;
		width: 100%;
		height: 1.16rem;
		@include bg2('green-back');
		&:after{
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			@include bg2('green-front');
		}
	}

</style>

<script>
	import nvTitle from '../modules/title';
	import nvMenu from '../modules/menu';
	export default {
		components: {
            nvTitle,
            nvMenu
        }
	}
</script>
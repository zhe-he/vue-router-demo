<template>
	<footer class="menu-foot">
		<router-link class="item" to="/wifi"><i></i><p>WiFi</p></router-link>
		<router-link class="item" to="/entertainment"><i></i><p>娱乐</p></router-link>
		<router-link class="item" to="/find"><i></i><p>发现</p></router-link>
		<router-link class="item" to="/trip"><i></i><p>行程</p></router-link>
		<router-link class="item" to="/personal"><i></i><p>我的</p></router-link>
	</footer>
</template>

<style lang="sass">
	@import "../../css/base";
	.menu-foot{
		z-index: 10;
		position: fixed;
		bottom: 0;
		left: 50%;
		width: 7.5rem;
		margin-left: -3.75rem;
		display: flex;
		background: #fff;
		@extend %ui-border-t;
		.item{
			position: relative;
			display: block;
			padding-top: 0.6rem;
			heigth: 0.28rem;
			line-height: 0.28rem;
			font-size: 16px;
			text-align: center;
			flex: 1;
			color: #807E7D;
			font-size: 0.22rem;
			text-align: center;
			> i{
				position: absolute;
				top: 0.06rem;
				left: 50%;
				width: 0.52rem;
				height: 0.52rem;
				margin-left: -0.26rem;
			}

			&:active,&.router-link-active{
				color: #FF4F1A;
			}
			&:active{
				opacity: 0.8;
			}
		}
		$img_arr1: wifi_n etm-n found-n trip-n my-n;
		$img_arr2: wifi-s etm-s found-s trip-s my-s;
		@for $i from 1 to 6{
			.item:nth-child(#{$i}){
				& > i{
					@include bg2(nth($img_arr1,$i));
				}
				&.router-link-active > i,&:active > i{
					@include bg2(nth($img_arr2,$i));
				}
			}
			@if $i==3{
				.item:nth-child(#{$i}) > i{
					width: 0.82rem;
					height: 0.82rem;
					margin-left: -0.41rem;
					top: -0.22rem;
				}
			}
		}
	}
</style>

<script>
	export default {
	}
</script>
<template lang="pug">
	article
		nv-title(title="往返")
		.swiper-container.find-container
			.swiper-wrapper
				.swiper-slide
					a(href="javascript:;")
						img(src="http://res.iwangfan.com//o2o/images/2017/3/9/1489030596558.jpg")
				.swiper-slide
					a(href="javascript:;")
						img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440868126.jpg")
				.swiper-slide
					a(href="javascript:;")
						img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440660699.jpg")
			.swiper-pagination
		
		section.tuijian
			h2 往返推荐

		nv-menu
</template>

<style lang="sass" scoped>
	@import "../../css/base";
	.find-container{
		.swiper-slide{
			width: 100%;
			min-height: 2.8rem;
			img{
				display: block;
				width: 100%;
			}
		}
	}
	.tuijian > h2{
		height: 0.75rem;
		line-height: 0.75rem;
		font-size: 0.32rem;
		font-weight: normal;
		text-indent: 0.6rem;
		color: #1a1919;
		@include bg('stat.png',0.4rem,0.4rem);
		background-position: 0.1rem center;
	}
	
</style>

<script>
	import Swiper from 'swiper';
	// Because the configuration of the css-loader ruled out the node_modules directory under the CSS, so need to manually load css-loader
	import 'style-loader!css-loader!../../node_modules/swiper/dist/css/swiper.min.css';
	import nvTitle from '../modules/title';
	import nvMenu from '../modules/menu';
	
	export default {
		mounted(){
			this.$nextTick(()=>{
				new Swiper('.find-container', {
					autoplay: 5000,
					pagination: '.swiper-pagination'
				});
				
			});
		},
		components: {
			nvTitle,
            nvMenu
        }
	}
</script>
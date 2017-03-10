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

			.item(v-for="(item,index) in num")
				.swiper-container.item-container(v-if="index%5==0")
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
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/9/1489030596558.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440868126.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440660699.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/9/1489030596558.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440868126.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440660699.jpg")
				.swiper-container.item-container2(v-if="index%5==0")
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
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/9/1489030596558.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440868126.jpg")
						.swiper-slide
							a(href="javascript:;")
								img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440660699.jpg")
				p 标题标题标题标题{{item}}
				ul
					li
						img(src="http://res.iwangfan.com//o2o/images/2017/3/9/1489030596558.jpg")
					li
						img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440868126.jpg")
					li
						img(src="http://res.iwangfan.com//o2o/images/2017/3/2/1488440660699.jpg")

		nv-menu
</template>

<style lang="sass" scoped>
	@import "../../css/base";
	.find-container{
		margin: 0.2rem 0;
		.swiper-slide{
			width: 100%;
			min-height: 2.8rem;
			img{
				display: block;
				width: 100%;
			}
		}
	}
	.item-container2{
		width: 100%;
		height: 3rem;
		box-sizing: border-box;
		margin-top: 0.1rem;
	}
	.item-container,.item-container2{
		padding: 0 0.05rem;
		.swiper-slide{
			padding: 0 0.05rem;
			box-sizing: border-box;
		}
		img{
			display: block;
			width: 100%;
		}
	}
	.tuijian{
		padding-bottom: 1rem;
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

	.item{
		> p{
			height: 0.6rem;
			line-height: 0.6rem;
			font-size: 0.3rem;
			text-indent: 0.2rem;
		}
		ul{
			display: flex;
			padding: 0 0.05rem;
			margin-bottom: 0.2rem;
			li{
				flex: 1;
				padding: 0 0.05rem;
				height: 1.12rem;
				img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>

<script>
	import Swiper from 'swiper';
	// Because the configuration of the css-loader ruled out the node_modules directory under the CSS, so need to manually load css-loader
	import 'style-loader!css-loader!../../node_modules/swiper/dist/css/swiper.min.css';
	import nvTitle from '../modules/title';
	import nvMenu from '../modules/menu';
	
	export default {
		data(){
			return {
				num: 5,
				isReady: true
			}
		},
		mounted(){
			this.$nextTick(()=>{
				new Swiper('.find-container', {
					autoplay: 5000,
					pagination: '.swiper-pagination'
				});
				this.setSwiper();
				window.addEventListener('scroll',()=>{
					let H = document.documentElement.scrollHeight || document.body.scrollHeight;
					let h = window.innerHeight;
					let t = document.documentElement.scrollTop||document.body.scrollTop;
					if (H - (h + t) < 15 && this.isReady){
						this.getItem();
					}

				},false);
			});
		},
		methods:{
			getItem(){
				this.isReady = false;
				setTimeout(()=>{
					this.isReady = true;
					this.num+=5;
					this.$nextTick(()=>{
						this.setSwiper();
					});
				},200+Math.random()*500);
			},
			setSwiper(){
				new Swiper('.item-container', {
					slidesPerView : 2.5
				});
				new Swiper('.item-container2', {
					direction : 'vertical',
					autoplay: 5000,
					initialSlide: 1
				});
			}
		},
		components: {
			nvTitle,
            nvMenu
        }
	}
</script>
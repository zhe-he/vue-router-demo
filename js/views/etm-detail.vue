<template>
	<transition name="slide-fade">
		<article>
			<nv-title :title="title" :is-back="true"></nv-title>
			<p>id->{{$route.params.id}}</p>
		</article>
	</transition>
</template>
<style scoped>
	article{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	p{
		line-height: 0.6rem;
		color: #1A1919;
		font-size: 0.4rem;
		text-align: center;
	}
	.slide-fade-enter-active,.slide-fade-leave-active{
		transition: transform .5s,opacity .5s;
	}
	.slide-fade-enter-to{
		opacity: 1;
		transform: translate3d(0,0,0);
	}
	.slide-fade-enter,.slide-fade-leave-to{
		opacity: 0;
		transform: translate3d(100%,0,0);
	}
</style>
<script>
	import etmId2title from '../data/etmId2title.data';
	import nvTitle from '../modules/title';
	export default {
		computed: {
			title(){
				for(let key of etmId2title){
					if (key.id === this.$route.params.id) {
						return key.name;
					}
				}
			}
		},
		components: {
            nvTitle
        }
	}
</script>
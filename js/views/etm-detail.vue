<template lang="pug">
	<article>
		nv-title(:title="title",:is-back="true")
		p id->{{$route.params.id}}
	</article>
</template>
<style scoped>
	p{
		line-height: 0.6rem;
		color: #1A1919;
		font-size: 0.4rem;
		text-align: center;
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
<template lang="pug">
	article
		nv-title(title="行程")
		p none
		nv-menu

</template>

<style lang="sass" scoped>

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
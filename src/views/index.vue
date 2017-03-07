<template>
	<article>
		<h1>Hello World!</h1>
		
		<nv-menu></nv-menu>
	</article>
</template>

<style>
*{margin: 0; padding: 0;}
a{
	text-decoration: none;
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
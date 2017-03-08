<template>
	<article class="bg">
		<p><a class="back" @click="$router.go(-1)" href="javascript:;">back</a></p>
		<p>聊天id:{{$route.params.id}}</p>
		<img width="50" style="border:1px solid #fff;" src="../../images/logo.png">
	</article>
</template>
<style scoped>
	.bg{
		width: 100%;
		height: 100%;
		background: url('../../images/bg1.jpg') no-repeat;
		background-size: 100% auto;
	}
	.back{
		
		color: #fff;
	}
	p{color: #fff; font-size: 16px;height: 32px; line-height: 32px; text-indent: 10px;}
</style>
<script>
	export default {}
</script>
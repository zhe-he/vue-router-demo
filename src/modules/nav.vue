<template>
    <ul>
        <router-link tag="li" to="/home">/home</router-link>
        <router-link tag="li" to="/about">/about</router-link>
        <router-link tag="li" to="/topic">/topic</router-link>
    </ul>
</template>

<script type="text/javascript">
    export default {}
</script>

<style scoped lang="scss">
    @import "../styles/base";
    li{
        cursor: pointer;
        &.router-link-active{
            color: $origin;
        }
    }
</style>
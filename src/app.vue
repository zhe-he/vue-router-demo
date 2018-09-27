<template>
    <div>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="scss">
    @import "~@/styles/reset.scss";
    @import "~@/styles/index.scss";
</style>
<script type="text/javascript">
    export default {
    }
</script>
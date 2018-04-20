<template>
    <div>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <msg :status="toast.status" :msg="toast.msg"></msg>
        <loading :status="loadStatus"></loading>
    </div>
</template>

<style lang="scss">
    @import "./styles/reset";
    @import "./styles/index";
</style>
<script type="text/javascript">
    import msg from './modules/msg'
    import loading from './modules/loading'
    import { mapState } from "vuex"

    export default {
        computed: {
            ...mapState(["loadStatus", "toast"])
        },
        components: {
            msg,
            loading
        }
    }
</script>
<template>
    <div>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        
        <msg :status="status" :msg="msg"></msg>
        <loading :status="loadStatus"></loading>
    </div>
</template>

<style type="text/css">
    @import "../css/reset.scss";
    @import "../css/index.scss";
</style>
<script type="text/javascript">
    import msg from 'msg';
    import loading from 'loading';
    import FastClick from 'fastclick';
    import "./libs/autosize.js";
    import { mapState } from "vuex";

    export default {
        name: 'app',
        data (){
            return {

            }
        },
        computed: {
            ...mapState(["loadStatus","msg","status"])
        },
        created(){
            this.$nextTick(()=>{
                FastClick.attach(document.body);
            })
        },
        components: {
            msg,
            loading
        }
    }
</script>
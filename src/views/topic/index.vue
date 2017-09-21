<template>
    <div>
        <h2>Topics</h2>
        <br/>
        <router-link class="yellow" exact to="/">go home>> </router-link>

        <ul>
            <li><router-link exact to="/topic/">/rendering</router-link></li>
            <li><router-link to="/topic/components">/components</router-link></li>
            <li><router-link to="/topic/props-v-state">/props-v-state</router-link></li>
        </ul>
        
        <br/>
        <br/>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
    export default {
        data(){
            return {}
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/base";
    .yellow{
        color: $yellow;
    }
    a.router-link-active{
        color: $blue;
    }
</style>
<template>
    <div>
        <common-nav></common-nav>
        <br/>
        <br/>
        <p>home</p>
    </div>
</template>

<script>
    import CommonNav from '@/modules/nav'

    export default {
        components: {
            CommonNav
        }
    }
</script>

<style lang="scss" scoped>
    p{
        background: linear-gradient(to left,rgba(255,0,0,0.5) 0%,rgba(0,255,0,0.5) 100%);
        font-size: 12px;
    }
</style>
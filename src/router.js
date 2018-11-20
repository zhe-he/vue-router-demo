import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import about from '@/views/about'

// const topic = r => require.ensure([], () => r(require('./views/topic/index.vue')), 'group-topic');
// const topic = () => import(/* webpackChunkName: "group-topic" */ './views/topic')

Vue.use(Router);
const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
        keepAlive: true // 是否缓存
    }
}, {
    path: '/about',
    component: about,
    meta: {
        keepAlive: true
    }
}];

export default new Router({
    // mode: 'history',
    routes
});

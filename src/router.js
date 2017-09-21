import Router from 'vue-router';

// const home = r => require(['./home.vue'], r);
import home from './views/home';
import about from './views/about';

const topic = r => require.ensure([], () => r(require('./views/topic/index.vue')), 'group-topic');
const topicRen = r => require.ensure([], () => r(require('./views/topic/rendering.vue')), 'group-topic');
const topicCom = r => require.ensure([], () => r(require('./views/topic/components.vue')), 'group-topic');
const topicPro = r => require.ensure([], () => r(require('./views/topic/props-v-state.vue')), 'group-topic');

const routes = [{
    path: '/',
    redirect: '/home'
},{
    path: '/home',
    name: 'home',
    component: home,
    meta: {
        keepAlive: true // 是否缓存
    }
},{
    path: '/about',
    component: about,
    meta: {
        keepAlive: true
    }
},{
    path: '/topic',
    component: topic,
    meta: {
        keepAlive: false
    },
    children: [{
        path: '',
        component: topicRen
    },{
        path: 'components',
        component: topicCom
    },{
        path: 'props-v-state',
        component: topicPro
    }],
}];


export default new Router({
    routes
});
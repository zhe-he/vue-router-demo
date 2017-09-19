import Router from 'vue-router';

const find = r => require.ensure([], () => r(require('./views/find.vue')), 'group-find');
const join = r => require.ensure([], () => r(require('./views/join.vue')), 'group-find');

const routes = [{
    path: '/',
    redirect: '/find/'
},{
    path: '/find/:id?',
    name: 'find',
    component: find,
    meta: {
        keepAlive: true
    }
},{
    path: '/join',
    component: join,
    meta: {
        keepAlive: true
    }
}];


export default new Router({
    routes
});
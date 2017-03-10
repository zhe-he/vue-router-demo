const wifi = resolve => require(['./views/wifi.vue'], resolve);
const entertainment = resolve => require(['./views/entertainment.vue'], resolve);
const etmDetail = resolve => require(['./views/etm-detail.vue'], resolve);
const find = resolve => require(['./views/find.vue'], resolve);
const trip = resolve => require(['./views/trip.vue'], resolve);
const personal = resolve => require(['./views/personal.vue'], resolve);

const routers = [{
    path: '/',
    name: 'index',
    component: find,
    meta: {
        keepAlive: true
    }
},{
    path: '/find',
    name: 'find',
    component: find,
    meta: {
        keepAlive: true
    }
},{
    path: '/wifi',
    name: 'wifi',
    component: wifi,
    meta: {
        keepAlive: true
    }
},{
    path: '/entertainment',
    name: 'entertainment',
    component: entertainment,
    meta: {
        keepAlive: true
    }
},{
    path: '/entertainment/:id',
    name: 'etmDetail',
    component: etmDetail,
    meta: {
        keepAlive: true
    }
},{
    path: '/trip',
    name: 'trip',
    component: trip,
    meta: {
        keepAlive: true
    }
},{
    path: '/personal',
    name: 'personal',
    component: personal,
    meta: {
        keepAlive: true
    }
}];


export default routers;
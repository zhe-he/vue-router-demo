const wifi = resolve => require(['./views/wifi.vue'], resolve);
const entertainment = resolve => require(['./views/entertainment.vue'], resolve);
const etmDetail = resolve => require(['./views/etm-detail.vue'], resolve);
const find = resolve => require(['./views/find.vue'], resolve);
const trip = resolve => require(['./views/trip.vue'], resolve);
const personal = resolve => require(['./views/personal.vue'], resolve);

const routers = [{
    path: '/',
    name: 'index',
    component: find
},{
    path: '/find',
    name: 'find',
    component: find
},{
    path: '/wifi',
    name: 'wifi',
    component: wifi
},{
    path: '/entertainment',
    name: 'entertainment',
    component: entertainment
},{
    path: '/entertainment/:id',
    name: 'etmDetail',
    component: etmDetail
},{
    path: '/trip',
    name: 'trip',
    component: trip
},{
    path: '/personal',
    name: 'personal',
    component: personal
}];


export default routers;
const chat = resolve => require(['./views/chat.vue'], resolve);
const chatDetail = resolve => require(['./views/chat-detail.vue'], resolve);
const find = resolve => require(['./views/find.vue'], resolve);
const friend = resolve => require(['./views/friend.vue'], resolve);
const personal = resolve => require(['./views/personal.vue'], resolve);

const routers = [{
    path: '/',
    name: 'index',
    component: chat
},{
    path: '/chat',
    name: 'chat',
    component: chat
},{
    path: '/chat/:id',
    name: 'chatDetail',
    component: chatDetail
},{
    path: '/friend',
    name: 'friend',
    component: friend
},{
    path: '/find',
    name: 'find',
    component: find
},{
    path: '/personal',
    name: 'personal',
    component: personal
}];


export default routers;
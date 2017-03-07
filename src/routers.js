const index = resolve => {
    require.ensure(['./views/index.vue'], () => {
        resolve(require('./views/index.vue'));
    });
};
const chat = resolve => {
    require.ensure(['./views/chat.vue'], () => {
        resolve(require('./views/chat.vue'));
    });
};
const find = resolve => {
    require.ensure(['./views/find.vue'], () => {
        resolve(require('./views/find.vue'));
    });
};
const friend = resolve => {
    require.ensure(['./views/friend.vue'], () => {
        resolve(require('./views/friend.vue'));
    });
};
const personal = resolve => {
    require.ensure(['./views/personal.vue'], () => {
        resolve(require('./views/personal.vue'));
    });
};


const routers = [{
    path: '/',
    name: 'index',
    component: index
},{
    path: '/chat',
    name: 'chat',
    component: chat
},
{
    path: '/friend',
    name: 'friend',
    component: friend
},
{
    path: '/find',
    name: 'find',
    component: find
},
{
    path: '/personal',
    name: 'personal',
    component: personal
}];


export default routers;
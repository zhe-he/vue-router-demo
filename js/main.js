import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import FastClick from 'fastclick';
import "../css/reset.scss";
import "../css/index.scss";

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

FastClick.attach(document.body);

/*
router.beforeEach((to, from, next) => {
    next();
});*/


new Vue({
    router
}).$mount('#app');
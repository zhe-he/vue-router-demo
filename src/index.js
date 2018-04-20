import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app'
import nav from './modules/nav'
import FastClick from 'fastclick'
import 'babel-polyfill'
import './libs/autosize.js'


Vue.component('common-nav', nav);
Vue.config.productionTip = false;

FastClick.attach(document.body);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

import '@babel/polyfill'
import Promise from 'promise-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app'
import FastClick from 'fastclick'
import './libs/autosize.js'

if (!window.Promise) {
    window.Promise = Promise
}
Vue.config.productionTip = false;

FastClick.attach(document.body);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

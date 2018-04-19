import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app'
import nav from './modules/nav'

Vue.component('common-nav', nav);
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

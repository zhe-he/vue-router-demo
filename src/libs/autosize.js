/* 
 * by zhe-he
 * 特别说明 1rem = 100px
 */
import FastClick from 'fastclick';
import Promise from 'promise-polyfill'; 
require("../styles/reset.scss");
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth =  docEl.clientWidth || doc.body.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                clientWidth = 640;
            }
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
})(document, window);

window.addEventListener('DOMContentLoaded',()=>{
    FastClick.attach(document.body);
    recalc();
},false);

if (!window.Promise) {
  window.Promise = Promise;
}
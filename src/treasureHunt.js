import "./styles/index.scss";
import Vue from "vue";
var level = require('./data/level');

new Vue({
    el: "#app",
    data: {
        scale: window.innerHeight/1000,
        showRule: false,
        showPrize: false,
        prize: [{has:false},{has:false},{has:false},{has:false}],
        card1: level.level1,
        card2: level.level2,
        card3: level.level3,
        card4: level.level4,
        msg: '',
        showMsg: false,
        msgTimer: null,
        level: 1
    },
    mounted(){
        var isMobile = 'touchstart' in window;
        if (!isMobile) {
            this.$nextTick(()=>{
                var imgs = document.getElementsByTagName('img');
                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].addEventListener('dragstart',(ev)=>{
                        ev.preventDefault();
                    },false);
                }
            });
        }
    },
    methods: {
        showToast(card){
            // if (this.showMsg) {
            //     return ;
            // }
            if (card.prize == 4 && this.prize[3].has) {
                // ajax
                var url = "/send?id=" + window.openId;
                fetch(url); 
            }
            clearTimeout(this.msgTimer);
            this.showMsg = true;
            if (this.prize[3].has) {
                this.msg = '您已集齐所有的碎片';
            }else{
                this.msg = card.text;
            }
            if (card.prize > 0) {
                this.prize[card.prize-1].has = true;
            }
            
            this.msgTimer = setTimeout(()=>{
                this.showMsg = false;
                if (card.prize > 0 && card.prize < 4) {
                    this.level = card.prize+1;
                }
                if (card.prize == 4) {
                    this.showPrize = true;
                }

            },1500);
            
        }
    }
});




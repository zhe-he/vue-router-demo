import "./styles/index.scss";
import Vue from "vue";
import querystring from "querystring";
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
        level: 0,
        tips: ["这一关的线索是跟“记录”有关哦","这一关的线索是“绿色”","这一关的提示是凉快","这一关的提示是“美妙”"],
        rPrize: {},
        isEnd: false
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
        this.rPrize = this.rndPrize();
    },
    methods: {
        rndPrize(){
            var t = Math.random();
            var msgL = "恭喜您，找齐碎片。获得";
            var msgR = "礼品。请截图本页按规则领取奖品哦。";
            if (t <= 50/2500) {
                return {msg: msgL + '电影票' + msgR, code: 3};
            }else if(t <= 150/2500){
                return {msg: msgL + '文具包' + msgR, code: 2};
            }else if(t <= 650/2500){
                return {msg: msgL + '华府定制Q版公仔' + msgR, code: 1};
            }else{
                return {msg:"抱歉您未获得礼品，可以转发朋友圈再试试哦。",code:0};
            }
        },
        showToast(card){
            // if (this.showMsg) {
            //     return ;
            // }
            if (card.prize == 4 && !this.isEnd) {
                this.isEnd = true;
                // ajax
                var json = {
                    "id": window.openId,
                    "prize": this.rPrize.code,
                    "msg": this.rPrize.msg
                }
                var url = "/send?" + querystring.stringify(json);
                fetch(url); 
            }
            clearTimeout(this.msgTimer);
            this.showMsg = true;

            
            if (card.prize > 0) {
                this.prize[card.prize-1].has = true;
            }
            if (card.prize == 4 && this.isEnd) {
                this.msg = this.rPrize.msg;
            }else{
                this.msg = card.text;
            }
            
            this.msgTimer = setTimeout(()=>{
                this.showMsg = false;
                if (card.prize > 0 && card.prize < 4) {
                    this.level = card.prize+1;
                }
                if (card.prize == 4) {
                    this.showPrize = true;
                    if (this.isEnd) {
                        this.showMsg = true;
                    }
                }

            },1500);
            
        }
    }
});




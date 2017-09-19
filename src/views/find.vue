<template>
    <article>
        <div class="p30">
            <p class="love">~ 为喜欢的照片投票 ~</p>
            <div class="search flex">
                <input type="text" @keydown.enter="search()" placeholder="输入参赛ID进行查找" v-model="id">
                <a class="a_c" @click="search()" href="javascript:;">搜索</a>
            </div>
            
            <section v-if="info.length" class="search-warp">
                <ul class="search-box">
                    <li :key="item.id" v-for="item in list1">
                        <img :style="{'height':3.36/item.ext.width*item.ext.height+'rem'}" :src="item.img">
                        <p><span>{{item.id}}</span><span><i>{{item.ticket}}</i>票</span></p>
                        <a @click="vote(item.id)" href="javascript:;" class="a_c">为TA投票</a>                 
                    </li>
                </ul>
                <ul class="search-box">
                    <li :key="item.id" v-for="item in list2">
                        <img :style="{'height':3.36/item.ext.width*item.ext.height+'rem'}" :src="item.img">
                        <p><span>{{item.id}}</span><span><i>{{item.ticket}}</i>票</span></p>
                        <a @click="vote(item.id)" href="javascript:;" class="a_c">为TA投票</a>                 
                    </li>
                </ul>
            </section>
            <p v-if="!$route.params.id" @click="addMore()" class="more">查看更多</p>
            <section v-if="!loading && info.length==0" class="no-search-result">
                <h4>没有搜索到此编号</h4>
                <p>该编号没有搜索结果可能是：</p>
                <p>1、您输入了错误的编号，请重新输入</p>
                <p>2、该编号审核还没有通过，请耐心等待</p>
            </section>
            <a v-if="!isApp" @click="openApp()" href="javascript:;" class="a_c openwf">打开往返APP，获取2倍投票机会</a>
            <p class="say">五一的到来让人欢欣不已，一场三天两晚说走就走的短途旅行就是现在。这次的旅途让我们留住最美的风景，留下他们最美的瞬间，随手拍旅途中遇到的最美乘务员、最美旅客，上传照片参与活动，留住最美瞬间，赢取最佳礼物。</p>

            <h3><span>活动奖品</span></h3>
            <ul class="prize clearfix">
                <li v-for="(item,index) in prize">
                    <img :src="item.src" alt="">
                    <p>{{item.content}}</p>
                </li>
            </ul>

            <h3><span>活动规则</span></h3>
            <ol class="rule">
                <li>
                    <i>1</i>
                    <p>出行途中拍下你认为最美的人，如：最美乘务员、最美旅客，将图片上传至活动页面参加活动，并获得唯一用户号码。</p>
                </li>
                <li>
                    <i>2</i>
                    <p>上传后图片将进行审核，参与活动的用户可以通过用户号码搜索的方式查看审核是否通过，上传后24小时内完成审核。</p>
                </li>
                <li>
                    <i>3</i>
                    <p>活动时间：5月22日——6月1日<br/>获奖名单公布：6月2日</p>
                </li>
                <li>
                    <i>4</i>
                    <p>照片审核通过后通过投票方式选取获奖用户，可以进行拉票。</p>
                </li>
                <li>
                    <i>5</i>
                    <p>最终解释权归航美在线网络科技有限公司所有。</p>
                </li>
            </ol>
        </div>

        <div class="h127"></div>
        <div class="join">
            <router-link tag="a" class="a_c" to="/join">我要参赛</router-link>
        </div>

    </article>
</template>

<style lang="sass" scoped>
    @import "../styles/base";
    .p30{
        padding: 0 0.3rem;
    }
    .love{
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.28rem;
        text-align: center;
        color: $yellow;
    }
    .no-search-result{
        padding: 0.9rem 0;
        > h4{
            margin-bottom: 0.63rem;
            height: 0.42rem;
            line-height: 0.42rem;
            font-size: 0.32rem;
            color: $yellow;
            text-align: center;
            font-weight: normal;
        }
        > p{
            padding: 0 0.1rem;
            line-height: 0.46rem;
            font-size: 0.28rem;
            color: $yellow;
        }
    }
    .search{
        input,a{
            display: block;
            height: 0.42rem;
            line-height: 0.42rem;
            font-size: 0.28rem;
            border: 1px solid #fcae16;
            padding: 0.14rem 0;
            border-radius: 0.05rem;
        }
        input{
            width: 4.93rem;
            margin-right: 0.1rem;
            @include bg('search.png',0.3rem,0.3rem);
            background-position: 0.2rem center;
            padding: 0.14rem 0.2rem 0.14rem 0.6rem;
            color: $yellow;
            background-color: #fff;
        }
        a{
            width: 1.04rem;
            color: #fff;
            background-color: #ffc001;
            text-align: center;

        }
    }
    .search-warp{
        padding-top: 0.3rem;
        display: flex;
        justify-content: space-between;
    }
    .search-box{
        width: 3.36rem;
        > li{
            margin-bottom: 0.3rem;
            &:last-child{
                margin-bottom: 0;
            }
            > img{
                display: block;
                width: 100%;
            }
            > p{
                display: flex;
                justify-content: space-between;
                height: 0.64rem;
                line-height: 0.64rem;
                color: $yellow;
                font-size: 0.28rem;
                > span{
                    display: block;
                    flex: 1;
                    i{
                        color: #ff4f1a;
                    }
                    &:last-child{
                        text-align: right;
                    }
                }
            }
            > a{
                display: block;
                width: 2.3rem;
                height: 0.6rem;
                line-height: 0.6rem;
                margin: 0 auto;
                border-radius: 0.3rem;
                text-align: center;
                color: #fff;
                font-size: 0.28rem;
                background-color: $blue;
            }
        }
    }
    .more{
        color: $blue;
        font-size: 0.28rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
    }
    .openwf{
        display: block;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        margin-top: 0.15rem;
        text-align: center;
        color: #fff;
        background-color: $origin;
        border-radius: 0.4rem;
    }
    .say{
        padding: 0.35rem 0 0.1rem;
        font-size: 0.28rem;
        line-height: 0.42rem;
        color: $yellow;
        text-align: justify;
    }
    h3{
        position: relative;
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.32rem;
        text-align: center;
        color: #fff;
        font-weight: normal;
        &:before{
            content: "";
            position: absolute;
            top: 0.24rem;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: $yellow;
        }
        &:after{
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -0.85rem;
            margin-top: -0.26rem;
            width: 1.71rem;
            height: 0.52rem;
            @include bg('bg-icon.png');
        }
        span{
            z-index: 10;
            position: relative;
        }
    }
    .prize{
        padding: 0.3rem 0;
        li{
            width: 3.35rem;
            &:nth-child(2n+1){
                float: left;
            }
            &:nth-child(2n){
                float: right;
            }
            > img{
                width: 100%;
            }
            > p{
                @include eps;
                height: 0.65rem;
                line-height: 0.65rem;
                color: $yellow;
                font-size: 0.28rem;
            }
        }
    }
    .rule{
        padding: 0.25rem 0 0.7rem;
        li{
            position: relative;
            padding-left: 0.7rem;
            font-size: 0.28rem;
            > i{
                position: absolute;
                top: 0;
                left: 0;
                width: 0.44rem;
                //height: 0.43rem;
                //line-height: 0.43rem;
                line-height: 1;
                padding:0.1rem 0 0.05rem;
                text-align: center;
                color: #fff;
                @include bg('star.png');
            }
            p{
                line-height: 0.49rem;
                color: $yellow;
                text-align: justify;
            }
        }
    }
    .join{
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        @include common-fixed(auto);
        bottom: 0;
        height: 1.27rem;
        background-color: #fffbe9;
        box-shadow: 0 -0.02rem 0.03rem #d9cc8d;
        > a{
            display: block;
            width: 5.9rem;
            height: 0.8rem;
            line-height: 0.8rem;
            border-radius: 0.4rem;
            color: #fff;
            font-size: 0.32rem;
            background-color: $blue;
            text-align: center;
        }
    }
    .h127{
        height: 1.27rem;
    }

    ::-webkit-input-placeholder { 
        color: $lightyellow;
    }
    :-moz-placeholder {
        color: $lightyellow;
    }
    ::-moz-placeholder { 
        color: $lightyellow;
    }
    :-ms-input-placeholder { 
        color: $lightyellow;
    }
</style>

<script>
    var crypto = require("crypto");
    import axios from 'axios';
    const querystring = require('querystring');
    import {URL_SELECT,URL_VOTE,URL_GETINFO} from "inter";
    import fetchJsonp from 'fetch-jsonp';
    import WFApp from "WFApp";
    import { mapState,mapMutations,mapActions } from 'vuex';
    const wfApp = new WFApp();
    export default {
        data(){
            return {
                prize: [
                    {
                        "src": "images/tmp/prize1.jpg",
                        "content": "【特等奖】七彩云南双人游"
                    },
                    {
                        "src": "images/tmp/prize2.jpg",
                        "content": "【一等奖】拍立得"
                    },
                    {
                        "src": "images/tmp/prize3.jpg",
                        "content": "【二等奖】小米手环"
                    },
                    {
                        "src": "images/tmp/prize4.jpg",
                        "content": "【三等奖】50元话费充值卡"
                    }
                ],
                id: this.$route.params.id || "",
                info: [],
                list1: [],
                list2: [],
                page: 0,
                limit: 4,
                hasMore: true,
                isApp: wfApp.version != ""
            }
        },
        computed: {
            ...mapState(["loading"])
        },
        watch: {
            info:{
                handler(val){
                    var list1 = [],list2 = [];
                    val.forEach(item=>{
                        if (this.findSmall(list1,list2)>0) {
                            list2.push(item);
                        }else{
                            list1.push(item);
                        }
                    });
                    this.list1 = list1;
                    this.list2 = list2;
                },
                deep: true
            }
        },
        mounted(){
            this.get();
        },
        methods:{
            ...mapActions(["_alert"]),
            ...mapMutations(["showLoad","hideLoad"]),

            get(){
                if (this.id) {
                    this.single();
                }else{
                    this.multiple();
                }
            },
            single(){
                this.hasMore = false;
                const url = URL_SELECT + '?param=' + JSON.stringify({
                    id: this.id,
                    platform: 'web'
                });
                this.showLoad();
                fetchJsonp(url)
                    .then(response=>response.json())
                    .then(data=>{
                        this.hideLoad();
                        if (data.error_code == 0) {
                            data.data.ext = JSON.parse(data.data.ext);
                            this.info = [data.data];
                        }else{
                            this.info = [];
                        }
                        
                    })
                    .catch(e=>{
                        this.hideLoad();
                        console.log(e);
                    })
            },
            multiple(){
                this.page = 0;
                this.info = [];
                this.addMore();
            },
            addMore(){
                const url = URL_GETINFO + '?param=' + JSON.stringify({
                    "page": this.page++,
                    "limit": this.limit,
                    "platform": "web"
                });
                this.showLoad();
                fetchJsonp(url)
                    .then(response=>response.json())
                    .then(data=>{
                        this.hideLoad();
                        if (data.error_msg==0) {
                            data.data.info = data.data.info || []
                            if (data.data.info.length==0) {
                                this.info.length>0 && this._alert("没有更多数据了");
                                return ;
                            }
                            for(var value of data.data.info){
                                value.ext = JSON.parse(value.ext);
                            }
                            
                            this.info = this.info.concat(data.data.info);

                            if (this.info.length==0 || this.page>=Math.ceil(data.data.total/this.limit)) {
                                this.hasMore = false;
                            }else{
                                this.hasMore = true;
                            }

                        }
                    })
                    .catch(e=>{
                        this.hideLoad();
                        console.log(e);
                    })
            },
            vote(id){
                var index = this.findInfo(id);
                if (index!=-1) {
                    this.showLoad();
                    axios(URL_VOTE,{
                        "method": "POST",
                        "cache-control": "no-cache",
                        "mode": "cors",
                        "headers": {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "APPVER": wfApp.version
                        },
                        "body": querystring.stringify({
                            param: JSON.stringify({
                                "id": id,
                                "platform": "web",
                                "sign": crypto.createHash("md5").update(`2017yunying_duanwu_key${id}web`).digest("hex")
                            })
                        })
                    })
                        .then(response=>response.json())
                        .then(data=>{
                            this.hideLoad();
                            if (data.error_code==0) {
                                if (data.data.flag == 1) {
                                    this.info[index].ticket++;
                                    this._alert("投票成功");
                                }else{
                                    this._alert("投票机会用完了，明天再来吧");
                                }
                            }else{
                                this._alert(data.error_msg.replace('，','<br/>'));
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                            this.hideLoad();
                            this._alert("服务器错误，请稍后再试");
                        });
                
                }
            },
            findInfo(id){
                for(var i=0;i<this.info.length;i++){
                    if (this.info[i].id == id) {
                        return i;
                    }
                }
                return -1;
            },
            openApp(){
                wfApp.open();
            },
            findSmall(a,b){
                var h1 = 0, h2 = 0;
                a.forEach(item=>{
                    h1 += (100/item.ext.width*item.ext.height)||100;
                });
                b.forEach(item=>{
                    h2 += (100/item.ext.width*item.ext.height)||100;
                });
                return h1-h2;
            },
            search(){
                var to = this.id?{name:"find",params:{id:this.id}}:{name:"find"};
                this.$router.push(to);
                this.get();
            }
        }
    }
</script>
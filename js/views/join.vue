<template>
    <article>
        <p class="contentTitle">上传照片开始参与</p>
        <div class="infoForm">
            <div class="phoneNum">
                <span>手机号:</span>
                <div>
                    <input maxlength="11" type="tel" v-model="tel" placeholder="手机号方便中奖后联系">
                </div>
            </div>
            <div class="verifyCode">
                <span>验证码:</span>
                <div>
                    <input maxlength="6" v-model="code" type="tel">
                    <a @click="sendCode()" href="javascript:;" :class="['sentBtn',iCount==60?'a_c':'sent']">{{codeMsg}}</a>
                </div>

            </div>
            <div class="addPhotos">
                <span>添加照片:</span>
                <div>
                    <a href="javascript:;">
                        <i v-show="!imgSrc">
                            <b>上传参赛照片</b>
                        </i>
                        <img v-show="imgSrc" :src="imgSrc" />
                        <input type="file" id="file" accept="image/*" name="file">  
                    </a>
                    <p>参赛照片大小需小于1MB</p>
                </div>
            </div>

        </div>
        <a href="javascript:;" @click="submit()" class="a_c comfirmBtn">确认参加</a>
        <div class="activeRules">
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
        <div :class="['uploadSucc',isJoinEnd?'active':'']">
            <h2>
                上传成功<br>
                <span>您的参赛ID:{{resultId}}</span>
            </h2>
            <a class="a_c" @click="gohome()">我记住了</a>
        </div>
        <div :class="['isConfirm',isJoin?'active':'']">
            <h2>
                您是否确认参赛？<br>
                图片上传后不能修改
            </h2>
            <a href="javascript:;" @click="isJoin=false" class="a_c cancel">取消</a>
            <a href="javascript:;" @click="join()" class="a_c sure">确认</a>

        </div>
    </article>
</template>

<style lang="sass" scoped>
    @import "../../css/base";
    .contentTitle{
        width:3.01rem;
        margin:.07rem auto;
        line-height: 0.54rem;
        font-size: 0.32rem;
        text-align: center;
        color: #fff;
        font-weight: normal;
        @include bg('bg-icon2.png');
	}
	.infoForm{
	    padding:0.24rem 0 0.1rem;
	    .phoneNum{
        	    padding:0.11rem .31rem;
        	    display:flex;
        	    span{
        	        flex:2;
        	        color:#e09504;
        	        font-size:0.28rem;
                    line-height:0.68rem;
        	    }
        	    div{
        	    flex:7;
        	    display:flex;
        	        input{
                        flex:1;
                        height:0.68rem;
                        font-size:0.28rem;
                        line-height:0.68rem;
                        border: 1px solid #fcae16;
                        padding:0 0.2rem;
                        color:$yellow;
                        border-radius: 0.1rem;
                    }
        	    }

        	}

        .verifyCode{
            @extend .phoneNum;
            div{

                a{
                    flex:1;
                    font-size:0.28rem;
                    border: 1px solid $blue;
                    border-radius: 0.1rem;
                    color:$blue;
                    //width:1.75rem;
                    height:0.68rem;
                    line-height:0.68rem;
                    text-align:center;
                    margin-left:0.12rem;
                    background-color:#fff;
                    vertical-align: bottom;
                    &.sent{
                        border:1px solid #aaa;
                        color:#aaa;
                        background-color:#eee;
                    }
                }
            }

        }
        .addPhotos{
            @extend .phoneNum;
            > span{
                vertical-align: top;
            }
            > div{
                flex-direction: column;

                > a{
                    width:2.42rem;
                    height: 2.42rem;
                    line-height: 2.42rem;
                    position:relative;
                    i{
                        position:absolute;
                        width:2.42rem;
                        height:2.42rem;
                        @include bg('upload.png');
                        z-index: 5;
                        b{
                            padding-top: 1.7rem;
                            display: block;
                            width: 100%;
                            height: 0.32rem;
                            line-height: 0.32rem;
                            text-align: center;
                            color: $blue;
                            font-size:0.28rem;
                        }
                        &.hasImg{
                            @include bg('star.png');
                             z-index: 10;
                        }
                    }
                    img{
                        z-index: 8;
                        position: relative;
                        max-height: 100%;
                        max-width: 100%;
                    }
                    input[type="file"]{
                        opacity: 0;
                        z-index: 10;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        border-radius: 0;
                        border: 0;
                    }

                }
                > p{
                    height: 0.6rem;
                    line-height: 0.6rem;
                    font-size: 0.28rem;
                    color: $yellow;
                }
            }

        }

    }
    $shadowColorBtn: rgba(117,96,249,0.4);
    .comfirmBtn{
        width:5.9rem;
        height:0.8rem;
        border-radius: 1.47rem;
        color:#fff;
        text-align:center;
        font-size:0.32rem;
        line-height:0.8rem;
        background-color: $blue;
        display: block;
        margin: 0 auto;
        box-shadow: 0 .15rem .15rem $shadowColorBtn;
    }
    .activeRules{
        padding: 0 0.3rem;
        margin-top:0.58rem;
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
                height: 0.43rem;
                line-height: 0.43rem;
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
    .uploadSucc{
        display: none;
        z-index:20;
        position:fixed;
        top: 50%;
        left: 50%;
        margin-top: -2rem;
        margin-left: -2.35rem;
        width:4.7rem;
        height:3.64rem;
        background-color:#fed300;
        border-radius:0.1rem;
        h2{
            position:absolute;
            top:0.9rem;
            left:0.97rem;
            font-size:0.36rem;
            font-weight:normal;
            text-align:center;
            span{
                font-size:0.28rem;
            }
        }
        a{
            position:absolute;
            bottom:0.4rem;
            left:0.61rem;
            width:3.48rem;
            height:0.78rem;
            font-size:0.28rem;
            line-height:0.78rem;
            color:#fff;
            background-color:$blue;
            text-align:center;
            border-radius:0.87rem;
        }
        &.active{
            display: block;
            animation: bounceIn 0.6s 0s ease both;
        }
    }
    .isConfirm{
        @extend .uploadSucc;
        .sure{
            left:0.41rem;
            width:1.79rem;
            height:0.78rem;
            border: 1px solid $blue;
            color:$blue;
            background-color:#fff;
        }
        .cancel{
            left:2.5rem;
            width:1.79rem;
            height:0.78rem;
            color:#fff;
            border: 1px solid $blue;
            background-color:$blue;
        }
    }

    @keyframes bounceIn{
        0%{
            opacity:0;
            transform:scale(.3)
        }
        50%{
            opacity:1;
            transform:scale(1.03)
        }
        70%{
            transform:scale(.98)
        }
        100%{
            transform:scale(1)
        }
    }
</style>

<script>
    import { mapMutations,mapActions } from 'vuex';
    import {URL_POSTIMG,URL_POSTINFO,URL_GETCODE} from "inter";
    import fetchJsonp from "fetch-jsonp";
    import lrz from "lrz";
    const RETEL = /^1[3-9]\d{9}$/;

    export default {
        data(){
            return {

                codeMsg: "发送验证码",
                iCount: 60,
                codeTimer: null,
                tel: "",
                code: "",
                imgSrc: "",
                imgPath: "",
                imgWidth: 0,
                imgHeight: 0,
                URL_POSTIMG: URL_POSTIMG,
                resultId: "",
                isJoinEnd: false,
                isJoin: false,
                isUpImg: false
            }
        },
        watch: {
            imgSrc(val){
                if (val) {
                    var _this = this;
                    var image = new Image();
                    image.onload = function (){
                        this.onerror = this.onload = null;
                        _this.imgWidth = this.width;
                        _this.imgHeight = this.height;
                    }
                    image.onerror = function (){
                        this.onerror = this.onload = null;
                        _this.imgWidth = 0;
                        _this.imgHeight = 0;
                    }
                    image.src = val;
                }
            }
        },
        mounted(){
            var _this = this;
            this.$nextTick(()=>{
                document.getElementById('file').addEventListener('change',function (){
                    _this.upFile(this.files[0]);
                });
            });
            
        },
        methods:{
            ...mapActions(["_alert"]),
            ...mapMutations(["showLoad","hideLoad"]),
            sendCode(){
                if (this.iCount!=60) {
                    return ;
                }
                if (!RETEL.test(this.tel)) {
                    this._alert("请输入正确的手机号码");
                    return ;
                }
                const url = URL_GETCODE + "?param=" + JSON.stringify({
                    "type": 101,
                    "mobile": this.tel,
                    // "text": "您正在进行往返端午送大礼活动，验证码为：{code}，30分钟之内有效",
                    "platform": "web"
                });

                
                var fn = () => {
                    if (this.iCount-- <= 0) {
                        this.iCount = 60;
                        this.codeMsg = "获取验证码";
                        clearInterval(this.codeTimer);
                    }else{
                        this.codeMsg = this.iCount + 's后重发';
                    }
                };
                clearInterval(this.codeTimer);
                fn();
                this.codeTimer = setInterval(fn,1000);

                fetchJsonp(url)
                    .then(response=>response.json())
                    .then(data=>{
                        if (data.error_code==0) {
                            this._alert("发送成功");
                        }else{
                            this._alert(data.error_msg);
                            this.iCount = 60;
                            this.codeMsg = "获取验证码";
                            clearInterval(this.codeTimer);
                        }
                    })
                    .catch(e=>{
                        this._alert("服务器错误，请稍后再试");
                        console.log(e);
                    })
            },
            join(){
                if (this.isUpImg) {
                    this._alert("图片上传中，请稍后...");
                    return false;
                }
                this.showLoad();
                const url = URL_POSTINFO + "?param=" + JSON.stringify({
                    url: this.imgPath,
                    mobile: this.tel,
                    randcode: this.code,
                    type: 101,
                    ext: {
                        width: this.imgWidth,
                        height: this.imgHeight
                    },
                    platform: "web"
                });
                fetchJsonp(url)
                    .then(response=>response.json())
                    .then(data=>{
                        this.hideLoad();
                        this.isJoin = false;
                        if (data.error_code==0) {
                            this.resultId = data.data.result;
                            this.isJoinEnd = true;

                        }else{
                            this._alert(data.error_msg);
                        }
                    })
                    .catch(e=>{
                        this.hideLoad();
                        this._alert("服务器错误，请稍后再试");
                        console.log(e);
                    })
            },
            clear(){
                this.tel = "";
                this.code = "";
                this.iCount = 60;
                this.codeMsg = "获取验证码";
                clearInterval(this.codeTimer);
                this.imgSrc = "";
                this.imgPath = "";
                this.isJoinEnd = false;
            },
            gohome(){
                this.clear();
                this.$router.push({name:"find"});
            },
            submit(){
                if (!RETEL.test(this.tel)) {
                    this._alert("请填写正确的手机号码");
                    return ;
                }
                if (!this.code.trim()) {
                    this._alert("请填写验证码");
                    return ;
                }
                if (!this.imgSrc) {
                    this._alert("请上传参赛照片");
                    return ;
                }
                this.isJoin = true;
            },
            upFile(file){
                lrz(file,{quality:0.7}).then((rst)=>{
                    if (this.byte2MB(rst.origin.size)>1) {
                        this._alert('参赛照片大小需小于1MB');
                    }else{
                        this.imgSrc = rst.base64;
                        var formData = new FormData();  
                        formData.append('file', file); 
                        this.isUpImg = true;
                        fetch(URL_POSTIMG,{
                            method: "POST",
                            body: formData
                        })
                            .then(response=>response.json())
                            .then(data=>{
                                this.isUpImg = false;
                                if (data.error_code==0) {
                                    this.imgPath = data.data.path;
                                }else{
                                   this._alert('上传图片失败，请重试');
                                }
                            })
                            .catch(e=>{
                                this.isUpImg = false;
                                this._alert('服务器错误，请稍后再试');
                                console.log(e);
                            });
                    }
                })
                .catch((e)=>{
                    console.log(e);
                });
            },
            byte2MB(bytes){
                return bytes/1024/1024;
            }
        }
    }
</script>
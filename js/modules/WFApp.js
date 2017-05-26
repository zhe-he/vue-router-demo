import {isIos,isWeixin} from 'method';

class WFApp{
    constructor(){
        // this.iosDownUrl = 'https://itunes.apple.com/cn/app/qq/id1076496434';
        this.downUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.airmedia_commute.passenger&ckey=CK1361898001974';
        this.appUrl = 'wangfan://';
        var reVersion = /(iOSApp|AndroidApp)\/wangfan\s+(\d+\.\d+\.\d+)/i.exec(window.navigator.userAgent);
        this.version = reVersion != null? reVersion[2]: "";
    };
    open(){
        if (isWeixin) {
            this.to(this.downUrl);
        }else{
            this.to(this.appUrl);
            setTimeout(()=>{
                this.to(this.downUrl);
            },3000);
        }
    };
    to(url){
        window.location.href = url;
    };

}

export default WFApp;
### 接口地址    
微信openId 在index.html 第13行 ， window.openId = 'wxId123456'   
上传接口url 在 treasureHunt.js 152行，  
var json = {
    "id": window.openId,  
    "prize": this.rPrize.code,   // 0 -> 没中奖,1 -> Q版公仔,2 -> 文具包,3 -> 电影票
    "msg": this.rPrize.msg // 中奖的文案说明
}
`var url = "/send"`   GET 请求 id 、 prize 、 msg    
$_GET['id'] ...  

### 图片替换    
`我的奖品`图片在 images/static/prize.png 
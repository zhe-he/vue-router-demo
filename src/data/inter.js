var hostname = window.location.hostname;
var isTest = /^localhost|^10\.10\.\d{2}\.|^api.test.amol.com.cn/.test(hostname);
var isStg = /^api.stg.amol.com.cn/.test(hostname);


var host = '';
if (isTest) {
    host = 'http://api.test.amol.com.cn:8083';
}else if(isStg){
    host = 'http://api.stg.amol.com.cn:8082';
}else{
    host = 'http://api.amol.com.cn:8082';
}
const URL_GETCODE = host + '/api/web/v1/user/getrandcode'; // 获取验证码
const URL_POSTINFO = host + '/api/web/v1/active/postinfo'; // 运营活动提交图片+手机号
const URL_SELECT = host + '/api/web/v1/active/select'; // 端午根据id查询
const URL_VOTE = host + '/api/web/v1/active/vote'; // 端午活动投票
const URL_GETINFO = host + '/api/web/v1/active/getinfo'; // 端午活动首页
const URL_POSTIMG = host + '/api/web/v1/active/postimages'; // 上传图片     

export {
    host,
    URL_GETCODE,
    URL_POSTINFO,
    URL_SELECT,
    URL_VOTE,
    URL_GETINFO,
    URL_POSTIMG
}
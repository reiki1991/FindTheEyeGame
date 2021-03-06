/**
 * Created by Administrator on 2016/6/29 0029.
 */
var Http = {
    prefix: "http://201607moco.gz.e2capp.com/api/data.php",
    request: function(url, data, success, error, method ){
        $.ajax({
            url: Http.prefix + url,
            type: method ? method : "POST",
            data: data || {},
            success: function(_res){
                if(typeof _res == "string"){ _res = eval("("+_res+")"); }
                success && success(_res);
            },
            error: function(xhr, type){
                console.log("来自"+url+"的error xhr: "+JSON.stringify(xhr));
                var err = {};
                try {
                    var d = $.parseJSON(xhr.responseText);
                    err = $.extend(err, d);
                } catch (e) {
                    err.Msg = xhr.responseText || "网络错误，请稍后重试._来自http.request.error";
                }
                var r = error && error(err);
                if (r !== false) {
                    log(err.Msg || err.Message);
                }
            }
        });
    },
    actionTotal: function(code, success, error){ //会员统计数据
        var data = {
            "action": "total",
            "code": code
        }
        this.request("", data, function (_data) {
            if(_data==2){
                console.log("请输入正确的code");
            }
            success &&　success(_data);
        }, error);
    },
    checkLogin: function(success, error){ //判断是否登陆
        var data = {
            "action": "checkLogin"
        }
        this.request("", data, success, error);
    },
    getuserinfo: function(success, error){ //获取登陆用户自己的用户资料
        var data = {
            "action": "getuserinfo"
        }
        this.request("", data, success, error);
    },
    updateinfo: function(username, mobile, success, error){ //填写用户资料
        var data = {
            "action": "updateinfo",
            "username": username,
            "mobile": mobile
        }
        this.request("", data, success, error);
    },
    updateaddr: function(addr, success, error){ //提交用户地址
        var data = {
            "action": "updateaddr",
            "addr": addr
        }
        this.request("", data, success, error);
    },
    goprize: function(success, error){ //抽奖
        var data = {
            "action": "goprize"
        }
        this.request("", data, success, error);
    }
}
module.exports = Http;
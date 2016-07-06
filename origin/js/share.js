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
    }
}
//微信分享
var imgUrl1 = "http://201607moco.gz.e2capp.com/imgs/share.jpg";
var link = "http://201607moco.gz.e2capp.com/index.php?uid=1";
var desc = "参与寻找巴巴爸爸赢取大奖！7.21MO&Co.年度大秀敬请期待！";
var title = "寻找巴巴爸爸";
//alert(imgUrl+","+link+","+desc+","+title);
function weixin(imgUrl,link,desc,title){
    wx.ready(function () {
        // 在这里调用 API
        //分享到朋友圈
        var sharetitle=title;
        var sharelink=link;
        var shareImg=imgUrl;
        var shareDesc = desc;
        wx.onMenuShareTimeline({
            title: shareDesc, // 分享标题
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                Http.actionTotal("indexshare");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享给好友
        wx.onMenuShareAppMessage({
            title: sharetitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                Http.actionTotal("indexshare");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: sharetitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                Http.actionTotal("indexshare");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到微博
        wx.onMenuShareWeibo({
            title: sharetitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                Http.actionTotal("indexshare");

            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    wx.error(function(res){
        //alert("接口处理失败");
    });
};
weixin(imgUrl1,link,desc,title);
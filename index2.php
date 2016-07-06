<?php
session_start();
error_reporting(E_ERROR | E_PARSE);


$wx_login = "http://wx.e2capp.com/auth.ashx?serv_name=201607moco";

//$_SESSION['bola20160701'] =null;
if ($_SESSION['bola20160701'] == null)
{

    //$wx_login .= '&backurl=' . urlencode($_SERVER["REQUEST_URI"]);

    // if(isset($_GET['midea'])) {
    //  $wx_login .= "&midea=$midea";
    // }

    // if(isset($_GET['uid'])) {
    //  $wx_login .= "&uid=friend";
    // }


    header("Location:$wx_login");
    //exit;
}
else
{
    $MemberId = $_SESSION['bola20160701'];
    //echo $MemberId;
    // include 'lib/db/Init.php'; //包含数据库操作类
    //  $dto = $db->table('member')->where('memberid='.$MemberId )->find();//获取会员管理信息
//  if($dto==null)
//  {
//      $_SESSION['bola20160701'] = null;
//      header("Location:$wx_login");
//  }
//

}

?>
<!DOCTYPE html>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script type="text/javascript">
    //封装ajax
    function ajaxPackage2(url,jsonData,callback){
        url = url||"wxtemp.php";
        $.ajax({
            url:url,
            type:"post",
            data:jsonData,
            success:callback
        });
    }

    var wxurl = window.location.href;
    //判断登陆
    ajaxPackage2("",{wxurl:wxurl},function(data){

        data = eval("("+data+")");

        var appId=data.appId;
        var timestamp=data.timestamp;
        var nonceStr=data.nonceStr;
        var signature=data.signature;


        wx.config({
            //debug: true,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature:signature,
            jsApiList: [
                // 所有要调用�?API 都要加到这个列表�?
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'playMusic',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'getLatestAddress',
                'editAddress',
                'openProductSpecificView',
                'addCard',
                'chooseCard'
            ]
        });



    });
</script>
<script type="text/javascript" src="js/share.js"></script>

</body>
</html>
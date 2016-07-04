/**
 * Created by Administrator on 2016/6/23 0023.
 */
import 'css/public.css'
import "imgs/fm3_active1_2.png"
import "imgs/fm3_active2_2.png"
import "imgs/fm3_active4_2.png"
import Preload from "js/preload.js"
//public
var log = function (m) { (document.ontouchstart!==null) ?  (alert(m)) : (console.log(m)); }
var App = {
    init: function () { //初始化
        //App.fm_enter(".fm_award"); App.lottery_result(); return;
        App.fm_enter(".fm1");
        setTimeout(function () {
            $(".fm1").fadeOut(1000);
            setTimeout(function () {
                App.fm_enter(".fm2");
            },1000)
        },2200)
    },
    tip: function(_info,_style,_hideTime){ //_style的值有'tip_red'、'tip_green',默认值为'tip_default'
        var randomClass = "tip"+Math.round(Math.random()*1000000000);
        var sty = _style?_style:"tip_default"
        var tiphtml = '<div class="tip_box '+sty+' '+randomClass+'">'+_info+'</div>';
        $("body").append(tiphtml);
        setTimeout(function(){ $("."+randomClass).fadeOut(); setTimeout(function(){ $("."+randomClass).remove(); },1000) },_hideTime?_hideTime:2000)
    },
    tiltEvent: null,
    tiltInit: function () {
        var speed = 0, translateX, originDir = 0, nowDir, moveDir;
        if(window.DeviceOrientationEvent) {
            App.tiltEvent = function(e) {
                /*//左右倾斜使背景图移动
                 var tiltLR = e.gamma; //向左倾斜：tiltLR为负数，无倾斜：tiltLR为0，向右倾斜：tiltLR为正数
                 (tiltLR < -15) ? (speed = 0.25) : ((tiltLR < -1) && (speed = 0.12));
                 (tiltLR > -1) && (tiltLR < 1) && (speed = 0);
                 (tiltLR > 15) ? (speed = -0.25) : ((tiltLR > 1) && (speed = -0.12));
                 translateX += speed;
                 (translateX<0) && (translateX = 0);
                 (translateX>70) && (translateX = 70);
                 $("#test").html(speed+"__"+translateX+"__"+tiltLR);
                 $(".fm3_box").css({ '-webkit-transform':"translateX(-"+translateX+"%)",'transform':"translateX(-"+translateX+"%)"});*/

                //左右旋转使背景图移动
                nowDir = e.alpha; //360°旋转
                moveDir = nowDir - originDir;
                (nowDir>(360/2)) ? (moveDir = 360 - nowDir) : (moveDir = -nowDir);
                //$("#test").html(originDir+"__"+translateX+"__"+nowDir);
                if(Math.abs(moveDir)>1.5){
                    translateX = 30;
                    translateX += moveDir/2;
                    (translateX<0) && (translateX = 0);
                    (translateX>70) && (translateX = 70);
                    $(".fm3_box").css({ '-webkit-transform':"translateX(-"+translateX+"%)",'transform':"translateX(-"+translateX+"%)"});
                }
            }
            window.addEventListener('deviceorientation', App.tiltEvent, false);
        } else {
            App.tip("DeviceOrientationEvent is not supported on your device or browser. Sorry.");
        }
    },
    timer_countdown: null,
    countdown: function(_target,_maxNum,_endFun){ //倒计时
        var _num = _maxNum;
        var _obj = $(_target);
        App.timer_countdown = setInterval(function(){
            _obj.html((--_num<10) ? "0"+_num+"'" : _num+"'");
            if(_num < 1){
                clearInterval(App.timer_countdown);
                _endFun();
            }
        },1500);
    },
    timer_blink: null,
    blink: function (_target,_statelen,_repeattime,_gap) { //眨眼睛[Parm:眨眼对象ID，帧数量，重复次数]
        var _obj = $(".fm.cur").find(_target);
        !_obj.length && (_obj=$(_target));
        var state = 1;
        var looptime = 1;
        App.timer_blink = setInterval(function () {
            (++state == (_statelen+1)) && (state = 1) && (++looptime==(_repeattime+1) && clearInterval(App.timer_blink)); //(++state == 4) && (state = 1)
            _obj.removeClass(_obj.data("state")).addClass("state"+state).data("state","state"+state);
        },_gap ? _gap : 250);
    },
    fm_enter:function (_fm) { //频道切换
        (_fm.indexOf("fm_mask") < 0) &&　$(".fm").removeClass("cur");
        $(_fm).addClass("cur");
        //清除上一屏的眨眼操作
        App.timer_blink &&(_fm.indexOf("fm_mask") < 0) && clearInterval(App.timer_blink);
        //频道1执行眨眼操作
        _fm == ".fm1" && App.blink(".fm1", 3, 2);
        //频道3执行眨眼操作
        if(_fm == ".fm3"){
            App.blink(".fm3_active3", 2);
            App.blink(".fm3_active5", 2);
            App.tiltInit();
        }
        //频道fm_result
        (_fm.indexOf("fm_result") > 0) && setTimeout(function (){
            App.blink(".fm_baba", 2, null, 500); //执行眨眼操作
            $(_fm).find(".fm_result_star").addClass("fadeOut"); //星星闪烁操作
        },1200);
        /*//频道fm_noaward
         _fm == ".fm_noaward" && App.blink(".fm_baba", 2);*/
    },
    gameover: function(){ //游戏结束
        var _score = $(".fm3_score").html()-0;
        App.fm_enter((_score > 2) ? ".fm_result1" : ".fm_result2");
        window.removeEventListener('deviceorientation', App.tiltEvent);
    },
    lottery_result: function () {
        //TODO ajax后台获取用户中奖结果,根据结果进入相关结果页面
        var award_data = "fm_award1",
            _ercode = "./imgs/fm_ercode222.png";
        if(award_data=="fm_award1"){ //fm_award1:现金券[后台获取二维码图]
            $(".fm_ercode").css("backgroundImage","url("+_ercode+")");
            $(".fm_award").addClass("fm_award1");
            App.fm_enter(".fm_award");
        }else if(award_data=="fm_award2"){ //fm_award2:手机壳
            $(".fm_award").addClass("fm_award2");
            App.fm_enter(".fm_award");
        }else{
            App.fm_enter(".fm_noaward");
        }
        /*//未中奖页面
         App.fm_enter(".fm_noaward");*/
    }
}
$(document).ready(function () {
    var body_w, body_h;
    var _triggerEvent = (document.ontouchstart!==null) ?  'click' : 'touchstart';
    var scale_fm3_bg = 2551/1206;
    var templ_fm3 = $(".fm3").html();
    var is_mark = false; //是否登记过信息
    //TODO ajax后台检测是否提交过信息，若登陆过更改is_mark的值为true
    Preload.init(App.init); //init事件
    //fm3_active点击事件【眼睛被点击】
    $("body").on(_triggerEvent,".fm3_active",function (e) {
        (e.target.nodeName=="IMG") ? $(this).attr("src",$(this).data("open")).removeClass("fm3_active") : $(this).remove(); //替换打开图片或移除眼睛
        //停止倒计时&加分操作
        clearInterval(App.timer_countdown);
        var _score = $(".fm3_score").html()-0+1;
        $(".fm3_score").html(_score);
        (_score==5) ? App.gameover() : App.fm_enter(".fm_mask2");
    });
    //fm_mask2点击事件【遮罩层点击】
    $("body").on(_triggerEvent,".fm_mask1,.fm_mask2",function () {
        $(this).removeClass("cur");
        App.countdown(".fm3_stopwatch",parseInt($(".fm3_stopwatch").html()),App.gameover);
    });
    //fm2_btn1点击事件【开始游戏】
    $("body").on(_triggerEvent,".fm2_btn1",function () {
        App.fm_enter(".fm3");
        App.fm_enter(".fm_mask1");
    });
    //fm_result2_btn1点击事件【再找一次】
    $("body").on(_triggerEvent,".fm_result2_btn1",function () {
        $(".fm3").html(templ_fm3);
        $(".fm3_box").css("width",scale_fm3_bg*body_h+"px"); //重置fm3_box的宽度
        App.fm_enter(".fm3");
        App.countdown(".fm3_stopwatch",parseInt($(".fm3_stopwatch").html()),App.gameover);
    });
    //fm_result1_btn1点击事件【抽大奖】
    $("body").on(_triggerEvent,".fm_result1_btn1",function () {
        is_mark ? App.lottery_result() : App.fm_enter(".fm_result3");
    });
    //fm_result3_btn1点击事件【提交抽奖信息】
    var phone_regex = new RegExp("1[0-9]{10}");
    $("body").on(_triggerEvent,".fm_result3_btn1",function () {
        var _name = $(".fm_result3_input1").val(), _phone = $(".fm_result3_input2").val();
        function _passFun() {
            //TODO ajax后台用户信息提交
            App.lottery_result();
        }
        (!_name || !_phone) ? App.tip("请将信息填写完整") : ( !phone_regex.test(_phone) ? App.tip("请填写正确的手机号") : _passFun() );
    });
    //fm_award_btn1点击事件【Replay】
    $("body").on(_triggerEvent,".fm_award_btn1",function () {
        window.location.reload();
    });
    //resize
    var isResizing = false; //避免频繁触发resize操作
    $(window).on("load resize",function() {
        if(isResizing) return;
        isResizing = true;
        setTimeout(function(){ isResizing = false; }, 100);
        body_w = document.documentElement.clientWidth;
        body_h = document.documentElement.clientHeight;
        //重置fm3_box的宽度
        $(".fm3_box").css("width",scale_fm3_bg*body_h+"px");
        //旋屏提示
        if(body_w>body_h){
            ($(".prohibit_rotate").css("display")=="none") && $(".prohibit_rotate").show();
        }else{
            ($(".prohibit_rotate").css("display")=="block") && $(".prohibit_rotate").hide();
        }
    });
});
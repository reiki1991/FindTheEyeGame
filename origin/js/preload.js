/**
 * Created by Administrator on 2016/6/28 0028.
 */
import createjs from "js/preloadjs.min.js"
var Preload = {
    manifest: [ //定义相关JSON格式文件列表
        { src: "./imgs/fm1_eye1.png" },
        { src: "./imgs/fm1_eye2.png" },
        { src: "./imgs/fm3_active1_1.png" },
        { src: "./imgs/fm3_active1_2.png" },
        { src: "./imgs/fm3_active2_1.png" },
        { src: "./imgs/fm3_active2_2.png" },
        { src: "./imgs/fm3_active4_1.png" },
        { src: "./imgs/fm3_active4_2.png" },
        { src: "./imgs/fm3_bg.jpg" },
        { src: "./imgs/fm_award2.png" },
        { src: "./imgs/fm_baba1.png" },
        { src: "./imgs/fm_baba2.png" },
        { src: "./imgs/fm_bg.jpg" },
        { src: "./imgs/fm_mask1.png" },
        { src: "./imgs/fm_mask2.png" },
        { src: "./imgs/fm_result1_tit1.png" },
        { src: "./imgs/fm_result2_tit1.png" },
        { src: "./imgs/fm_subok.png" }
    ],
    init: function(_beginFun, _completeFun){ //开始预加载
        _beginFun && _beginFun();
        var _preload = new createjs.LoadQueue(true);
        var _progressObj = $(".loading_bar").children("span");
        //已加载完毕进度
        _preload.on("progress", function() {
            //console.log("已加载 " + (_preload.progress*100|0) + " %");
            _progressObj.css("width",(_preload.progress*100|0) + "%");
        });
        //全度资源加载完毕
        _preload.on("complete", function() {
            //console.log("已加载完毕全部资源");
            $(".fm1").fadeOut(2000, function(){$(".fm1").remove()});
            _completeFun && _completeFun();
        });
        _preload.loadManifest(Preload.manifest);
    }
}
module.exports = Preload;
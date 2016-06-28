/**
 * Created by Administrator on 2016/6/28 0028.
 */
import createjs from "js/preloadjs.min.js"
var Preload = {
    manifest: [ //定义相关JSON格式文件列表
        { src: "./imgs/fm_award_bg1.png" },
        { src: "./imgs/fm_award_btn1.png" },
        { src: "./imgs/fm_award_img1.jpg" },
        { src: "./imgs/fm_award_tit1.png" },
        { src: "./imgs/fm_baba1.png" },
        { src: "./imgs/fm_baba2.png" },
        { src: "./imgs/fm_bg.jpg" },
        { src: "./imgs/fm3_bg.jpg" }
    ],
    init: function(_completeFun){ //开始预加载
        var _preload = new createjs.LoadQueue(true);
        var _progressObj = $(".fm_loading").children("span");
        //已加载完毕进度
        _preload.on("progress", function() {
            console.log("已加载 " + (_preload.progress*100|0) + " %");
            _progressObj.html((_preload.progress*100|0) + " %");
        });
        //全度资源加载完毕
        _preload.on("complete", function() {
            console.log("已加载完毕全部资源");
            $(".fm_loading").fadeOut(2000, function(){$(".fm_loading").remove()});
            _completeFun && _completeFun();
        });
        _preload.loadManifest(Preload.manifest);
    }
}
module.exports = Preload;
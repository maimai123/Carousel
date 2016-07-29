/*

 * Carousel 0.1

 * Copyright (c) 2016 yuyafei http://maimai123.github.io/

 * Date: 2016-7-29

 * 使用Carousel轮播图组件可以方便地让用户实现图片轮播效果。

 */
;(function($){
  $.fn.Carousel = function(options){
    var obj = $(this);
    var defaults = {
      'width' : "640",
      'height' : "480px",
      'speed' : "1000",
      'effect' : "fade",
      'delay' : "200",
      "doc" : true ,
      "arrow" : true
    };
    var opts = $.extend(defaults,options);
    // 设置容器的宽高
    obj.css({
      'width':opts.width,
      'height':opts.height
    });
    // 设置图片的宽高和容器一致
    obj.find("img").css({
      'width':opts.width,
      'height':opts.height
    });
    //轮播图片个数 4
    var length = obj.find('li').length;
    var str = "";
    obj.find(".wrapUl").css({"height":opts.height});
    obj.find(".warp").css({'width':opts.width * length});
    for(var i = 0;i<length;i++){
      str += "<li></li>";
    }
    // 如果显示小圆点
    if( opts.doc ){
      $("<ul class='docBox'>"+str+"</ul>").insertAfter(obj.find("div"));
      $(".docBox li:first").addClass("active");
    }
    // 小圆点情况下，如果效果为淡入淡出
    if( opts.effect == 'fade' ){
      obj.find('.warp li').css({
        "position":'absolute',
        "display":'none'
      }).first().show();
      $(".docBox li").on("click",function(){
        var index = $(this).index();
        setTimeout(function(){
          obj.find('.warp li').stop(false,true).fadeOut(opts.delay).eq(index).fadeIn(opts.delay);
        },opts.delay);
        $(this).addClass("active").siblings().removeClass("active");
      });
    }
    // 小圆点情况下，如果效果为平移
    if( opts.effect == 'move' ){
      $(".docBox li").on("click",function(){
        var index = $(this).index();
        var left = index * opts.width;
        setTimeout(function(){
          obj.children('.warp').animate({"left":-left+"px"},opts.speed);
        },opts.delay);
        $(this).addClass("active").siblings().removeClass("active");
      });
    }
  };

})(jQuery);

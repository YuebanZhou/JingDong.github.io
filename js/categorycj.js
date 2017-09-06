/**
 * Created by lenovo on 2017/7/30.
 */
window.onload=function () {
    leftScroll();
    rightScroll();
};
/*左侧导航卷曲函数*/
var move=function (parent,child) {
    /*添加动画函数*/
    var addTransition = function () {
        child.style.transition = 'all 0.2s';
        child.style.webkitTransition = 'all 0.2s';
    }
    /*移除动画函数*/
    var removeTransition = function () {
        child.style.transition = 'none';
        child.style.webkitTransition = 'none';
    }
    /*移动*/
    var setTranslateY = function (translateY) {
        child.style.transform = 'translateY('+translateY+'px)';
        child.style.webkitTransform = 'translateY('+translateY+'px)';
    }
    /*获取元素*/

    /*定位区域最大*/
    var maxP=0;
    /*定位区域最小*/
    var minP=parent.offsetHeight-child.offsetHeight;
    /*缓冲距离*/
    var distance=100;
    /*实际滑动区域最大*/
    var max=maxP+distance;
    /*实际滑动距离最小*/
    var min=minP-distance;
    /*当前Y值*/
    var currentY=0;
    /*开始位置的Y*/
    var startY=0;
    /*是否滑动*/
    var isMove=false;
    /*Y方向上移动距离*/
    var distanceY=0;

    child.addEventListener("touchstart",function(e) {
        /*开始触摸时Y值*/
        startY= e.touches[0].clientY;
    });
    child.addEventListener("touchmove",function(e) {
        /*时时记录滑动的Y*/
        var moveY= e.touches[0].clientY;
        /*Y方向上移动的距离*/
        distanceY=moveY-startY;
        removeTransition();
        /*如果移动的距离在范围内，导航栏跟着移动走出去相应的距离*/
        if((currentY+distanceY)<max&&(currentY+distanceY)>min) {
            setTranslateY(currentY+distanceY);

        }
        isMove=true;
    });
    child.addEventListener("touchend",function(e) {
        if(isMove) {
            /*触摸结束时判断*/
            /*移动距离比最大值大*/
            if((currentY+distanceY)>maxP) {
                currentY=maxP;
                addTransition();
                setTranslateY(currentY);
                /*移动距离比最小值小*/
            }else if ((currentY+distanceY)<minP) {
                currentY=minP;
                addTransition();
                setTranslateY(currentY);
            }else {
                currentY=currentY+distanceY;
            }
        }
        /*初始化*/
        startY=0;
        isMove=false;
        distanceY=0;
    });
}
var leftScroll=function() {
    var parent=document.querySelector(".left");
    var child=parent.querySelector("ul");
    move(parent,child);
};
var rightScroll=function() {
    new IScroll(".right");
    /*new IScroll(".right",{
        scrollY:false,
        scrollX:true
    })*/
};

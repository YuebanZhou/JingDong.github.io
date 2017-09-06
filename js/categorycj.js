/**
 * Created by lenovo on 2017/7/30.
 */
window.onload=function () {
    leftScroll();
    rightScroll();
};
/*��ർ����������*/
var move=function (parent,child) {
    /*��Ӷ�������*/
    var addTransition = function () {
        child.style.transition = 'all 0.2s';
        child.style.webkitTransition = 'all 0.2s';
    }
    /*�Ƴ���������*/
    var removeTransition = function () {
        child.style.transition = 'none';
        child.style.webkitTransition = 'none';
    }
    /*�ƶ�*/
    var setTranslateY = function (translateY) {
        child.style.transform = 'translateY('+translateY+'px)';
        child.style.webkitTransform = 'translateY('+translateY+'px)';
    }
    /*��ȡԪ��*/

    /*��λ�������*/
    var maxP=0;
    /*��λ������С*/
    var minP=parent.offsetHeight-child.offsetHeight;
    /*�������*/
    var distance=100;
    /*ʵ�ʻ����������*/
    var max=maxP+distance;
    /*ʵ�ʻ���������С*/
    var min=minP-distance;
    /*��ǰYֵ*/
    var currentY=0;
    /*��ʼλ�õ�Y*/
    var startY=0;
    /*�Ƿ񻬶�*/
    var isMove=false;
    /*Y�������ƶ�����*/
    var distanceY=0;

    child.addEventListener("touchstart",function(e) {
        /*��ʼ����ʱYֵ*/
        startY= e.touches[0].clientY;
    });
    child.addEventListener("touchmove",function(e) {
        /*ʱʱ��¼������Y*/
        var moveY= e.touches[0].clientY;
        /*Y�������ƶ��ľ���*/
        distanceY=moveY-startY;
        removeTransition();
        /*����ƶ��ľ����ڷ�Χ�ڣ������������ƶ��߳�ȥ��Ӧ�ľ���*/
        if((currentY+distanceY)<max&&(currentY+distanceY)>min) {
            setTranslateY(currentY+distanceY);

        }
        isMove=true;
    });
    child.addEventListener("touchend",function(e) {
        if(isMove) {
            /*��������ʱ�ж�*/
            /*�ƶ���������ֵ��*/
            if((currentY+distanceY)>maxP) {
                currentY=maxP;
                addTransition();
                setTranslateY(currentY);
                /*�ƶ��������СֵС*/
            }else if ((currentY+distanceY)<minP) {
                currentY=minP;
                addTransition();
                setTranslateY(currentY);
            }else {
                currentY=currentY+distanceY;
            }
        }
        /*��ʼ��*/
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

/**
 * Created by lenovo on 2017/7/27.
 */
window.onload = function () {
    search();
    banner();
    downtime();
};
var search = function () {
    /*获取所需元素*/
    var search_box = document.querySelector(".search_box");
    var banner = document.querySelector(".banner");
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        var opacity = 0;
        if (scrollTop > height) {
            opacity = 0.75;
        } else {
            /*线性变化*/
            opacity = scrollTop / height * 0.75;
        }
        search_box.style.background = "rgba(201,21,35," + opacity + ")"
    };

};

var downtime = function () {
    /*获取所需元素*/
    var divs = document.querySelectorAll(".djs div");
    var time = 1 * 3600;
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;
        divs[0].innerHTML = Math.floor(h / 10);
        divs[1].innerHTML = h % 10;
        divs[3].innerHTML = Math.floor(m / 10);
        divs[4].innerHTML = m % 10;
        divs[6].innerHTML = Math.floor(s / 10);
        divs[7].innerHTML = s % 10;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)
};

var banner = function () {

    /*获取所需元素*/
    var banner = document.querySelector('.banner');
    var width = banner.offsetWidth;
    var img = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var point = pointBox.querySelectorAll('li');
    /*定义事件*/
    var addTransition = function () {
        img.style.transition = 'all 0.2s linear';
        img.style.webkitTransition = 'all 0.2s linear';
    }
    var removeTransition = function () {
        img.style.transition = 'none';
        img.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        img.style.transform = 'translateX(' + translateX + 'px)';
        img.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }
    /*无缝滚*/
    /*定位在图1*/
    /*ul中一共十张图，8 1 2 3 4 5 6 7 8 1*/
    /*图1的索引是1*/
    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*过渡时间和定时器时间没有直接联系*/
        /*过渡时间是图片划过所用时间，定时器时间是切换下一张用的时间*/
        addTransition();
        setTranslateX(-index * width);
    }, 3000);
    /*过渡结束函数*/
    img.addEventListener('transitionend', function () {
        /*索引最大是9（图1），一旦超过9，立刻跳到索引1（图1）*/
        if (index >= 9) {
            index = 1;
            /*跳转的时候不需要过渡*/
            removeTransition();
            setTranslateX(-index * width);
            /*索引最小是0（图8），一旦小于0，立刻跳到索引8（图8）*/
        } else if (index <= 0) {
            index = 8;
        }
        setPoint();
    });
    var setPoint = function () {
        /*遍历所有的li*/
        for (var i = 0; i < point.length; i++) {
            var li = point[i];
            /*移除所有小点的样式属性*/
            li.classList.remove('now');
        }
        /*图片8 1 2 3 4 5 6 7 8 1*/
        /*白点7 0 1 2 3 4 5 6 7 0*/
        /*索引0 1 2 3 4 5 6 7 8 9*/
        /*白点的索引是由图片索引直接减一得到的*/
        point[index - 1].classList.add('now');
    }
    /*进行初始化，定义全局变量*/
    /*开始触摸的位置X方向*/
    var startX = 0;
    /*是否滑动，默认是不滑动*/
    var isMove = false;
    /*滑动的距离*/
    var distance = 0;
    img.addEventListener("touchstart", function (e) {
        /*清除定时器，不再无缝滚动*/
        clearInterval(timer);
        /*记录此时的位置X方向*/
        startX = e.touches[0].clientX;
    });
    img.addEventListener("touchmove", function (e) {
        /*时时记录X方向的位置*/
        var moveX = e.touches[0].clientX;
        /*滑动的距离*/
        distance = moveX - startX;
        var translateX = -index * width + distance;
        /*触摸滑动的时候不应该有动画效果*/
        removeTransition();
        /*图片跟随手指走*/
        /*图片划过去的距离就是ul划出去的距离*/
        /*ul划出去的距离是已经划出去图片的宽度加上触摸滑动的距离*/
        setTranslateX(translateX);
        isMove = true;
    });
    img.addEventListener("touchend", function (e) {
        /*如果滑动过*/
        if (isMove) {
            /*判断滑动距离是否小于图片宽度的1/3*/
            if (Math.abs(distance) < width / 3) {
                /*小于的话，吸附回去*/
                addTransition();
                setTranslateX(-index * width);
                /*不小于*/
            } else {
                /*大于零，向右划，出现上一张图片*/
                if (distance > 0) {
                    index--;
                    /*小于零，向左划，出现下一张图片*/
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }
        /*清空上一次操作的状态*/
        startX = 0;
        isMove = false;
        distance = 0;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 3000);
    })
};




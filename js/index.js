/**
 * Created by lenovo on 2017/7/27.
 */
window.onload = function () {
    search();
    banner();
    downtime();
};
var search = function () {
    /*��ȡ����Ԫ��*/
    var search_box = document.querySelector(".search_box");
    var banner = document.querySelector(".banner");
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        var opacity = 0;
        if (scrollTop > height) {
            opacity = 0.75;
        } else {
            /*���Ա仯*/
            opacity = scrollTop / height * 0.75;
        }
        search_box.style.background = "rgba(201,21,35," + opacity + ")"
    };

};

var downtime = function () {
    /*��ȡ����Ԫ��*/
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

    /*��ȡ����Ԫ��*/
    var banner = document.querySelector('.banner');
    var width = banner.offsetWidth;
    var img = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var point = pointBox.querySelectorAll('li');
    /*�����¼�*/
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
    /*�޷��*/
    /*��λ��ͼ1*/
    /*ul��һ��ʮ��ͼ��8 1 2 3 4 5 6 7 8 1*/
    /*ͼ1��������1*/
    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*����ʱ��Ͷ�ʱ��ʱ��û��ֱ����ϵ*/
        /*����ʱ����ͼƬ��������ʱ�䣬��ʱ��ʱ�����л���һ���õ�ʱ��*/
        addTransition();
        setTranslateX(-index * width);
    }, 3000);
    /*���ɽ�������*/
    img.addEventListener('transitionend', function () {
        /*���������9��ͼ1����һ������9��������������1��ͼ1��*/
        if (index >= 9) {
            index = 1;
            /*��ת��ʱ����Ҫ����*/
            removeTransition();
            setTranslateX(-index * width);
            /*������С��0��ͼ8����һ��С��0��������������8��ͼ8��*/
        } else if (index <= 0) {
            index = 8;
        }
        setPoint();
    });
    var setPoint = function () {
        /*�������е�li*/
        for (var i = 0; i < point.length; i++) {
            var li = point[i];
            /*�Ƴ�����С�����ʽ����*/
            li.classList.remove('now');
        }
        /*ͼƬ8 1 2 3 4 5 6 7 8 1*/
        /*�׵�7 0 1 2 3 4 5 6 7 0*/
        /*����0 1 2 3 4 5 6 7 8 9*/
        /*�׵����������ͼƬ����ֱ�Ӽ�һ�õ���*/
        point[index - 1].classList.add('now');
    }
    /*���г�ʼ��������ȫ�ֱ���*/
    /*��ʼ������λ��X����*/
    var startX = 0;
    /*�Ƿ񻬶���Ĭ���ǲ�����*/
    var isMove = false;
    /*�����ľ���*/
    var distance = 0;
    img.addEventListener("touchstart", function (e) {
        /*�����ʱ���������޷����*/
        clearInterval(timer);
        /*��¼��ʱ��λ��X����*/
        startX = e.touches[0].clientX;
    });
    img.addEventListener("touchmove", function (e) {
        /*ʱʱ��¼X�����λ��*/
        var moveX = e.touches[0].clientX;
        /*�����ľ���*/
        distance = moveX - startX;
        var translateX = -index * width + distance;
        /*����������ʱ��Ӧ���ж���Ч��*/
        removeTransition();
        /*ͼƬ������ָ��*/
        /*ͼƬ����ȥ�ľ������ul����ȥ�ľ���*/
        /*ul����ȥ�ľ������Ѿ�����ȥͼƬ�Ŀ�ȼ��ϴ��������ľ���*/
        setTranslateX(translateX);
        isMove = true;
    });
    img.addEventListener("touchend", function (e) {
        /*���������*/
        if (isMove) {
            /*�жϻ��������Ƿ�С��ͼƬ��ȵ�1/3*/
            if (Math.abs(distance) < width / 3) {
                /*С�ڵĻ���������ȥ*/
                addTransition();
                setTranslateX(-index * width);
                /*��С��*/
            } else {
                /*�����㣬���һ���������һ��ͼƬ*/
                if (distance > 0) {
                    index--;
                    /*С���㣬���󻮣�������һ��ͼƬ*/
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }
        /*�����һ�β�����״̬*/
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




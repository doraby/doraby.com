$(document).ready(function () {
    var pause =   window.localStorage.pause;
    if( pause == 'true'){
        var sound = document.getElementById('sound');
            $('.player-control').addClass('pause');
            sound.pause();
    }


    $('.preview').on('click', function () {
        $('.wrapper-preview').addClass('rotate-90');
        setTimeout(function () {
            $('.rotate-box').addClass('rotate-0');
        }, 400);
    })
    $('.close').on('click', function () {
        $('.rotate-box').removeClass('rotate-0');
        setTimeout(function () {
            $('.wrapper-preview').removeClass('rotate-90');
        }, 400);
        return false;
    })
    if ($('.carousel').length) {
        $('.carousel').carouFredSel({
            auto: false,
            scroll: {
                fx: 'crossfade'
            },
            item: 1,
            prev: '.btn-carousel_left',
            next: '.btn-carousel_right',
            pagination: '.paging'
        })
    }

    if ($('.menu').length) {
        testSize();
    }
    $('.btn_up').on('click', function () {
        toDown();
        return false;
    })
    $('.btn_down').on('click', function () {
        toTop();
        return false;
    })
    $(document).on('click', '.info-box__open', function(){
        $(this).toggleClass('clicked');
        var l = $(this).hasClass('clicked') ? -260 : 0;
        $('.info-box').animate({
            "margin-left": l
        }, 300)
        return false;
    })
    $(document).on('click', '.player-control', function(){
     var sound = document.getElementById('sound');
        if(!$(this).hasClass('pause')){
            $(this).addClass('pause');
            sound.pause();
            window.localStorage.pause = true;
        }
        else{
            $(this).removeClass('pause');
            sound.play();
            window.localStorage.pause = false;
        }
        return false;
    })


    $(document).on('click', '.info-box', function(){
        $('.fix-wrapper').addClass('zet-up');
        $('.desc-box').animate({
            top: 0
        }, 500);
        return false;
    })
    $(document).on('click', '.close-info', function(){
        $('.desc-box').animate({
            top: 100+'%'
        }, 500, function(){
            $('.fix-wrapper').removeClass('zet-up');
        });
        return false;
    })
    $(window).resize(testSize);
})

function testSize() {
    var h_in = $('.menu__inner').height(),
        h_l = $('.menu-links').height();

    if (h_in < h_l) {
        $('.menu__btn').addClass('menu__btn_active');
        $('.menu').addClass('menu-scroll');
    }
    else {
        $('.menu__btn').removeClass('menu__btn_active');
        $('.menu').removeClass('menu-scroll');
    }
}
function toTop() {
    var y = $('.menu__inner').scrollTop(),
        h = $('.menu-link').height(),
        k = Math.floor(y / h);
    $('.menu__inner').animate({
        scrollTop: h * (k + 1)
    }, 300)
}
function toDown() {
    var y = $('.menu__inner').scrollTop(),
        h = $('.menu-link').height(),
        k = Math.floor(y / h);
    $('.menu__inner').animate({
        scrollTop: h * (k - 1)
    }, 300)
}
$(window).load(function () {
    setTimeout(function () {
        if ($('.rotate-box_start').length) {
            $('.rotate-box_start').addClass('rotate-0');
            setTimeout(showText, 1500);
        }
    }, 500);

})

function showText(){
    if($('.next-text').length){
        var el = $('.next-text:first');
        el.animate({
            top: 0,
            opacity: 1
        }, 600, function(){
            var t = el.text().length*10;
            t = t <= 400 ? t : 200;
            el.removeClass('next-text');
            setTimeout(showText,t );
        })
    }
    else{
        setTimeout(function(){
            $('.rotate-box').removeClass('rotate-0');
            setTimeout(function(){
                $('.rotate-box_small').addClass('rotate-0');
            }, 800)

        }, 2000);
    }

}

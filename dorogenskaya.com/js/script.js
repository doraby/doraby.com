var D={};
function masonryStart(){
            //var container = document.querySelector('.sections');
            //var msnry = new Masonry(container, {
            //    columnWidth: 280,
            //    gutter: 18
            //});
    $('.sections').masonry({
        itemSelector: '.section',
        singleMode: false,
        isResizable: true,
        isAnimated: true,
        columnWidth: 280,
        gutter: 18
    })


}
function hashTest(){
    var hash = location.hash;
    if(hash){
        var reg = /#/,
            section = hash.replace(reg, '');
        $('.nav__link[href="'+section+'"]').trigger('click');
    }

}
/*Размеры для страницы uuup*/
function sizeBoxImg(){
    $('.device-box').each(function(){
        var k = 1.42,
            w = $('.iMac__safari').width(),
            h = w/k,
            h_img = $(this).find('img').height();
        if($(this).hasClass('iMac')){
            $(this).find('.iMac__safari, .device-slider_iMac').css({height: h});
        }
        if($(this).hasClass('iPhone')){
             h = $(this).find('.device-img-box').height();
             $(this).find('.device-slider').css({height: h});
        }
        $(this).find('.drag-area').css({height: 2*h_img-h, top: h-h_img});
        $(this).find('.device-img').css({top: h_img-h}).attr('data-y', h_img-h);
        console.log('111')
        $('.iPhone__safari').height($('.iPhone__safari').width()*1.82);

    })

    function imgPos(y, el){
        var y_start = el.data('y'),
            h_ui = $('.ui-draggable-dragging').parent().height(),
            h_dev = el.closest('.device-img-box').height(),
            h_content = el.height(),
            step = (h_content-h_dev)/h_ui;
        step = step>2 ? step+0.13 : step+0.07;
       el.css({top: Math.floor(y_start-y*step)});
    }


    $('.device-slider__pointer').draggable({
        containment: 'parent',
        axis: 'y',
        drag: function(e, ui){
            var y = ui.position.top,
                el = $('.ui-draggable-dragging').closest('.device-box').find('.device-img');
            imgPos(y, el);
        }
    })

        $('.device-img_drag').draggable({
            containment: 'parent',
            axis: 'y',
            cursor: 'move',
        drag: function(e, ui){
           var y =  ui.position.top,
               y_start = $('.ui-draggable-dragging').data('y');
               el = $('.ui-draggable-dragging').closest('.device-box').find('.device-slider__pointer'),
               h = el.parent().height(),
               step = h/y_start;
            el.css({top: Math.ceil(h-y*step)});
        }
        })


}
$(window).load(function () {
    if($('.section').length){
        masonryStart();
    }

    if(D.ind){
    hashTest();
    }
    /*Высота блока с картинкой в iMac, iPhone*/
    if($('.iMac').length){
        sizeBoxImg();
    }
    $(window).resize(function(){
        if($('.iMac').length){
            sizeBoxImg();
        }

    });

});
$(document).ready(function(){
    $('.device-slider__pointer').on({
        mouseenter: function(){
            $(this).addClass('active');
        },
        mouseleave: function(){
            $(this).removeClass('active');
        }
    })


    $('.nav__link').on('click', function(){
        if(D.ind){
        if(!$(this).hasClass('active-state')){
            $('.nav__link').removeClass('active-state');
            $(this).addClass('active-state');
            var section = $(this).attr('href');
            if(section != 'all'){
                $('.section').not('.'+section).fadeOut(200);
                $('.'+section).fadeIn(300);
            }
            else{
                $('.section').fadeIn(300);
            }
            setTimeout(masonryStart, 350)
        }
            return false;
        }

    });

    $('.proc-carousel').owlCarousel({
        center: true,
        mouseDrag: false,
        pagination: false,
        navigation: true,
        navigationText: '',
        rewindNav: false,
        itemsCustom: [[0, 2], [400, 3], [700, 4], [1000, 6], [1200, 8], [1600, 10]],
        scrollPerPage: true,
        afterInit: function(){
            var link = $('.proc-link:first'),
                src = link.attr('href'),
                title = link.data('title');
            link.addClass('active');
            setProcessingSrc(src, title);
        }
    });


        $('.proc-link').on('click', function(){
            if(!$(this).hasClass('active')){
                var src = $(this).attr('href'),
                    title = $(this).data('title');
                $('.proc-link').removeClass('active');
                $(this).addClass('active');
                setProcessingSrc(src, title);
            }
            return false;
        })


        function setProcessingSrc(src, title){
            $('#canvas').attr('data-processing-sources', src);
            $('#canvas-title').text(title);
            Processing.reload();

        }





})

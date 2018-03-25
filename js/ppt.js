(function () {
    var $wrapper = $('.slider-wrapper'),
        $slider_item = $('.slider-item'),
        slider_item_len = $slider_item.length,
        radius_html = '',
        active_num = 0,
        prev_num,
        slider_timer,
        key = true,
        $description = $('.description'),
        $images = $('img'),
        $slider_prev;//上一个item

    
    if(slider_item_len > 1) {
         $slider_item.each(function (index) {
            if(index == 0) {
                var radius_str = '<li class="active-radius"></li>';
            }else{
                var radius_str = '<li></li>';
            }
            radius_html += radius_str;
         });
         radius_html = '<div class="slider-radius"><div class="slider-box"><ul>' + radius_html + '</ul></div></div>';
         btn_html = '<div class="slider-btn"><div class="prev"></div><div class="next"></div></div>';
         $wrapper.append(radius_html).append(btn_html);
    }
    var $prev = $('.prev'),
        $next = $('.next'),
        $li = $('ul li');
        

    $prev.on('click', function () {
        console.log(key);
        if(key) {
            key = false;
            $.slider_item_change('prev');
            $wrapper.trigger('change');
        }
    })
    $next.on('click', function () {
        if(key){
            key = false;
            $.slider_item_change('next');
            $wrapper.trigger('change');
        }

    })
    $li.on('click', function () {
        if(key) {
            key = false;
            $.slider_item_change($(this).index());
            $wrapper.trigger('change');
        }
    })
    $.extend({
        slider_item_change: function (deraction) {

                prev_num = active_num;
                $slider_prev = $slider_item.eq(prev_num);

                if(deraction == 'prev' || deraction == 'next') {
                    if(deraction == 'next') {
                        active_num = active_num + 1 > slider_item_len - 1 ? 0 : active_num + 1;
                    }else {
                        active_num = active_num - 1 < 0 ? slider_item_len - 1 : active_num - 1;
                    }
                }else {
                    if(active_num == deraction) {
                        return;
                    }
                    active_num = deraction;
                };
            
        },
        slider_auto: function() {
            if(slider_item_len > 1) {
                slider_timer = setTimeout(function () {
                    $.slider_item_change('next');
                    $wrapper.trigger('change');
                }, 5000);
            }
        }
    })
    $slider_item.on('slider_item_leve', function () {
        $slider_item.eq(prev_num).animate({opacity: 0}, 1000, function () {
            $slider_item.eq(prev_num).css({display:'none'}).find($description).css({marginTop: '200px'});
            $slider_item.eq(prev_num).find($images).css({width: '0%'});
            $slider_item.eq(active_num).trigger('slider_item_come');
        })
    })
    $slider_item.on('slider_item_come', function () {
        $slider_item.eq(active_num).css({display: 'block'}).animate({opacity: 1}, 1000, function () {
            $slider_item.eq(active_num).find($description).animate({marginTop:'0px'}, 500, function () {
                $slider_item.eq(active_num).find($images).animate({width: '400px'}, 500, function () {
                     key = true;
                });
               
            });
        })
    })
    $li.on('changeClass', function () {
        $li.eq(prev_num).removeClass('active-radius');
        $li.eq(active_num).addClass('active-radius');
    })
    $wrapper.on('change', function () {
        $li.trigger('changeClass');
        $slider_item.eq(prev_num).trigger('slider_item_leve');
        if((typeof slider_timer) != undefined) {
            clearTimeout(slider_timer);
            $.slider_auto();
        } 
    })
    $slider_item.eq(active_num).trigger('slider_item_come');
    $.slider_auto(); 
})();
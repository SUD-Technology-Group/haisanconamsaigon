
// $(window).scroll(function() {
//     if ($(this).scrollTop() == 0) {
//         console.log('passed');
//         //Do whatever you want to do
//         $('#page-header').addClass('d-none');
//     }
// });

$('.cs-5').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        }
    }
})

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 3
        }
    }
})

$('.hidden-phone').click(function (e) {
    e.preventDefault();
    console.log($(this))
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
})

$(".icon_map").click(function () {
    $(".map_list").toggle('slow');
});

$('.seafood-buy').hover(function () {
    $(this).children('a').text('Thêm vào giỏ');
}, function () {
    $(this).children('a').text('Thưởng thức ngay');
})


$(document).ready(() => {
    $(function () {
        $('.single-item-rtl').slick({
            rtl: true
        });
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 3,
            speed: 300,         
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                    }
                }
            ]
        });
    })

    $('#btn').click(function () {
        $('#btn').toggleClass("cart_clk");

    });
    $("#btn").one("click", function () {
        $('.cart .fa').attr('data-before', '1');
    });

    var prnum = $('.num').text();
    $('.inc').click(function () {
        if (prnum > 0) {
            prnum++;
            $('.num').text(prnum);
            $('.cart .fa').attr('data-before', prnum);
        }

    });
    $('.dec').click(function () {
        if (prnum > 1) {
            prnum--;
            $('.num').text(prnum);
            $('.cart .fa').attr('data-before', prnum);
        }

    });
})


function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
  }


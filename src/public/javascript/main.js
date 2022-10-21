
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
        if ($("#btn").hasClass('cart_clk')) {
            const slug = $("input[name=slug]").val();
            const id = $("input[name=id]").val();
            const name = $("input[name=name]").val();
            const image = $("input[name=image]").val();
            const price = $("input[name=price]").val();
            const size = $("input[name=size]").val();
            const inventory = $("input[name=quantity]").val();
            const quantity = $("#numOfSeafood").text();
            addSeafoodToCart(id, name, price, size, inventory, quantity, image, slug)
        } else {
            $('#btn').addClass("cart_clk");
        }

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


    // Shopping cart: start
    let shoppingCart
    if (localStorage.getItem('shopping-cart')) {
        shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'))
    } else {
        shoppingCart = JSON.parse(localStorage.setItem('shopping-cart', '[]'))
    }


    function addSeafoodToCart(id, name, price, size, inventory, quantity, img, slug) {
        let checkIdAndSize = shoppingCart.some(item => {
            item = JSON.parse(item)
            return item.id === id && item.size == size
        })
        if (checkIdAndSize) {
            //changeNumberOfSeafood('plus', id, size)
            alertProductInCart()
            alertAddToAdminCart(name)
        } else if (inventory != 0) {
            const seafood = {
                id: id,
                name: name,
                price: price,
                stringPrice: Number(price).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
                img: img,
                inventory: inventory,
                size: size,
                slug: slug
            }
            shoppingCart.push(JSON.stringify({
                ...seafood,
                numberOfUnit: Number(quantity)
            }))
            alertAddToCart(name, size)
        }
        updateShoppingCart()
    }
    function addFoodToCart(id, name, price, size, img, slug) {
        let checkIdAndSize = shoppingCart.some(item => {
            item = JSON.parse(item)
            return item.id === id
        })
        if (checkIdAndSize) {
            changeNumberOfSeafood('plus', id, size)
            alertAddToAdminCart(name)
        } else if (inventory != 0) {
            const seafood = {
                id: id,
                name: name,
                price: price,
                stringPrice: Number(price).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
                img: img,
                inventory: inventory,
                size: size,
                slug: slug
            }
            shoppingCart.push(JSON.stringify({
                ...seafood,
                numberOfUnit: Number(quantity)
            }))
            alertAddToCart(name, size)
        }
        updateShoppingCart()
    }

    function changeNumberOfSeafood(action, id, size) {
        shoppingCart = shoppingCart.map(item => {
            item = JSON.parse(item)
            let numberOfUnit = Number(item.numberOfUnit)
            if (item.id === id && item.size == size) {
                if (action == 'minus' && numberOfUnit > 1) {
                    numberOfUnit--
                } else if (action == 'plus') {
                    numberOfUnit++
                }
            }
            return JSON.stringify({
                ...item,
                numberOfUnit: numberOfUnit
            })
        })
        updateShoppingCart()
    }

    function updateShoppingCart() {
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))
    }

    function alertAddToCart(name, size) {
        document.getElementById('alertAddToCart').innerHTML =
            `<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                    Đã thêm <strong>${name}</strong> - ${size} vào giỏ hàng
                </div>`
        setTimeout(function () { document.getElementById('alertAddToCart').innerHTML = ''; }, 2000);
    }

    function alertProductInCart() {
        document.getElementById('alertAddToCart').innerHTML =
            `<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                    <strong>Sản phẩm đã có trong giỏ hàng</strong>, quý khách vui lòng vào giỏ hàng để cập nhật số lượng sản phẩm
                </div>`
        setTimeout(function () { document.getElementById('alertAddToCart').innerHTML = ''; }, 5000);
    }
    

    // Shopping cart: end

})



function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
}




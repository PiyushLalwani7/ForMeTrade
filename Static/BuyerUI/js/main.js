'use strict';
var swal;

(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
        checkSession();
        loadProducts();
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    $("#buying_product_details").submit(function(e) {
        e.preventDefault();
    });

     /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    $.ajax({
        type: "GET",
        url: "/buy/header/",
        dataType: "html",
        success: function(data, textStatus) {
            $("#common-header").html(data);
        },
        error: function() {
            console.log('Problem in Header');
        }
    });

})(jQuery);

function showBuyDetailsContainer(product_name, product_id, product_unit){
//    For Desktop and android Stop
    $('body').addClass('stop-scrolling')
//    For IOS Stop
    $('body').bind('touchmove', function(e){e.preventDefault()})
    $('.overlay').fadeIn();
    var container = document.getElementById("input_buy_details_container");
    container.classList.remove('w3-hide');
    container.classList.add('w3-show');

//    Set Product Name
    var product_name_input = document.getElementById('product-name-input');
    product_name_input.name = "product_name";
    product_name_input.value = product_name;

//    Set Product Id
    var product_id_input = document.getElementById('product-id-input');
    product_id_input.name = "product_id";
    product_id_input.value = product_id;

//   Set Product Unit
    var product_id_input = document.getElementById('product_unit_input');
    product_id_input.value = product_unit;

}


function hideBuyDetailsContainer() {
//    For Desktop and android Start
    $('body').removeClass('stop-scrolling')
//    For IOS Stop
    $('body').unbind('touchmove')
    $('.overlay').fadeOut();
    $("#buying_product_details").trigger('reset');
//    resetForm('buying_product_details');
    var container = document.getElementById('input_buy_details_container');
    container.classList.remove('w3-show');
    container.classList.add('w3-hide');
}

function resetForm(formName){
    document.getElementById(formName).reset();
}

//LOAD PRODUCTS
function loadProducts(){
    var url = '/user/getAllStockStatus/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
            var products = xhr.response;
            parent = document.getElementById('products_container');
            for(var index=0; index < products.length;index++){
                var new_container = createContainer(products[index].product_id, products[index].product_name, products[index].product_description, products[index].product_image_path, products[index].unit_name,
                products[index].min_range, products[index].max_range, products[index].stock_status);
                parent.appendChild(new_container);
            }
         }
    };
}

function createContainer(product_id, product_name, product_description, img_path, product_unit,
                        min_range, max_range, stock_status){

    var div_top = document.createElement('div');
    div_top.setAttribute('class','col-lg-3 col-md-4 col-sm-6 mix')

    var featured_item = document.createElement('div');
    featured_item.setAttribute('class','featured_item')

    var featured__item__pic = document.createElement('img');
    featured__item__pic.setAttribute('class','featured__item__pic set-bg w3-margin-top')
    featured__item__pic.setAttribute('src','/static/'+img_path)

    featured_item.appendChild(featured__item__pic)

    var featured__item__text1 = document.createElement('div');
    featured__item__text1.setAttribute('class','featured__item__text')
    featured__item__text1.innerHTML = "<h5><b>"+product_name+"</b></h5>"
    featured_item.appendChild(featured__item__text1)

    var featured__item__text2 = document.createElement('div');
    featured__item__text2.setAttribute('class','featured__item__text')
    if(stock_status == true){
        featured__item__text2.innerHTML = "<h6 class='blinking'>Stock Available</h6>"
    }else{
        featured__item__text2.innerHTML = "<h6>Not Available</h6>"
    }
    featured_item.appendChild(featured__item__text2)

    var featured__item__text3 = document.createElement('div');
    featured__item__text3.setAttribute('class','featured__item__text')

    if(stock_status == true){
        featured__item__text3.innerHTML = "<h5>Rs."+min_range+" - Rs."+max_range+" /<i>"+product_unit+"</i></h5>"
    }else{
        min_range = min_range - ((min_range * 20)/ 100)
        featured__item__text3.innerHTML = "<h5>Rs."+min_range+" - Rs."+max_range+" /<i>"+product_unit+"</i></h5>"
    }


    featured_item.appendChild(featured__item__text3)

    var button = document.createElement('button')
    button.setAttribute('class','w3-round-xlarge buy-button')
    button.setAttribute('onclick',"showBuyDetailsContainer('"+product_name+"', "+product_id+", '"+product_unit+"')")
    button.innerHTML = "BUY NOW"
    featured_item.appendChild(button)

    div_top.appendChild(featured_item)

    return div_top

}

function displayAuthorizeWarning(status){
    if(status){
        swal({
          title: "NOT AUTHORIZED BUYER",
          text: "Call Customer Support +919926017710",
          icon: "warning",
          closeOnClickOutside: false,
          buttons: {
            agree: {
                text : "Sell Items",
                className: "login-btn",
                value: "sell"
                }
            },

        })
        .then((value) => {
            switch (value) {
                case "sell":
                  window.open('/sell/home/', '_self');
                  break;
            }
        });
    }
    else{
        return;
    }
}

window.addEventListener("DOMContentLoaded", function (){
        var url = '/user/verifySeller/';
        var xhr = new XMLHttpRequest();
        xhr.callback = displayAuthorizeWarning;
        xhr.open("GET", url, false);
        if(xhr.readyState == 4){
            var data = JSON.parse(xhr.response);
            if(xhr.status == 200){
                if(data.message == 'ok'){
                    this.callback(true)
                }else if(data.message == 'unauthorized'){
                    this.callback(false)
                }else{
                    this.callback(false)
                }
            }
            else{
                    this.callback(false)
                }
            };
        xhr.send(null);
    }
, false);


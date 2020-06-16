
(function ($) {

//

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
        checkSession();
        loadSellingProducts();


    });

    $("#selling_product_details").submit(function(e) {
        e.preventDefault();
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });



    loadHeader();

})(jQuery);

function loadHeader(){
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
}

function showSellDetailsContainer(product_name, product_id, product_unit){
//    For Desktop and android Stop
    $('body').addClass('stop-scrolling')
//    For IOS Stop
    $('body').bind('touchmove', function(e){e.preventDefault()})
    $('.overlay').fadeIn();
    var container = document.getElementById('input_sell_details_container');
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

//     Set Unit
    var product_unit_input = document.getElementById('product-unit-input');
    product_unit_input.value = product_unit;
}


function hideSellDetailsContainer() {
//    For Desktop and android Start
    $('body').removeClass('stop-scrolling')
//    For IOS Stop
    $('body').unbind('touchmove')
    $('.overlay').fadeOut();
    $("#selling_product_details").trigger('reset');
//    resetForm('selling_product_details');
    container = document.getElementById('input_sell_details_container');
    container.classList.remove('w3-show');
    container.classList.add('w3-hide');
}

function resetForm(formName){
    document.getElementById(formName).reset();
}

function loadSellingProducts(){
    var url = '/user/getProducts/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
            var products = JSON.parse(xhr.response);
            parent = document.getElementById('products-container');
            for(var index=0; index < products.length;index++){
                new_container = createContainer(products[index].product_image_path, products[index].product_name, products[index].product_id, products[index].unit_name);
                parent.appendChild(new_container);
            }
         }
    };
}

function createContainer(img_path, product_name, product_id, product_unit){

    var div_top = document.createElement('div');
    div_top.setAttribute('class','w3-col l4 m6 s12')

    var featured_item = document.createElement('div');
    featured_item.setAttribute('class','featured_item w3-margin-top')

    var featured__item__pic = document.createElement('img');
    featured__item__pic.setAttribute('class','featured__item__pic set-bg')
    featured__item__pic.setAttribute('src','/static/'+img_path)

    featured_item.appendChild(featured__item__pic)

    var featured__item__text = document.createElement('div');
    featured__item__text.setAttribute('class','featured__item__text')

    //GROUP
    var row1 = document.createElement('div')
    row1.setAttribute('class','w3-row')
    var name_div = document.createElement('div');
    name_div.setAttribute("class","w3-col l12 m12 s12")
    var header4 = document.createElement("h4")
    var bold = document.createElement("b")
    bold.innerHTML = product_name
    header4.appendChild(bold)
    name_div.appendChild(header4)
    row1.appendChild(name_div)

    //GROUP
    var row2 = document.createElement('div')
    row2.setAttribute('class','w3-row')
    var btn_div = document.createElement('div');
    btn_div.setAttribute("class","w3-col l12 m12 s12")

    var button = document.createElement('button')
    button.setAttribute('class','w3-border w3-round-xlarge w3-theme-color sell-button')
    button.setAttribute('onclick',"showSellDetailsContainer('"+product_name+"', "+product_id+",'"+product_unit+"')")

    button.innerHTML = "<b>SELL <span><i class='fa fa-bullhorn'></i></span></b>"
    btn_div.appendChild(button)

    row2.appendChild(btn_div)

    featured__item__text.appendChild(row1)
    featured__item__text.appendChild(row2)

    featured_item.appendChild(featured__item__text)

    div_top.appendChild(featured_item)

    return div_top

}

function sellRequest(status){
    if(status){
        loaderStart();
        var url = '/sell/products/';
        var csrftoken = getCookie('csrftoken');
        var formData = new FormData(document.forms.sell_request_form)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.responseType = 'json'
        xhr.send(formData);
        xhr.onload = function(){
            loaderStop();
            hideSellDetailsContainer();
            if(xhr.status == 200){
                if(xhr.response.message == 'inserted_record'){
                    showAlertBoxContainer("SuccessFully Registered, We Will Contact You Soon. <br>For More Details call on - 9926017710");
                }
                else{
                    showAlertBoxContainer("Error, check Logs");
                    console.log(xhr.response);
                }
            }else{
                showAlertBoxContainer("Error, check logs");
                console.log(xhr.response)
            }
        };
    }else{
        swal({
          title: "NOT REGISTERED SELLER",
          text: "Be part of our family!",
          icon: "warning",
          buttons: {
            register: {
                text: "Registration",
                className: "register-btn",
                value: "register"
                },
            login: {
                text : "Login",
                className: "login-btn",
                value: "login"
                }
            },

        })
        .then((value) => {
            switch (value) {
                case "login":
                  localStorage.setItem('my_tab_type', 'login');
                  window.open('user/sign/', '_self');
                  break;
                case "register":
                  localStorage.setItem('my_tab_type', 'register');
                  window.open('user/sign/', '_self');
                  break;
            }

        });
    }
}

function beforeSellRequest(status){
    pageAuthorization(sellRequest);
}

function displayAuthorizeWarning(status, swal){
    if(status){
     return;
    }
    else{
        swal({
          title: "NOT AUTHORIZED SELLER",
          text: "Join our family, Call +919926017710",
          icon: "warning",
          closeOnClickOutside: false,
          buttons: {
            agree: {
                text : "Okay",
                className: "login-btn",
                value: "agree"
                }
            },

        })
        .then((value) => {
            switch (value) {
                case "agree":
                  window.open('/', '_self');
                  break;
            }
        });
    }
}

function pageAuthorization(callbackFunc, swal){
    var url = '/user/verifySeller/';
    var xhr = new XMLHttpRequest();
    xhr.callback = callbackFunc;
    xhr.open("GET", url, true);
    xhr.onload = function(){
        var data = JSON.parse(xhr.response);
        if(xhr.status == 200){
            if(data.message == 'ok'){
                this.callback(true, swal)
            }else if(data.message == 'unauthorized'){
                this.callback(false, swal)
            }else{
                this.callback(false, swal)
            }
        }
        else{
                this.callback(false, swal)
            }
        };
    xhr.send(null);
}


window.addEventListener("DOMContentLoaded", function (){
        pageAuthorization(displayAuthorizeWarning, swal);
    }
, false);

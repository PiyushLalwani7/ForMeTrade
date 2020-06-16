'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
        loadOrderHistory();

    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
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

function loadOrderHistory(){
    loaderStart();
    var url = '/buy/getOrdersHistory/';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function(){
        loaderStop();
        if(xhr.status == 200){
            loadOrdersTable(JSON.parse(xhr.response));
        }else{
            showAlertBoxContainer("Error, check logs");
            console.log(xhr.response)
        }
    };
}

function loadOrdersTable(data){
    document.getElementById('orders-history-table').innerHTML = '';
    var table = document.getElementById('orders-history-table');

    //Add header <thead>
    var header = table.createTHead();
    var tr=header.insertRow(0)

    //Date
    var th=document.createElement('th')
    th.setAttribute('class', 'shoping__product')
    th.innerHTML = "Date"
    tr.appendChild(th)

    //Products
    var th=document.createElement('th')
    th.setAttribute('class', 'shoping__product')
    th.innerHTML = "Products"
    tr.appendChild(th)

    //Order No.
    var th=document.createElement('th')
    th.innerHTML = "Order Number"
    tr.appendChild(th)

    //Price
    var th=document.createElement('th')
    th.innerHTML = "Price"
    tr.appendChild(th)

    //Quantity
    var th=document.createElement('th')
    th.innerHTML = "Quantity"
    tr.appendChild(th)

    //Amount
    var th=document.createElement('th')
    th.innerHTML = "Amount"
    tr.appendChild(th)

    table.appendChild(header)

    var tbdy = document.createElement('tbody');

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index)

        var date = row.insertCell(0)
        var products = row.insertCell(1)
        var order_no = row.insertCell(2)
        var price = row.insertCell(3)
        var quantity = row.insertCell(4)
        var amount = row.insertCell(5)

        date.setAttribute('class','shoping__cart__date')
        date.innerHTML = "<h5>"+getCharacterMonth(data[index].order_date)+"<br><span class='date__digit'>"+getNumericDate(data[index].order_date)+"</span><br>"+getYear(data[index].order_date)+"</h5>"

        products.setAttribute('class','shoping__cart__item')
        var prod_img = document.createElement('img')
        prod_img.setAttribute('src','/static/'+data[index].product_image_path)
        prod_img.setAttribute('style','height: 20%;')
        var prod_name = document.createElement('h5')
        prod_name.setAttribute('style','margin-left: 21px;')
        prod_name.innerHTML = data[index].product_name
        products.appendChild(prod_img)
        products.appendChild(prod_name)

        order_no.setAttribute('class','shoping__cart__order_no')
        order_no.innerHTML = "<h5>"+data[index].order_id+"</h5>"

        price.setAttribute('class','shoping__cart__price')
        price.innerHTML = "<h5>"+data[index].rate+"</h5>"

        quantity.setAttribute('class','shoping__cart__quantity')
        quantity.innerHTML = "<h5>"+data[index].quantity+" "+data[index].unit_name+"<h5>"

        amount.setAttribute('class','shoping__cart__total')
        amount.innerHTML = "<h5>"+data[index].total_amount+"</h5>"

        tbdy.appendChild(row);
    }
    table.appendChild(tbdy);
}
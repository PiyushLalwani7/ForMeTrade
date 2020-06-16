var ShoppingCart = new Array();
var FinalObject = new Array();


window.onload = (event) => {
  loadProducts();
};

function loadProducts(){
    product_dropdown1 = document.getElementById('products1')
    product_dropdown2 = document.getElementById('products2')

    var url = '/user/getProducts/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
           populateDropdown(xhr.response, product_dropdown1, "product_name", "product_id")
           populateDropdown(xhr.response, product_dropdown2, "product_name", "product_id")
        }
    };

}

function populateDropdown(data, elementId, name ,value){
    var opt = document.createElement('option');
    opt.appendChild( document.createTextNode("-- select an option --") );
    elementId.appendChild(opt);
    for(var i=0; i<data.length; i++){
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(data[i][name]) );
        opt.value = data[i][value];
        elementId.appendChild(opt);
    }

}

function buyProduct(){
    var url = '/buy/buyRequest/';
    var product1 = {
        productId : document.getElementById('products1').value,
        productQuantity : document.getElementById('quantity1').value,
    }
    var product2 = {
        productId : document.getElementById('products2').value,
        productQuantity : document.getElementById('quantity2').value,
    }
    var userId = {
        userId : document.getElementById('userId').value
    }
    ShoppingCart.push(product1)
    ShoppingCart.push(product2)
}

function submitOrder(){
    var url = '/buy/buyRequest/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(ShoppingCart));
    xhr.onload = function(){
        if(xhr.status == 200){
            console.log(xhr.response)
         }
    };
}
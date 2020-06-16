var ProductCategories;

window.onload = function() {
    getProductCategories();
};

function getProductCategories(){

    var url = '/user/getProductCategories/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function() {
        if(xhr.status == 200){
            ProductCategories = xhr.response;
            var product_categories_dropdown = document.getElementById('product_categories_dropdown');
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode("-- select an option --") );
            product_categories_dropdown.appendChild(opt);
            for(var i=0; i<ProductCategories.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(ProductCategories[i].product_category_name) );
                opt.value = ProductCategories[i].product_category_code;
                product_categories_dropdown.appendChild(opt);
            }
            product_categories_dropdown.setAttribute("onchange","getProducts()");
        }
    };
}

function getProducts(){
    document.getElementById('products_dropdown').innerHTML = '';
    var url = '/user/getProductsAccCategory/';
    var csrftoken = getCookie('csrftoken');
    var product_category = {
        productCategoryCode : document.getElementById("product_categories_dropdown").value
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(product_category));
    xhr.onload = function() {
        if(xhr.status == 200){
            var products = xhr.response;
            var products_dropdown = document.getElementById('products_dropdown');
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode("-- select an option --") );
            products_dropdown.appendChild(opt);
            for(var i=0; i<products.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(products[i].product_name) );
                opt.value = products[i].product_id;
                products_dropdown.appendChild(opt);
            }
        }
    };
}

function sellProduct(){
    var url = '/sell/products/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.productSellForm)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.send(formData);
    xhr.onload = function(){
        if(xhr.status == 200){
            alert(xhr.response)
        }
    };
}

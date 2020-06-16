//global variables
var ProductCategories;

window.onload = function() {
    getProductCategories();
    getUnits();
};

function getProductCategories(){

    var url = '/user/getProductCategories/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function() {
        if(xhr.status == 200){
            ProductCategories = xhr.response;
            var product_categories_dropdown = document.getElementById('product_categories_dropdown');
            for(var i=0; i<ProductCategories.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(ProductCategories[i].product_category_name) );
                opt.value = ProductCategories[i].product_category_code;
                product_categories_dropdown.appendChild(opt);
            }
        }
    };
}

function getUnits(){

    var url = '/user/units/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function() {
        if(xhr.status == 200){
            units = xhr.response;
            var product_unit_dropdown = document.getElementById('product_unit_dropdown');
            for(var i=0; i<units.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(units[i].unit_name) );
                opt.value = units[i].unit_id;
                product_unit_dropdown.appendChild(opt);
            }
        }
    };
}

function addProduct(){
    var url = '/user/addProduct/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.productForm)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send(formData);
    xhr.onload = function() {
        if(xhr.status == 200){
            alert(xhr.response)
        }
    };

}
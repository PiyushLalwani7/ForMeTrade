
function addProductCategory(){

    var url = '/user/addProductCategory/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.addProductCategoryForm)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.send(formData);
    xhr.onload = () => alert(xhr.response);
}
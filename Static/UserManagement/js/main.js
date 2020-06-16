
function registerUser(){

    var url = '/user/register';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.userForm)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.send(formData);
    xhr.onload = () => alert(xhr.response);
}


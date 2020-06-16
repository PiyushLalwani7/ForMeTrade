
function registerUser(){

    var url = '/user/signup/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.userForm)
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


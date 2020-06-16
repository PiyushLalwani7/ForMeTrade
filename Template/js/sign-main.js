(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(100).fadeOut("slow");
        checkSession();

    });


    $("#login-form").submit(function(e) {
        e.preventDefault();
    });
    $("#register-form").submit(function(e) {
        e.preventDefault();
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

function openTab(evt, containerName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("my-forms");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("w3-gray", "");
  }
  document.getElementById(containerName).style.display = "block";
  evt.currentTarget.className += " w3-gray";
}


function loginUser(){
    try{
        loaderStart();
        var loginData = new FormData(document.forms.loginForm);
        var url = '/user/login/';
        var csrftoken = getCookie('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.send(loginData);
        if(xhr.readyState == 4){
            loaderStop();
            if(xhr.status == 200){
                data = JSON.parse(xhr.response)
                if(data.message == 'authenticated'){
                    localStorage.setItem('first_name', data.first_name);
                    if(data.seller == ''){
                        window.open('/','_self')
                    }else{
                        window.open('/sell/home/','_self')
                    }
                }
                else if(data.message == 'incorrect_password'){
                    showAlertBoxContainer("Incorrect Password");
                }else if(data.message == 'no_user_found'){
                    localStorage.setItem('my_tab_type','register')
                    showAlertBoxContainer("Unregistered Mobile Number<br><i>Please Register To Get Best Deals. Click on <a href='/user/sign/'>Registration</a> to Register.</i>");
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
    }catch(err){
        loaderStop();
        showAlertBoxContainer("Error, check Logs");
        console.log(err);
    }
    finally{
        loaderStop();
    }
}

function logout(){
    loaderStart();
    localStorage.removeItem('first_name');
    var url = '/user/logout/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function(){

        if(xhr.status == 200){
            if(xhr.response.message == 'successful'){
                window.open('/',"_self");
                loaderStop();
            }
            else{
                showAlertBoxContainer("Error, check logs");
                console.log(xhr.response);
            }
        }
    };
}

//Verify User Timeout
function verifyTimeOut(){
//    localStorage.removeItem('first_name');
    var url = '/user/verifyTimeOut/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.send();
    if(xhr.readyState == 4){
        var data = JSON.parse(xhr.response)
        if(xhr.status == 200){
            if(data.message == 'ok'){
                return true;
            }else{
                return false;
            }
        }
        else {
                console.log(xhr.response);
                return false;
            }
        };
}

function openParticularTab(){
    var tab_type = localStorage.getItem('my_tab_type');
    var loginFormTab = document.getElementById('login-form')
    var registerFormTab = document.getElementById('register-form')

    if(tab_type == 'login'){
        loginFormTab.setAttribute('style','display:block;')
        registerFormTab.setAttribute('style','display:none;')
    }
    else if(tab_type == 'register'){
        loginFormTab.setAttribute('style','display:none;')
        registerFormTab.setAttribute('style','display:block;')
    }
    else{
        loginFormTab.setAttribute('style','display:block;')
        registerFormTab.setAttribute('style','display:none;')
    }
    localStorage.setItem('my_tab_type', '');
}

function checkSellAuthorization(){
    var url = '/user/verifySeller/';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onload = function(){
        if(xhr.status == 200){
            return true;
        }
        else if(xhr.status == 401){
            return false;
            }
            else{
                console.log(xhr.response);
                return false;
            }
        };
}

function confirmPassword(){
    var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("cPassword").value;
        if (password != confirmPassword) {
            showAlertBoxContainer("Passwords do not match. Please Enter same passwords in Password Box and Confirm Password Box.");
            return false;
        }
        return true;
}

function registerUser(){
    loaderStart();
    try{
        var url = '/user/checkAvailability/';
        var parameters = {
            contact_no_1 : document.forms.registerForm.contact_no_1.value
        }
        var csrftoken = getCookie('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
        xhr.send(JSON.stringify(parameters));
        if(xhr.readyState == 4){

            if(xhr.status == 200){
                    data = JSON.parse(xhr.response)
                    if(data.message == 'ok'){

                        var registerationData = new FormData(document.forms.registerForm);
                        var url = '/user/signup/';
                        var csrftoken = getCookie('csrftoken');
                        var xhr2 = new XMLHttpRequest();
                        xhr2.open("POST", url, false);
                        xhr2.setRequestHeader("X-CSRFToken", csrftoken);
                        xhr2.send(registerationData);
                        if(xhr2.readyState == 4){
                            loaderStop();
                            data2 = JSON.parse(xhr2.response)
                            if(xhr2.status == 200){
                                if(data2.message == 'inserted_record'){
                                    document.getElementById('register-form').reset();
                                    showAlertBoxContainer("Registration Successful, Welcome to our Family! <br><a href='/user/sign/'>Login Page</a>");
                                }
                                else{
                                    showAlertBoxContainer("Error, check logs");
                                    console.log(xhr2.response)
                                }
                            }else{
                                showAlertBoxContainer("Error, check logs");
                                console.log(xhr2.response)
                            }
                        };
                    }else if(data.message == 'denied'){
                        showAlertBoxContainer("NUMBER ALREADY EXISTS!! <br> Please Use Another Number for Registration");
                    }else{
                        console.log(xhr.response)

                    }
                }
                else{
                    console.log(xhr.response)

                }

            }

    }catch(err){
        loaderStop();
        showAlertBoxContainer("Error, check Logs");
        console.log(err);
    }
}

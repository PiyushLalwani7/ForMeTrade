function loaderStart(){
    $('#myLoader').css("display","block");
}

function loaderStop(){
    $('#myLoader').css("display","none");
}

function showAlertBoxContainer(message){
//    For Desktop and android Stop
    $('body').addClass('stop-scrolling')
//    For IOS Stop
    $('body').bind('touchmove', function(e){e.preventDefault()})
    $('.overlay').fadeIn();

//    Set Alert Message
    var message_container = document.getElementById('message_container');
    message_container.innerHTML = message;

    var container = document.getElementById("alert_box_container");
    container.classList.remove('w3-hide');
    container.classList.add('w3-show');
}

function hideAlertBoxContainer(){
//    For Desktop and android Start
    $('body').removeClass('stop-scrolling')
//    For IOS Stop
    $('body').unbind('touchmove');
    $('.overlay').fadeOut();
//    resetForm('buying_product_details');
    var container = document.getElementById('alert_box_container');
    container.classList.remove('w3-show');
    container.classList.add('w3-hide');
}


// Manage Login and logout
function checkSession(){

    var first_name = localStorage.getItem('first_name');
    if(first_name !== null && first_name !== ""){
        // *****LOGGED IN *******
        //Set website header
        showLogoutOption();
        addProfile(first_name);
        showOrdersOption();
        hideLoginOption();

        //Set mobile header
        showMobileLogoutOption();
        addMobileProfile(first_name);
        showMobileOrdersOption();
        hideMobileLoginOption();
        showPipeSeparator();

    }
    else{
        // *****LOGGED OUT *******
        //Set website header
        showLoginOption();
        hideOrdersOption();
        removeProfile();
        hideLogoutOption();

        //Set mobile header
        showMobileLoginOption();
        hideMobileOrdersOption();
        removeMobileProfile();
        hideMobileLogoutOption();
        removePipeSeparator();
    }

}

//Configure user profile showing setting
function addProfile(username){
    username = capitalizeFirstLetter(username)
    document.getElementById('profile-div').innerHTML = "<a><i class='fa fa-user'></i> <span>Hi "+username+"</span></a>";
}
function removeProfile(){
    document.getElementById('profile-div').innerHTML = "";
}
//Configure Orders tab option
function showOrdersOption(){
    document.getElementById('orders-div').innerHTML = "<a href='/buy/orders/'><i class='fa fa-shopping-cart'></i> <span>Orders</span></a>";
}
function hideOrdersOption(){
    document.getElementById('orders-div').innerHTML = "";
}

//Configure Login tab option
function showLoginOption(){
    document.getElementById('login-div').innerHTML = "<a href='/user/sign/'><i class='fa fa-user'></i> <span>Login</span></a>";
}
function hideLoginOption(){
    document.getElementById('login-div').innerHTML = "";
}

//Configure Logout tab option
function showLogoutOption(){
    document.getElementById('logout-div').innerHTML = "<a><span onclick='logout()'>Logout</span></a>";
}
function hideLogoutOption(){
    document.getElementById('logout-div').innerHTML = "";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//***********MOBILE************************

//Configure user profile showing setting
function addMobileProfile(username){
    username = capitalizeFirstLetter(username)
    document.getElementById('mobile-profile-div').innerHTML = "<a><i class='fa fa-user'></i> <span>Hi "+username+"</span></a>";
}
function removeMobileProfile(){
    document.getElementById('mobile-profile-div').innerHTML = "";
}
//Configure Orders tab option
function showMobileOrdersOption(){
    document.getElementById('mobile-orders-div').innerHTML = "<a href='/buy/orders/'><i class='fa fa-shopping-cart'></i><span>Orders</span></a>";
}
function hideMobileOrdersOption(){
    document.getElementById('mobile-orders-div').innerHTML = "";
}

//Configure Login tab option
function showMobileLoginOption(){
    document.getElementById('mobile-login-div').innerHTML = "<a href='/user/sign/'><i class='fa fa-user'></i><span>Login</span></a>";
}
function hideMobileLoginOption(){
    document.getElementById('mobile-login-div').innerHTML = "";
}

//Configure Logout tab option
function showMobileLogoutOption(){
    document.getElementById('mobile-logout-div').innerHTML = "<a><i class='fa fa-power-off'></i><span onclick='logout()'>Logout</span></a>";
}
function hideMobileLogoutOption(){
    document.getElementById('mobile-logout-div').setAttribute('style','display: none;');
    document.getElementById('mobile-logout-div').innerHTML = "";
}

//Show Pipe Seperator
function showPipeSeparator(){
    document.getElementById('pipe_character').innerHTML = "<span>|</span>";
}
function removePipeSeparator(){
    document.getElementById('pipe_character').innerHTML = "";

}



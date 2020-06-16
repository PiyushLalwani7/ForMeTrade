function placeBuyRequest(){
    if(verifyTimeOut() == true){
        loaderStart();
        var requestForm = new FormData(document.forms.order_request_form);
        var url = '/buy/buyRequest/';
        var csrftoken = getCookie('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.send(requestForm);
        if(xhr.readyState == 4){
            loaderStop();
            var data = JSON.parse(xhr.response);
            hideBuyDetailsContainer();
            if(xhr.status == 200){
                if(data.message == 'inserted_record'){
                    showAlertBoxContainer("Thank You for your interest. Accepted your Buy Request!! <br>We Will Contact You Soon. <br>For More Details call on - 9926017710");
                }
                else{
                    showAlertBoxContainer("Error, check Logs");
                    console.log(data);
                }
            }else{
                showAlertBoxContainer("Error, check logs");
                console.log(data)
            }
        };

    }else{
        swal({
          title: "Login Required",
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
window.onload = function() {

};

function getSellerRegistrationRequest(){

    var url = '/admin/sellerRequestApproval/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.SearchUser);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send(formData);
    xhr.onload = function() {
        populateSellerTable(xhr.response);
    };
}

function populateSellerTable(data){
    if(data.length > 0){
        document.getElementById('sellerRegisterRequestsTable').innerHTML = '';
        table = document.getElementById('sellerRegisterRequestsTable');
        var tr=table.insertRow(0)
        tr.setAttribute('class','w3-grey')
        th=document.createElement('th')
        th.innerHTML = ""
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "User ID"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "First Name"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "Last Name"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "Email Id"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "User Contact 1"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "City"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "State"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "Pincode"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "Is Seller?"
        tr.appendChild(th)
        th=document.createElement('th')
        th.innerHTML = "Insertion Date"
        tr.appendChild(th)


        for(var index=0; index<data.length; index++){
            var row = table.insertRow(index+1)
            var registerButton = row.insertCell(0)
            var user_id = row.insertCell(1)
            var first_name = row.insertCell(2)
            var last_name = row.insertCell(3)
            var email = row.insertCell(4)
            var contact_no_1 = row.insertCell(5)
            var city = row.insertCell(6)
            var state = row.insertCell(7)
            var pincode = row.insertCell(8)
            var is_seller = row.insertCell(9)
            var insertion_date = row.insertCell(10)

            user_id.innerHTML = data[index].user_id
            first_name.innerHTML = data[index].first_name
            last_name.innerHTML = data[index].last_name
            email.innerHTML = data[index].email
            contact_no_1.innerHTML = data[index].contact_no_1
            city.innerHTML = data[index].city
            state.innerHTML = data[index].state
            pincode.innerHTML = data[index].pincode
            is_seller.innerHTML = data[index].is_seller
            insertion_date.innerHTML = convertDate(data[index].insertion_date)

            button = document.createElement('input')
            button.type = "button";
            button.value = "Make Seller";
            button.setAttribute('onclick','makeSeller('+data[index].user_id+')');

            registerButton.appendChild(button);

        }

    }else{
        alert('No User Found')
    }

}

function makeSeller(user_id){
    console.log(user_id);
    var url = '/admin/approveSeller/';
    var csrftoken = getCookie('csrftoken');
    var parameters = {
        user_id : user_id
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(parameters));
    xhr.onload = function() {
        alert(xhr.response);
        console.log(xhr.response);
    };
}
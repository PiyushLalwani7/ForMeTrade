window.onload = function() {
};

function fetchOrders(){
//Clear containers
//Summary Table
    document.getElementById("ordersSummary").innerHTML = '';
//Hide Summary div
    document.getElementById("orders-summary-container").style.visibility = 'hidden';

    var url = '/admin/getOrders/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.OrdersFetch)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send(formData);
    xhr.onload = function() {
        document.getElementById("orders-container").style.visibility = "visible";
        populateOrdersTable(xhr.response)
    };
}

function populateOrdersTable(data){
    document.getElementById('ordersTable').innerHTML = '';
    table = document.getElementById('ordersTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Order ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "User ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Customer Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Full Address"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Email Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "User Contact 1"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "User Contact 2"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Employee Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Status"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Order Date"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Updated Date"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var radio_button = row.insertCell(0)
        var order_id = row.insertCell(1)
        var user_id = row.insertCell(2)
        var customer_name = row.insertCell(3)
        var customer_full_address = row.insertCell(4)
        var email = row.insertCell(5)
        var contact_no_1 = row.insertCell(6)
        var contact_no_2 = row.insertCell(7)
        var employee_name = row.insertCell(8)
        var status = row.insertCell(9)
        var order_date = row.insertCell(10)
        var updated_date = row.insertCell(11)
        var details_button = row.insertCell(12)

        order_id.innerHTML = data[index].order_id
        user_id.innerHTML = data[index].user_id
        customer_name.innerHTML = data[index].customer_name
        customer_full_address.innerHTML = data[index].customer_full_address
        email.innerHTML = data[index].email
        contact_no_1.innerHTML = data[index].contact_no_1
        contact_no_2.innerHTML = data[index].contact_no_2
        employee_name.innerHTML = data[index].employee_name
        status.innerHTML = data[index].status
        order_date.innerHTML = convertDate(data[index].order_date)
        updated_date.innerHTML = convertDate(data[index].updated_date)

        rb = document.createElement('input')
        rb.type = "radio";
        rb.name = "orderId";
        rb.value = data[index].order_id;

        radio_button.appendChild(rb);

        button = document.createElement('input')
        button.type = "button";
        button.value = "Order Details";
        button.setAttribute('onclick','fetchOrderDetails('+data[index].order_id+')');

        details_button.appendChild(button);

    }
}

function fetchOrderDetails(ip_order_id){
//SHOW DIV
    document.getElementById('orders-summary-container').style.visibility = 'visible'
//CLEAR SUMMARY
    document.getElementById('ordersSummary').innerHTML = ''
    var url = '/admin/orderItems/';
    var csrftoken = getCookie('csrftoken');
    var parameters = {
        order_id : ip_order_id
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(parameters));
    xhr.onload = function() {
        if(xhr.status == 200){
            console.log(xhr.response);
            populateSummary(xhr.response);
        }
    };
}

function populateSummary(data){
    document.getElementById('ordersSummary').innerHTML = ''
    table = document.getElementById('ordersSummary');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Quantity"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Price"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Total"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Details"
    tr.appendChild(th)

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var counter = row.insertCell(0)
        var product_name = row.insertCell(1)
        var blank = row.insertCell(2)
        var quantity = row.insertCell(3)
        var multiply_sign = row.insertCell(4)
        var rate = row.insertCell(5)
        var equals_sign = row.insertCell(6)
        var total = row.insertCell(7)
        var blank2 = row.insertCell(8)
        var seller_request_associated_button = row.insertCell(9)

        counter.innerHTML = index+1
        product_name.innerHTML = data[index].product_name
        blank.innerHTML = ""
        quantity.innerHTML = data[index].quantity
        multiply_sign.innerHTML = "X"
        rate.innerHTML = data[index].rate
        equals_sign.innerHTML = "="
        total.innerHTML = parseFloat(data[index].quantity) * parseFloat(data[index].rate)
        blank2.innerHTML = ""

        button = document.createElement('input')
        button.type = "button";
        button.value = "Associated Seller Request";
        button.setAttribute('onclick','fetchAssociatedSellerRequest('+data[index].seller_request_id+')');

        seller_request_associated_button.appendChild(button);
    }
    amount = performColumnAddition('ordersSummary', 7)
    var total_row = table.insertRow(table.rows.length);
    var row = table.insertRow(index+1)
    row.insertCell(0)
    row.insertCell(1).innerHTML = "AMOUNT"
    row.insertCell(2)
    row.insertCell(3)
    row.insertCell(4)
    row.insertCell(5)
    row.insertCell(6)
    row.insertCell(7).innerHTML = amount
    row.insertCell(8)
    row.insertCell(9)
}

function performColumnAddition(tableId, columnNo){
    var table = document.getElementById(tableId), sumVal = 0;
    for(var i = 1; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseFloat(table.rows[i].cells[columnNo].innerHTML);
    }
    return sumVal;
}

function fetchAssociatedSellerRequest(ip_seller_request_id){
   sessionStorage.setItem("srid_token", ip_seller_request_id);
   new_url = window.location.protocol + "//" + window.location.host + '/admin/getAssignedOrder/'
   window.open(new_url, '_blank')
}

function updateStatus(){
    try{
        selected_order_id = document.querySelector('input[name="orderId"]:checked').value;
    }
    catch(err){
        alert('Please select option!!')
    }
    try{
        var confirm_box = confirm("Please Confirm! \nDetails: \nStatus_Id: 4 \nStatus: Closed \nOrder_Id: "+selected_order_id)
        if (confirm_box == true) {
            var confirm_box2 = confirm("Please Confirm! \nDetails: \nStatus_Id: 4 \nStatus: Closed \nOrder_Id: "+selected_order_id);
            if(confirm_box2 == true){
                var url = '/admin/updateStatus/';
                var csrftoken = getCookie('csrftoken');
                var parameters = {
                    order_id : selected_order_id,
                    status_id : 4
                }
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
                xhr.responseType = 'json'
                xhr.send(JSON.stringify(parameters));
                xhr.onload = function() {
                    if(xhr.status == 200){
                        alert(xhr.response);
                    }
                };
            }
            else {
                alert("Not Closing Order");
            }
        } else {
          alert("Not Closing Order");
        }
    }catch(err){
        console.log(err);
    }
}


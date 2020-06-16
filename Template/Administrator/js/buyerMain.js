var global_user_id;
var global_buyer_request_id
var global_product_id;
var global_buyer_user_id;

window.onload = function() {
    getStatus();
    populateEmployeeDropDown();
};

function getStatus(){
    var url = '/admin/getStatus/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function() {
        if(xhr.status == 200){
            deals = xhr.response;
            var status_dropdown = document.getElementById('status_dropdown');
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode("-- select an option --") );
            status_dropdown.appendChild(opt);
            for(var i=0; i<deals.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(deals[i].status) );
                opt.value = deals[i].status_id;
                status_dropdown.appendChild(opt);
            }
        }
    };
}

function populateEmployeeDropDown(){
    var url = '/user/getEmployees/';
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send();
    xhr.onload = function() {
        if(xhr.status == 200){
            deals = xhr.response;
            var employee_dropdown = document.getElementById('EmployeeDetails_dropdown');
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode("-- select an option --") );
            employee_dropdown.appendChild(opt);
            for(var i=0; i<deals.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(deals[i].first_name) );
                opt.value = deals[i].user_id;
                employee_dropdown.appendChild(opt);
            }
        }
    };
}

function fetchBuyerRequests(){
    var url = '/admin/getBuyerRequests/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.BuyerRequestFetch)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send(formData);
    xhr.onload = function() {
        document.getElementById("assignment-container").style.visibility = "hidden";
        document.getElementById("requests-items-container").style.visibility = "hidden";
        document.getElementById("available-items-container").style.visibility = "hidden";
        document.getElementById("order-items-container").style.visibility = "hidden";

        status_id = document.forms.BuyerRequestFetch.status.value

        if(status_id == "1"){
            document.getElementById("assignment-container").style.visibility = "visible";
        }else if(status_id == "2"){
            document.getElementById("requests-items-container").style.visibility = "visible";
        }
        populateTable(xhr.response)
        document.getElementById('itemsTable').innerHTML = '';
        document.getElementById('inventoryTable').innerHTML = '';
        document.getElementById('itemsTable').innerHTML = '';
    };
}

function populateTable(data){
    document.getElementById('requestsTable').innerHTML = '';
    document.getElementById('requests-container').style.display = 'block';
    table = document.getElementById('requestsTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Request ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer User ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Customer Name"
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
    th.innerHTML = "Status"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Employee Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Created Date"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Updated Date"
    tr.appendChild(th)

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var radio_button = row.insertCell(0)
        var buyer_request_id = row.insertCell(1)
        var buyer_user_id = row.insertCell(2)
        var customer_name = row.insertCell(3)
        var email = row.insertCell(4)
        var user_contact_1 = row.insertCell(5)
        var user_contact_2 = row.insertCell(6)
        var status = row.insertCell(7)
        var employee_id = row.insertCell(8)
        var created_date = row.insertCell(9)
        var updated_date = row.insertCell(10)

        buyer_request_id.innerHTML = data[index].id
        buyer_user_id.innerHTML = data[index].buyer_user_id
        customer_name.innerHTML = data[index].customer_name
        email.innerHTML = data[index].email
        user_contact_1.innerHTML = data[index].user_contact_1
        user_contact_2.innerHTML = data[index].user_contact_2
        status.innerHTML = data[index].status
        employee_id.innerHTML = data[index].employee_id
        created_date.innerHTML = convertDate(data[index].created_date)
        updated_date.innerHTML = convertDate(data[index].updated_date)

        rb = document.createElement('input')
        rb.type = "radio";
        rb.name = "selectApproval";
        rb.value = data[index].id;

        radio_button.appendChild(rb);

    }

}

function assignEmployee(){
    try {
        request_id = document.querySelector('input[name="selectApproval"]:checked').value;
    }
    catch(err) {
        alert('Please Select a Request')
    }
    dropdown_element = document.getElementById('EmployeeDetails_dropdown')
    employee_id = dropdown_element.options[dropdown_element.selectedIndex].value;

    var url = '/admin/buyerRequestAssign/';
    var parameters = {
        request_id : request_id,
        employee_id : employee_id
    }

    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(parameters));
    xhr.onload = function() {
        if(xhr.status == 200){
            alert('Success')
            }
    };
}

function getItemsDetails(){
    try {
        request_id = document.querySelector('input[name="selectApproval"]:checked').value;
        global_buyer_request_id = request_id
        row_index = document.querySelector('input[name="selectApproval"]:checked').parentElement.parentElement.rowIndex;
        global_buyer_user_id = document.getElementById('requestsTable').rows[row_index].cells[2].innerHTML
    }
    catch(err) {
        alert('Please Select a Request')
    }
    var url = '/admin/getRequestItems/';
    var parameters = {
        request_id : request_id,
    }
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(parameters));
    xhr.onload = function() {
        if(xhr.status == 200){
                populateItemContainer(JSON.parse(xhr.response));
            }
    };
}

function populateItemContainer(data){
    document.getElementById('itemsTable').innerHTML = '';
    table = document.getElementById('itemsTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Request ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Quantity"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Description"
    tr.appendChild(th)

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var radio_button = row.insertCell(0)
        var buyer_request_id = row.insertCell(1)
        var product_id = row.insertCell(2)
        var product_name = row.insertCell(3)
        var quantity = row.insertCell(4)
        var product_description = row.insertCell(5)

        buyer_request_id.innerHTML = data[index].buyer_request_id
        product_id.innerHTML = data[index].product_id
        product_name.innerHTML = data[index].product_name
        quantity.innerHTML = data[index].quantity
        product_description.innerHTML = data[index].product_description

        rb = document.createElement('input')
        rb.type = "radio";
        rb.name = "productId";
        rb.value = data[index].product_id;

        radio_button.appendChild(rb);
    }

    if(data.length>0){
        document.getElementById('fetchInventoryButton').style.display = 'block';
    }
}

function getProductInventory(){
    try {
        product_id = document.querySelector('input[name="productId"]:checked').value;
        global_product_id = product_id;
    }
    catch(err) {
        alert('Please Select a Product')
    }
    try{
        var url = '/admin/getAvailableDeals/';
        var parameters = {
            product_id : product_id,
        }
        var csrftoken = getCookie('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
        xhr.responseType = 'json'
        xhr.send(JSON.stringify(parameters));
        xhr.onload = function() {
            if(xhr.status == 200){
                    populateInventoryTable(JSON.parse(xhr.response));
                }
        };
    }catch(err){
        console.log(err)
    }
}

function populateInventoryTable(data){
    document.getElementById('available-items-container').style.visibility = 'visible';
    document.getElementById('inventoryTable').innerHTML = '';
    table = document.getElementById('inventoryTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Request Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product ID"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Final Rate"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "My Rate"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Total Stocks"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Available Stocks"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Description"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Comments"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Contact1"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Contact2"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Full Address"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Insertion Date"
    tr.appendChild(th)


    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var radio_button = row.insertCell(0)
        var seller_request_id = row.insertCell(1)
        var product_id = row.insertCell(2)
        var product_name = row.insertCell(3)
        var final_rate = row.insertCell(4)
        var my_rate = row.insertCell(5)
        var total_stocks = row.insertCell(6)
        var available_stocks = row.insertCell(7)
        var product_description = row.insertCell(8)
        var comments = row.insertCell(9)
        var seller_id = row.insertCell(10)
        var seller_name = row.insertCell(11)
        var seller_no_1 = row.insertCell(12)
        var seller_no_2 = row.insertCell(13)
        var seller_full_address = row.insertCell(14)
        var insertion_date = row.insertCell(15)

        seller_request_id.innerHTML = data[index].seller_request_id
        product_id.innerHTML = data[index].product_id
        product_name.innerHTML = data[index].product_name
        final_rate.innerHTML = data[index].final_rate
        my_rate.innerHTML = data[index].my_rate
        total_stocks.innerHTML = data[index].total_stocks
        available_stocks.innerHTML = data[index].available_stocks
        product_description.innerHTML = data[index].product_description
        comments.innerHTML = data[index].comments
        seller_id.innerHTML = data[index].user_id
        seller_name.innerHTML = data[index].seller_name
        seller_no_1.innerHTML = data[index].contact_no_1
        seller_no_2.innerHTML = data[index].contact_no_2
        seller_full_address.innerHTML = data[index].full_address
        insertion_date.innerHTML = convertDate(data[index].insertion_date)


        rb = document.createElement('input')
        rb.type = "radio";
        rb.name = "sellerRequestId";
        rb.value = data[index].seller_request_id;

        radio_button.appendChild(rb);
    }

    if(data.length>0){
        document.getElementById('assignProductButton').style.display = 'block';
    }
}

function getAssignProduct(){
    try {
        seller_request_id = document.querySelector('input[name="sellerRequestId"]:checked').value;
    }
    catch(err) {
        alert('Please Select a Product')
    }
    try{
        document.getElementById('order-items-container').style.visibility = 'visible';
        populateOrderRow(seller_request_id, global_buyer_user_id, global_product_id);
        document.getElementById('placeOrderButton').style.display = 'block';
    }
    catch(err){
        console.log(err)
    }
}

function populateOrderRow(ip_seller_request_id, ip_global_buyer_user_id, ip_global_product_id){
    table = document.getElementById('ordersTable');
    add_row_index = table.rows.length
    var row=table.insertRow(add_row_index)

    var global_user_id = row.insertCell(0)
    var seller_request_id = row.insertCell(1)
    var global_product_id = row.insertCell(2)
    var quantity = row.insertCell(3)
    var deal_rate = row.insertCell(4)
    var button = row.insertCell(5)

    seller_request_id.innerHTML = ip_seller_request_id
    global_user_id.innerHTML = ip_global_buyer_user_id
    global_product_id.innerHTML = ip_global_product_id

    ip_box_quantity = document.createElement('input')
    ip_box_quantity.type = "text";
    ip_box_quantity.name = "quantity"+String(add_row_index);
    quantity.appendChild(ip_box_quantity)

    ip_box_rate = document.createElement('input')
    ip_box_rate.type = "text";
    ip_box_rate.name = "rate"+String(add_row_index);
    deal_rate.appendChild(ip_box_rate)

    delete_button = document.createElement('input')
    delete_button.type = "button";
    delete_button.value = "Delete";
    delete_button.setAttribute('onclick', 'deleteOrderRow()')
    button.appendChild(delete_button)
}

function deleteOrderRow() {
      // event.target will be the input element.
      var td = event.target.parentNode;
      var tr = td.parentNode; // the row to be removed
      tr.parentNode.removeChild(tr);
}

function placeOrder(){
    orderTable = document.getElementById('ordersTable')
    orders = orderTableToJson(orderTable)
    console.log(orders)
    var parameters = {
        data : orders,
        user_id : global_buyer_user_id,
        buyer_request_id : global_buyer_request_id
    }
    var url = '/admin/placeOrder/';
    var csrftoken = getCookie('csrftoken');
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

function orderTableToJson(table) {
    var data = [];
    var tableHeader = ['buyer_user_id','seller_request_id','product_id','quantity','rate'];
    for (var i=1; i<table.rows.length; i++) {
        var tableRow = table.rows[i];
        var dict = {};
        for (var j=0; j<tableRow.cells.length - 3; j++) {
            dict[tableHeader[j]] = tableRow.cells[j].innerHTML
        }
        dict[tableHeader[3]] = document.querySelector('input[name="quantity'+i+'"]').value;
        dict[tableHeader[4]] = document.querySelector('input[name="rate'+i+'"]').value;

        data.push(dict)
    }
    return data;
}

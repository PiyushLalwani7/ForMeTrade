window.onload = function() {
    fetchSellerRequest(parseInt(sessionStorage.getItem("srid_token")));
    fetchAssignedOrder(parseInt(sessionStorage.getItem("srid_token")));
    sessionStorage.removeItem("srid_token");
}
function fetchSellerRequest(ip_seller_request_id){
    document.getElementById('sellerRequestContainer').style.visibility = 'visible';
    document.getElementById('sellerRequestTable').innerHTML = '';

    var url = '/admin/getRequestInfo/';
    var csrftoken = getCookie('csrftoken');
    var parameters = {
        seller_request_id : ip_seller_request_id
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(parameters));
    xhr.onload = function() {
        if(xhr.status == 200){
            populateSellerRequestTable(xhr.response);
        }
    };
}
function fetchAssignedOrder(ip_seller_request_id){
    document.getElementById('assignedOrdersContainer').style.visibility = 'visible';
    document.getElementById('assignedOrdersTable').innerHTML = '';

    var url = '/admin/getAssignedOrder/';
    var csrftoken = getCookie('csrftoken');
    var parameters = {
        seller_request_id : ip_seller_request_id
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(parameters));
    xhr.onload = function() {
        if(xhr.status == 200){
            populateAssignedOrdersTable(xhr.response);
        }
    };
}

function populateSellerRequestTable(data){
    table = document.getElementById('sellerRequestTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = "Seller Request Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Description"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Seller Full Address"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Total Quantity"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Available Quantity"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Proposed Rate"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Final Rate"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Status"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Employee Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Comments"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Created Date"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Updated Date"
    tr.appendChild(th)

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var seller_request_id = row.insertCell(0)
        var product_name = row.insertCell(1)
        var product_description = row.insertCell(2)
        var seller_name = row.insertCell(3)
        var seller_full_address = row.insertCell(4)
        var quantity = row.insertCell(5)
        var available_quantity = row.insertCell(6)
        var proposed_rate = row.insertCell(7)
        var final_rate = row.insertCell(8)
        var status = row.insertCell(9)
        var employee_name = row.insertCell(10)
        var comments = row.insertCell(11)
        var created_date = row.insertCell(12)
        var updated_date = row.insertCell(13)

        seller_request_id.innerHTML = data[index].request_id
        product_name.innerHTML = data[index].product_name
        product_description.innerHTML = data[index].product_description
        seller_name.innerHTML = data[index].customer_name
        seller_full_address.innerHTML = data[index].customer_full_address
        quantity.innerHTML = data[index].quantity
        available_quantity.innerHTML = "<b>"+data[index].available_quantity+"</b>"
        proposed_rate.innerHTML = data[index].proposed_rate
        final_rate.innerHTML = "<b>"+data[index].final_rate+"</b>"
        status.innerHTML = data[index].status
        employee_name.innerHTML = data[index].employee_name
        comments.innerHTML = data[index].comments
        created_date.innerHTML = convertDate(data[index].created_date)
        updated_date.innerHTML = convertDate(data[index].updated_date)
    }
}

function populateAssignedOrdersTable(data){
    table = document.getElementById('assignedOrdersTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = "Order Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "User Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Address"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Id"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Product Name"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Quantity"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Selling Price"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Email"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Contact"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Buyer Contact2"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Order Date"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Updated Date"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Employee Name"
    tr.appendChild(th)

    for(var index=0; index<data.length; index++){
        var row = table.insertRow(index+1)
        var order_id = row.insertCell(0)
        var user_id = row.insertCell(1)
        var buyer_name = row.insertCell(2)
        var buyer_address = row.insertCell(3)
        var product_id = row.insertCell(4)
        var product_name = row.insertCell(5)
        var quantity = row.insertCell(6)
        var selling_price = row.insertCell(7)
        var buyer_email = row.insertCell(8)
        var buyer_contact = row.insertCell(9)
        var buyer_contact2 = row.insertCell(10)
        var order_date = row.insertCell(11)
        var updated_date = row.insertCell(12)
        var employee_name = row.insertCell(13)

        order_id.innerHTML = data[index].order_id
        user_id.innerHTML = data[index].user_id
        buyer_name.innerHTML = data[index].buyer_name
        buyer_address.innerHTML = data[index].buyer_address
        product_id.innerHTML = data[index].product_id
        product_name.innerHTML = data[index].product_name
        quantity.innerHTML = "<b>"+data[index].quantity+"</b>"
        selling_price.innerHTML = "<b>"+data[index].selling_price+"</b>"
        buyer_email.innerHTML = data[index].buyer_email
        buyer_contact.innerHTML = data[index].buyer_contact
        buyer_contact2.innerHTML = data[index].buyer_contact2
        order_date.innerHTML = convertDate(data[index].order_date)
        updated_date.innerHTML = convertDate(data[index].updated_date)
        employee_name.innerHTML = data[index].employee_name
    }
}
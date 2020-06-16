var deals;

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

function FetchDeal(){
    var url = '/admin/approveSellerDeals/';
    var csrftoken = getCookie('csrftoken');
    var formData = new FormData(document.forms.DealFetch)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.responseType = 'json'
    xhr.send(formData);
    xhr.onload = function() {
        document.getElementById("assignment-container").style.visibility = "hidden";
        document.getElementById("rate-container").style.visibility = "hidden";
        deal_detail_container = document.getElementById('deal-details')
        deal_detail_container.innerHTML = "";
        status_id = document.forms.DealFetch.status.value
        if(status_id == "1"){
            document.getElementById("assignment-container").style.visibility = "visible";
        }else if(status_id == "2")
        {
            document.getElementById("rate-container").style.visibility = "visible";
        }
        populateTable(xhr.response)



    };
}

function populateTable(data){
    document.getElementById('dealsTable').innerHTML = '';
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('details-container').style.display = 'block';
    table = document.getElementById('dealsTable');
    var tr=table.insertRow(0)
    tr.setAttribute('class','w3-grey')
    th=document.createElement('th')
    th.innerHTML = ""
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "RequestID"
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
    th.innerHTML = "Quantity"
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
    th.innerHTML = "Contact Number 1"
    tr.appendChild(th)
    th=document.createElement('th')
    th.innerHTML = "Contact Number 2"
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
        var radio_button = row.insertCell(0)
        var request_id = row.insertCell(1)
        var product_name = row.insertCell(2)
        var product_description = row.insertCell(3)
        var seller_name = row.insertCell(4)
        var seller_full_address = row.insertCell(5)
        var quantity = row.insertCell(6)
        var available_quantity = row.insertCell(7)
        var proposed_rate = row.insertCell(8)
        var final_rate = row.insertCell(9)
        var contact_no_1 = row.insertCell(10)
        var contact_no_2 = row.insertCell(11)
        var status = row.insertCell(12)
        var employee_name = row.insertCell(13)
        var comments = row.insertCell(14)
        var created_date = row.insertCell(15)
        var updated_date = row.insertCell(16)


        request_id.innerHTML = data[index].request_id
        product_name.innerHTML = data[index].product_name
        product_description.innerHTML = data[index].product_description
        seller_name.innerHTML = data[index].customer_name
        seller_full_address.innerHTML = data[index].customer_full_address
        quantity.innerHTML = data[index].quantity
        available_quantity.innerHTML = "<b>"+data[index].available_quantity+"</b>"
        proposed_rate.innerHTML = data[index].proposed_rate
        final_rate.innerHTML = "<b>"+data[index].final_rate+"</b>"
        contact_no_1.innerHTML = data[index].contact_no_1
        contact_no_2.innerHTML = data[index].contact_no_2
        status.innerHTML = data[index].status
        employee_name.innerHTML = data[index].employee_name
        comments.innerHTML = data[index].comments
        created_date.innerHTML = convertDate(data[index].created_date)
        updated_date.innerHTML = convertDate(data[index].updated_date)

        rb = document.createElement('input')
        rb.type = "radio";
        rb.name = "selectApproval";
        rb.value = data[index].request_id;



        radio_button.appendChild(rb);

    }
}

function getProducts(){
    var url = '/user/getProductsAccCategory/';
    var csrftoken = getCookie('csrftoken');
    var product_category = {
        productCategoryCode : document.getElementById("product_categories_dropdown").value
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(product_category));
    xhr.onload = function() {
        if(xhr.status == 200){
            var products = xhr.response;
            var products_dropdown = document.getElementById('products_dropdown');
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode("-- select an option --") );
            products_dropdown.appendChild(opt);
            for(var i=0; i<products.length; i++){
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(products[i].product_name) );
                opt.value = products[i].product_id;
                products_dropdown.appendChild(opt);
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

function assignEmployee(){
    try {
        request_id = document.querySelector('input[name="selectApproval"]:checked').value;
    }
    catch(err) {
        alert('Please Select a Request')
    }
    dropdown_element = document.getElementById('EmployeeDetails_dropdown')
    employee_id = dropdown_element.options[dropdown_element.selectedIndex].value;

    var url = '/admin/assignEmployee/';
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

function getDealDetails(){
    try {
        request_id = document.querySelector('input[name="selectApproval"]:checked').value;
    }
    catch(err) {
        alert('Please Select a Request')
    }
    var url = '/admin/getRequestInfo/';
    var parameters = {
        seller_request_id : request_id,
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
                populateDetailsContainer(xhr.response)
            }
    };

}

function populateDetailsContainer(data){
    deal_detail_container = document.getElementById('deal-details')
    deal_detail_container.innerHTML = "";
    for(var index=0;index<data.length;index++){
        //Add Request Id
        var div1 = document.createElement("div")
        div1.appendChild(document.createElement("label").appendChild(document.createTextNode("Request ID : ")))
        span_request_id = document.createElement("span")
        span_request_id.setAttribute("id","request_id_selected")
        span_request_id.appendChild(document.createTextNode(data[index].request_id))
        div1.appendChild(span_request_id)
        deal_detail_container.appendChild(div1)

        //Add Product Name
        var div2 = document.createElement("div")
        div2.appendChild(document.createElement("label").appendChild(document.createTextNode("Product Name : ")))
        div2.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].product_name)))
        deal_detail_container.appendChild(div2)

        //Add Product Description
        var div3 = document.createElement("div")
        div3.appendChild(document.createElement("label").appendChild(document.createTextNode("Product Description : ")))
        div3.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].product_description)))
        deal_detail_container.appendChild(div3)

        //Add Product Customer Name
        var div4 = document.createElement("div")
        div4.appendChild(document.createElement("label").appendChild(document.createTextNode("Seller Name : ")))
        div4.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].customer_name)))
        deal_detail_container.appendChild(div4)

        //Add Product Customer Name
        var div14 = document.createElement("div")
        div14.appendChild(document.createElement("label").appendChild(document.createTextNode("Seller Full Address : ")))
        div14.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].customer_full_address)))
        deal_detail_container.appendChild(div14)

        //Add Quantity
        var div5 = document.createElement("div")
        div5.appendChild(document.createElement("label").appendChild(document.createTextNode("Quantity : ")))
        div5.appendChild(document.createElement("span").appendChild(document.createTextNode("<b>"+data[index].quantity+"</b>")))
        deal_detail_container.appendChild(div5)

        //Add Change Quantity
        var div6 = document.createElement("div")
        div6.appendChild(document.createElement("label").appendChild(document.createTextNode("Final Quantity : ")))
        var quantity_input = document.createElement("input")
        quantity_input.setAttribute('type','text')
        quantity_input.setAttribute('name','input_final_quantity')
        quantity_input.setAttribute('value',data[index].quantity)
        div6.appendChild(quantity_input)
        deal_detail_container.appendChild(div6)

        //Add Proposed Rate
        var div7 = document.createElement("div")
        div7.appendChild(document.createElement("label").appendChild(document.createTextNode("Proposed Rate : ")))
        div7.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].proposed_rate)))
        deal_detail_container.appendChild(div7)

        //Add Final Rate
        var div8 = document.createElement("div")
        div8.appendChild(document.createElement("label").appendChild(document.createTextNode("Final Rate : ")))
        input_box_final_rate = document.createElement("input")
        input_box_final_rate.setAttribute('type','text')
        input_box_final_rate.setAttribute('name','input_final_rate')
        div8.appendChild(document.createElement("span").appendChild(input_box_final_rate))
        deal_detail_container.appendChild(div8)

        //Add Status
        var div9 = document.createElement("div")
        div9.appendChild(document.createElement("label").appendChild(document.createTextNode("Status : ")))
        div9.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].status)))
        deal_detail_container.appendChild(div9)

        //Add Employee Name
        var div10 = document.createElement("div")
        div10.appendChild(document.createElement("label").appendChild(document.createTextNode("Employee Name :")))
        div10.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].employee_name)))
        deal_detail_container.appendChild(div10)

        //Add Comments
        var div11 = document.createElement("div")
        input_box_comments = document.createElement("input")
        input_box_comments.setAttribute('type', 'text')
        input_box_comments.setAttribute('name', 'input_comments')
        div11.appendChild(document.createElement("label").appendChild(document.createTextNode("Comments : ")))
        div11.appendChild(document.createElement("span").appendChild(input_box_comments))
        deal_detail_container.appendChild(div11)

        //Add Contact 1
        var div12 = document.createElement("div")
        div12.appendChild(document.createElement("label").appendChild(document.createTextNode("Contact 1 :")))
        div12.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].contact_no_1)))
        deal_detail_container.appendChild(div12)

        //Add Contact 2
        var div13 = document.createElement("div")
        div13.appendChild(document.createElement("label").appendChild(document.createTextNode("Contact 2 :")))
        div13.appendChild(document.createElement("span").appendChild(document.createTextNode(data[index].contact_no_2)))
        deal_detail_container.appendChild(div13)

        input_submit_button = document.createElement("input")
        input_submit_button.setAttribute('type', 'button')
        input_submit_button.setAttribute('onclick','submitFinalRate()')
        input_submit_button.setAttribute('value','Submit')
        deal_detail_container.appendChild(input_submit_button)
    }
}

function submitFinalRate(){
    request_id = parseInt(document.getElementById('request_id_selected').innerHTML);
    ipFinalQuantity = document.querySelector('input[name=input_final_quantity]').value;
    ipFinalRate = document.querySelector('input[name=input_final_rate]').value;
    ipComments = document.querySelector('input[name=input_comments]').value

    var confirmation = confirm("Final Quantity : "+ipFinalQuantity+", Final Rate : "+ipFinalRate+" , Please Press OK To Confirm")
    if (confirmation == true) {
        var url = '/admin/postfinalRate/';
        var parameters = {
            request_id : request_id,
            final_quantity: ipFinalQuantity,
            final_rate : ipFinalRate,
            comments   : ipComments
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
                    alert(xhr.response)
                }
        };
      } else {
            alert("Please re-enter the final rate")
      }

}


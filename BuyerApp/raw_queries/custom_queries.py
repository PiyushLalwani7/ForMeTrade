from django.db import connection
from datetime import datetime


def sql_function_buyerRegister(ipUserId):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM public.\"func_buyerRequestRegister\"(%s, %s) ",
                       [ipUserId, datetime.now()])
        row = cursor.fetchone()

    return row


def sql_function_buyerRegisterWithoutCart(ipUserId, ipProductId, ipProductQuantity):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM public.\"func_buyerRequestRegisterWithoutCart\"(%s, %s, %s, %s) ",
                       [ipUserId, ipProductId, ipProductQuantity, datetime.now()])
        row = cursor.fetchone()

    return row

def sql_function_searchOrderDetails(ipUserId):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM public.\"func_searchUserOrderHistory\"(%s) ",
                       [ipUserId])
        return dictfetchall(cursor)


def sql_getBuyerRequestItems(ipRequestId):
    with connection.cursor() as cursor:
        cursor.execute('''select br_it.buyer_request_id, br_it.product_id, br_it.quantity, pr.product_name,
                        pr.product_description from public."Buyer_Request_Items" br_it
                        inner join public."Products" pr on br_it.product_id = pr.product_id
                        where br_it.buyer_request_id = %s''', [ipRequestId])
        return dictfetchall(cursor)


def sql_getProductActiveSellerDeals(ipProductId):
    with connection.cursor() as cursor:
        cursor.execute('''select sr.request_id as "seller_request_id", sr.product_id, pr.product_name, sr.final_rate,
                        sr.final_rate+5 as "my_rate", sr.quantity as "total_stocks", 
                        sr.available_quantity  as "available_stocks", pr.product_description, sr.comments,
                        ur.user_id, ur.first_name || ' ' || ur.last_name as "seller_name", ur.email as "seller_email", 
                        ur.contact_no_1 as "contact_no_1", ur.contact_no_1 as "contact_no_2", 
                        ur.address || ', ' || ur.city || ', ' || ur.state || ', ' || ur.pincode as "full_address",  
                        pr.insertion_date
                        from public."Seller_Request" sr
                        inner join public."Products" pr on sr.product_id = pr.product_id
                        inner join public."Users" ur on sr.user_id = ur.user_id
                        where sr.product_id = %s and sr.seller_status_id = 3''', [ipProductId])
        return dictfetchall(cursor)


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

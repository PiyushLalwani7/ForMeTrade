from datetime import datetime
from django.db import connection

def sql_function_placeOrder(ipEmployeeId, ipUserId, ipBuyerRequestId):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM public.\"func_placeOrder\"(%s, %s, %s, %s) ",
                                               [ipEmployeeId, ipUserId, datetime.now(), ipBuyerRequestId])
        row = cursor.fetchone()

    return row
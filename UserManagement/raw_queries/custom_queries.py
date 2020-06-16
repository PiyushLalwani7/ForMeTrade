from django.db import connection
from datetime import datetime

def sql_getAllProducts():
    with connection.cursor() as cursor:
        cursor.execute('''select * from public."Products" pr
                        inner join public."Units" unit
                        on pr.product_unit_id = unit.unit_id
                        order by pr.product_id''')
        return dictfetchall(cursor)

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

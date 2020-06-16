from django.db import models


# Create your models here.

class TempCart(models.Model):
    product_id = models.IntegerField(blank=False, null=False, db_column='product_id', primary_key=True)
    product_quantity = models.DecimalField(max_digits=20, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'Temp_Cart'


class Status(models.Model):
    status = models.BooleanField(max_length=255, db_column='func_buyerrequestregister')


class BuyerRequest(models.Model):
    buyer_request_id = models.BigIntegerField(primary_key=True)
    buyer_user_id = models.BigIntegerField(blank=False, null=False)
    buyer_status_id = models.SmallIntegerField(blank=False, null=False)
    employee_id = models.BigIntegerField(blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    updated_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Buyer_Request'


class BuyerRequestApproval(models.Model):
    id = models.BigIntegerField(db_column='buyer_request_id', primary_key=True),
    buyer_user_id = models.BigIntegerField(db_column='buyer_user_id'),
    customer_name = models.CharField(max_length=255, db_column="customer_name"),
    email = models.CharField(max_length=255, db_column="email"),
    user_contact_1 = models.CharField(db_column='user_contact_1'),
    user_contact_2 = models.CharField(db_column='user_contact_2'),
    status = models.CharField(db_column='user_contact'),
    employee_id = models.BigIntegerField(db_column='employee_id'),
    created_date = models.DateTimeField(blank=False, null=False, db_column="created_date")
    updated_date = models.DateTimeField(blank=False, null=False, db_column="updated_date")

    class Meta:
        managed = False


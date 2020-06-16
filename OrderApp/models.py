from django.db import models

# Create your models here.

class Orders_DB(models.Model):
    order_id = models.BigIntegerField(primary_key=True)
    user_id = models.BigIntegerField(blank=False, null=False)
    order_date = models.DateTimeField()
    status_id = models.IntegerField(blank=False, null=False)
    updated_date = models.DateTimeField(blank=True, null=True)
    employee_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'Orders'

class Orders(models.Model):
    order_id = models.BigIntegerField(primary_key=True)
    user_id = models.BigIntegerField(blank=False, null=False)
    customer_name = models.CharField(max_length=255, blank=False, null=False)
    customer_full_address = models.CharField(max_length=355, blank=False, null=False)
    email = models.CharField(max_length=255,blank=True, null=True)
    contact_no_1 = models.CharField(max_length=255, blank=True, null=True)
    contact_no_2 = models.CharField(max_length=255, blank=True, null=True)
    employee_name = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    order_date = models.DateTimeField(blank=True, null=True)
    updated_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False

class OrderItems(models.Model):
    order_item_id = models.BigIntegerField(primary_key=True)
    order_id = models.BigIntegerField(blank=False, null=False)
    product_id = models.BigIntegerField(blank=False, null=False)
    product_name = models.CharField(max_length=255,blank=True, null=True)
    quantity =  models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    rate =  models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    seller_request_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
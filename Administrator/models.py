from django.db import models

# Create your models here.

class Status(models.Model):
    status_id = models.SmallIntegerField(primary_key=True)
    status = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'Status'

class Temp_OrderCart(models.Model):
    identity_counter = models.BigAutoField(primary_key=True, db_column="counter")
    seller_request_id = models.BigIntegerField(blank=True, null=True, db_column="seller_request_id")
    buyer_user_id = models.BigIntegerField(blank=True, null=True)
    product_id = models.IntegerField(blank=True, null=True)
    quantity = models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    rate = models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Temp_OrderCart'




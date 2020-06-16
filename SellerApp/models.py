from django.db import models
from UserManagement.models import Products, Users

# Create your models here.

class SellerRequest(models.Model):
    request_id = models.BigAutoField(primary_key=True, db_column='request_id')
    product_id = models.IntegerField(blank=False, null=False, db_column='product_id')
    user_id = models.BigIntegerField(blank=False, null=False, db_column='user_id')
    quantity = models.DecimalField(max_digits=20, decimal_places=2, blank=False, null=False)
    proposed_rate = models.DecimalField(max_digits=20, decimal_places=2, blank=False, null=False)  # This field type is a guess.
    final_rate = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    seller_status = models.SmallIntegerField(blank=False, null=False, db_column='seller_status_id')
    employee_id = models.BigIntegerField(blank=True, null=True, db_column='employee_id')
    comments = models.CharField(max_length=355, blank=True, null=True)
    created_date = models.DateTimeField(blank=False, null=False)
    updated_date = models.DateTimeField(blank=True, null=True)
    available_quantity = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Seller_Request'


class SellerApproval(models.Model):
    request_id = models.BigIntegerField(db_column='request_id', primary_key=True)
    product_name = models.CharField(max_length=255)
    product_description = models.CharField(max_length=255)
    customer_name = models.CharField(max_length=255)
    customer_full_address = models.CharField(max_length=355)
    available_quantity = models.DecimalField(max_digits=20, decimal_places=2)
    quantity = models.DecimalField(max_digits=20, decimal_places=2)  # This field type is a guess.
    proposed_rate = models.DecimalField(max_digits=20, decimal_places=2)
    final_rate = models.DecimalField(max_digits=20, decimal_places=2)
    contact_no_1 = models.CharField(max_length=20)
    contact_no_2 = models.CharField(max_length=20)
    status = models.CharField(max_length=101)
    employee_name = models.CharField(max_length=355)
    comments = models.CharField(max_length=355)
    created_date = models.DateTimeField()
    updated_date = models.DateTimeField()


class SellerAssignedOrders(models.Model):
    order_id = models.BigIntegerField(primary_key=True)
    user_id = models.BigIntegerField(blank=False, null=False)
    buyer_name = models.CharField(max_length=255)
    buyer_address = models.CharField(max_length=355)
    product_id = models.IntegerField(blank=False, null=False)
    product_name = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=20, decimal_places=2)
    selling_price = models.DecimalField(max_digits=20, decimal_places=2)
    buyer_email = models.CharField(max_length=255)
    buyer_contact = models.CharField(max_length=255)
    buyer_contact2 = models.CharField(max_length=255)
    order_date = models.DateTimeField()
    updated_date = models.DateTimeField()
    employee_name = models.CharField(max_length=255)


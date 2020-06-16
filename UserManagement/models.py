# Users contact_no_1 to be made unique

from django.db import models

class UserCategory(models.Model):
    user_category_id = models.SmallIntegerField(primary_key=True)
    user_category_name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'User_Category'

class Users(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(unique=True, max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    insertion_date = models.DateTimeField()
    last_login = models.DateTimeField(blank=True, null=True)
    user_image_path = models.CharField(max_length=255, blank=True, null=True)
    user_category_id = models.SmallIntegerField(db_column='user_category_id')
    contact_no_1 = models.CharField(max_length=11)
    contact_no_2 = models.CharField(max_length=11, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    pincode = models.IntegerField(blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)
    is_seller = models.BooleanField(blank=True, null=True, default=False)
    seller_register_date = models.DateTimeField(blank=True, null=True)
    both_buy_sell_rights = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Users'

class Units(models.Model):
    unit_id = models.SmallAutoField(primary_key=True)
    unit_name = models.CharField(max_length=50)
    class Meta:
        managed = False
        db_table = 'Units'

class ProductCategory(models.Model):
    product_category_code = models.SmallAutoField(primary_key=True)
    product_category_name = models.CharField(max_length=55)
    product_category_description = models.CharField(max_length=101, blank=True, null=True)
    insertion_date = models.DateTimeField()
    category_image_path = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Product_Category'

class Products(models.Model):
    product_id = models.AutoField(db_column='product_id', primary_key=True)  # Field name made lowercase.
    product_category_code = models.SmallIntegerField(db_column='product_category_code', blank=True, null=True)
    product_name = models.CharField(max_length=255)
    product_description = models.CharField(max_length=255, blank=True, null=True)
    product_reorder_level = models.BooleanField(blank=True, null=True, default=True)
    product_reorder_quantity = models.IntegerField(blank=True, null=True)
    product_image_path = models.CharField(max_length=255, blank=True, null=True)
    insertion_date = models.DateTimeField(blank=True, null=True)
    product_unit_id = models.SmallIntegerField(blank=True, null=True)

    def __iter__(self):
        return [self.product_id,self.product_name,self.product_description,self.product_reorder_level, self.product_reorder_quantity, self.product_image_path, self.insertion_date]

    class Meta:
        managed = False
        db_table = 'Products'


class ProductStocks(models.Model):
    product_id = models.AutoField(db_column='product_id', primary_key=True)  # Field name made lowercase.
    product_category_code = models.SmallIntegerField(db_column='product_category_code', blank=True, null=True)
    product_name = models.CharField(db_column='product_name',max_length=255)
    product_description = models.CharField(db_column='product_description',max_length=255, blank=True, null=True)
    product_image_path = models.CharField(db_column='product_image_path',max_length=255, blank=True, null=True)
    unit_name = models.CharField(db_column='unit_name', max_length=255, blank=True, null=True)
    min_range = models.DecimalField(db_column='min_range', max_digits=100, decimal_places=2)
    max_range = models.DecimalField(db_column='max_range', max_digits=100, decimal_places=2)
    available_stock = models.DecimalField(db_column='available_stock',max_digits=100, decimal_places=2, blank=True, null=True)
    stock_status = models.BooleanField(db_column='stock_status',blank=True, null=True)

    def __iter__(self):
        return [self.product_id,self.product_category_code,self.product_name,self.product_description, self.product_image_path, self.unit_name,
                self.min_range, self.max_range, self.available_stock, self.stock_status]


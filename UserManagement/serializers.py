from .models import Users, ProductCategory, UserCategory, Products, Units, ProductStocks
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['user_id', 'first_name', 'email']


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['user_id', 'first_name', 'last_name', 'email', 'is_seller', 'city', 'state', 'contact_no_1', 'pincode', 'insertion_date']


class UnitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Units
        fields = ['unit_id','unit_name']

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['product_category_code', 'product_category_name', 'product_category_description', 'category_image_path']

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['product_id', 'product_name', 'product_image_path']


class ProductStockStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductStocks
        fields = ['product_id', 'product_name', 'product_description', 'product_image_path', 'unit_name',
                  'min_range', 'max_range', 'stock_status']


class UserCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCategory
        fields = ['user_category_id', 'user_category_name']
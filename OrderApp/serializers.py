from rest_framework import serializers
from . import models


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Orders
        fields = ['order_id', 'user_id', 'customer_name', 'customer_full_address', 'email', 'contact_no_1', 'contact_no_1', 'employee_name',  'status', 'order_date',
                  'updated_date']

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['order_item_id', 'order_id', 'product_id', 'product_name', 'quantity','rate',  'seller_request_id']
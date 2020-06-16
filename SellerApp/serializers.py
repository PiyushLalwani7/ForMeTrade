from .models import SellerApproval, SellerAssignedOrders
from rest_framework import serializers

class ApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerApproval
        fields = ['request_id', 'product_name', 'product_description', 'customer_name', 'customer_full_address', 'available_quantity', 'quantity', 'proposed_rate',
                  'final_rate', 'contact_no_1', 'contact_no_2', 'status', 'employee_name', 'comments', 'created_date', 'updated_date']


class SellerAssignedOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerAssignedOrders
        fields = ['order_id', 'user_id', 'buyer_name', 'buyer_address', 'product_id', 'product_name',
                  'quantity', 'selling_price', 'buyer_email', 'buyer_contact',
                  'buyer_contact2', 'order_date', 'updated_date', 'employee_name']

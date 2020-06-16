from rest_framework import serializers
from . import models


class BuyerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BuyerRequestApproval
        fields = ['id', 'buyer_user_id', 'customer_name', 'email', 'user_contact_1', 'user_contact_2', 'status', 'employee_id', 'created_date', 'updated_date']
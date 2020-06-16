from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from rest_framework import status

from . import models
from Administrator.models import Status as OrderStatus
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
import rest_framework
from django.utils import timezone
from datetime import datetime
from django.db import connection
from .raw_queries import custom_queries
from Utility.functions import serialize_dict

# Create your views here.
@api_view(['GET', 'POST'])
def shoppingCart(request):
    if request.method == 'GET':
        return render(request, 'BuyerPOC/shoppingCart.html')

@api_view(['POST'])
def buyRequest(request):
    if request.method == 'POST':
        #Get inputs
        ipUserId = request.session['user_token']
        ipProductId = int(request.data.get('product_id'))
        ipQuantity = float(request.data.get('quantity'))

        # Single request per Buyer Without Cart

        resultSet = custom_queries.sql_function_buyerRegisterWithoutCart(ipUserId, ipProductId, ipQuantity)
        # resultSet = [True]
        if resultSet[0]:
            output = {'message': 'inserted_record'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'went_wrong_contact_admin'}
        return Response(output, status=status.HTTP_409_CONFLICT)

        # # Multiple Items in cart
        # orders = []
        # for order in inputOrder:
        #     ipProductId = int(order['productId'])
        #     ipProductQuantity = float(order['productQuantity'])
        #     orders.append(models.TempCart(product_id = ipProductId,
        #                     product_quantity = ipProductQuantity))
        # models.TempCart.objects.bulk_create(orders)
        #
        # resultSet = custom_queries.sql_function_buyerRegister(ipUserId)
        # if resultSet[0]:
        #     output = {'message': 'added'}
        #     return Response(output, status=status.HTTP_200_OK)

        # output = {'message': 'updation went wrong immediatly check db or contact ADMIN'}
        # return Response(output, status=status.HTTP_409_CONFLICT)

def home(request):
    return render(request, 'BuyerUI/index.html')

@api_view(['GET'])
def cart(request):
    return render(request, 'BuyerUI/shopping-cart.html')

@api_view(['GET'])
def header(request):
    return render(request, 'BuyerUI/header.html')

@api_view(['GET'])
def footer(request):
    return render(request, 'BuyerUI/footer.html')

@api_view(['GET'])
def orders(request):
    return render(request, 'BuyerUI/order.html')

@api_view(['GET'])
def ordersHistory(request):
    if request.method == 'GET':
        #Get inputs
        ipUserId = request.session['user_token']
        resultSet = custom_queries.sql_function_searchOrderDetails(ipUserId)
        serializer_data = serialize_dict(resultSet)
        return Response(serializer_data, status=status.HTTP_200_OK)




from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import rest_framework
from . import models
from UserManagement.models import Users
from UserManagement.serializers import SellerSerializer
from SellerApp.models import SellerRequest, SellerApproval, SellerAssignedOrders
from SellerApp.serializers import ApprovalSerializer, SellerAssignedOrdersSerializer
from BuyerApp.models import BuyerRequest, BuyerRequestApproval
from BuyerApp.serializers import BuyerRequestSerializer
from OrderApp.models import Orders_DB, Orders, OrderItems
from OrderApp.serializers import OrdersSerializer, OrderItemsSerializer
from . import serializers
from datetime import datetime
from BuyerApp.raw_queries import custom_queries
from Utility.functions import serialize_dict
from .plpgsql import customQueries
from Utility import cleanser
# Create your views here.
from django.db import connection

@api_view(['GET'])
def adminPage(request):
    if request.method == 'GET':
        return render(request, "Administrator/main.html")

@api_view(['GET'])
def getStatus(request):
    statusObj = models.Status.objects.all()
    serializer = serializers.StatusSerializer(statusObj, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
def sellerDeals(request):
    if request.method == 'GET':
        return render(request, "Administrator/sellerRequest.html")
    elif request.method == 'POST':
        #take inputs
        ipStatusId = request.data.get('status')
        ipStartDate = request.data.get('st_date')
        ipEndDate = request.data.get('end_date')
        resultSet = SellerApproval.objects.raw("SELECT * FROM public.\"func_searchDeals\"(%s, %s, %s) ", [ipStatusId, ipStartDate, ipEndDate])
        serializer = ApprovalSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def assignEmployee(request):
    if request.method == 'POST':
        # take inputs
        ipRequestId = request.data.get('request_id')
        ipEmployeeId = request.data.get('employee_id')

        rows_affected = SellerRequest.objects.filter(request_id = ipRequestId).update(employee_id = ipEmployeeId, seller_status = 2, updated_date = datetime.now())

        if rows_affected == 1:
            output = {'message': 'one row updated'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'updation went wrong immediatly check db'}
        return  Response(output, status=status.HTTP_409_CONFLICT)

@api_view(['POST'])
def getRequestInfoApi(request):
    if request.method == 'POST':
        #take inputs
        ipRequestId = int(request.data.get('seller_request_id'))
        resultSet = SellerApproval.objects.raw("SELECT * FROM public.\"func_searchSellerDealsWithRequestId\"(%s) ", [ipRequestId])
        serializer = ApprovalSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def postFinalRate(request):
    if request.method == 'POST':
        #take inputs
        ipRequestId = int(request.data.get('request_id'))
        ipFinalQuantity = float(request.data.get('final_quantity'))
        ipFinalRate = float(request.data.get('final_rate'))
        ipComment = request.data.get('comments')

        # getQuantityDB = float(SellerRequest.objects.get(request_id = ipRequestId).quantity)
        getQuantityDB = ipFinalQuantity


        #update the final rate -- Status = Active
        rows_affected = SellerRequest.objects.filter(request_id = ipRequestId).update(final_rate = ipFinalRate, quantity = getQuantityDB,
                                                                                      seller_status = 3,comments = ipComment,
                                                                                      available_quantity = getQuantityDB, updated_date = datetime.now())
        if rows_affected == 1:
            output = {'message': 'one row updated'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'updation went wrong immediatly check db or contact ADMIN'}
        return Response(output, status=status.HTTP_409_CONFLICT)

@api_view(['GET', 'POST'])
def getBuyerRequests(request):
    if request.method == 'GET':
        return render(request, "Administrator/buyerRequest.html")
    elif request.method == 'POST':
        #take inputs
        ipStatusId = request.data.get('status')
        ipStartDate = request.data.get('st_date')
        ipEndDate = request.data.get('end_date')
        resultSet = BuyerRequestApproval.objects.raw("SELECT * FROM public.\"func_searchBuyerRequests\"(%s, %s, %s) ", [ipStatusId, ipStartDate, ipEndDate])
        serializer = BuyerRequestSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def assignEmployeeBuyerRequest(request):
    if request.method == 'POST':
        # take inputs
        ipRequestId = request.data.get('request_id')
        ipEmployeeId = request.data.get('employee_id')

        rows_affected = BuyerRequest.objects.filter(buyer_request_id = ipRequestId).update(employee_id = ipEmployeeId, buyer_status_id = 2, updated_date = datetime.now())

        if rows_affected == 1:
            output = {'message': 'one row updated'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'updation went wrong immediatly check db'}
        return  Response(output, status=status.HTTP_409_CONFLICT)

@api_view(['POST'])
def getBuyerRequestItems(request):
    if request.method == 'POST':
        #take inputs
        ipRequestId = request.data.get('request_id')
        resultSet = custom_queries.sql_getBuyerRequestItems(ipRequestId)
        serializer_data = serialize_dict(resultSet)
        return Response(serializer_data,status=status.HTTP_200_OK)

@api_view(['POST'])
def getProductActiveSellerDeals(request):
    if request.method == 'POST':
        #take inputs
        ipProductId = int(request.data.get('product_id'))
        resultSet = custom_queries.sql_getProductActiveSellerDeals(ipProductId)
        serializer_data = serialize_dict(resultSet)
        return Response(serializer_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def placeOrder(request):
    if request.method == 'POST':
        #take inputs
        #GET FROM SESSION
        ipEmployeeId = 14

        inputOrder = request.data['data']
        ipUserId = int(request.data['user_id'])
        ipBuyerRequestId = int(request.data['buyer_request_id'])


        orders = []
        for order in inputOrder:
            ipSellerRequestId = int(order['seller_request_id'])
            ipBuyerUserId = int(order['buyer_user_id'])
            ipProductId = int(order['product_id'])
            ipQuantity = float(order['quantity'])
            ipRate = float(order['rate'])
            orders.append(models.Temp_OrderCart(seller_request_id=ipSellerRequestId,
                                          buyer_user_id=ipBuyerUserId, product_id = ipProductId,
                                          quantity = ipQuantity, rate = ipRate))
        models.Temp_OrderCart.objects.bulk_create(orders)

        resultSet = customQueries.sql_function_placeOrder(ipEmployeeId, ipUserId, ipBuyerRequestId)
        if resultSet[0]:
            output = {'message': 'added'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'updation went wrong immediatly check db or contact ADMIN'}
        return Response(output, status=status.HTTP_409_CONFLICT)

@api_view(['POST'])
def updateOrderStatus(request):
    if request.method == 'POST':
        ipOrderId =  int(request.data.get('order_id'))
        ipStatusId = int(request.data.get('status_id'))
        #get from session
        ipEmployeeId = 14
        #update record
        rows_affected = Orders_DB.objects.filter(order_id=ipOrderId).update(employee_id=ipEmployeeId,
                                                                            status_id=ipStatusId,
                                                                            updated_date=datetime.now())
        if rows_affected == 1:
            output = {'message': 'one row updated'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'updation went wrong immediatly check db'}
        return  Response(output, status=status.HTTP_409_CONFLICT)

@api_view(['GET','POST'])
def allOrders(request):
    if request.method == 'GET':
        return render(request, "Administrator/ordersMain.html")
    elif request.method == 'POST':
        ipStartDate = request.data.get('st_date')
        ipEndDate = request.data.get('end_date')
        resultSet = Orders.objects.raw("SELECT * FROM public.\"func_searchOrders\"(%s, %s)",
                                                     [ipStartDate, ipEndDate])
        serializer = OrdersSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def getOrderItems(request):
    if request.method == 'POST':
        ipOrderId = request.data.get('order_id')
        resultSet = OrderItems.objects.raw("SELECT * FROM public.\"func_searchOrderItems\"(%s) ",
                                                     [ipOrderId])
        serializer = OrderItemsSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
def getAssignedOrder(request):
    if request.method == 'GET':
        return render(request, "Administrator/assignedBuyer.html")
    elif request.method == 'POST':
        ipSellerRequestId = int(request.data.get('seller_request_id'))
        resultSet = SellerAssignedOrders.objects.raw("SELECT * FROM public.\"func_searchSellerRequestAssignedBuyers\"(%s) ",
                                                     [ipSellerRequestId])
        serializer = SellerAssignedOrdersSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET','POST'])
def registerSeller(request):
    if request.method == 'GET':
        return render(request, "Administrator/sellerRegister.html")
    elif request.method == 'POST':
        ipContactNumber = cleanser.trimmer(request.data.get('contact_no'))
        resultSet = Users.objects.raw("SELECT * FROM public.\"func_searchUserWithContact\"(%s)",
                                       [ipContactNumber])
        serializer = SellerSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def approveSeller(request):
    if request.method == 'POST':
        ipUserId = int(request.data.get('user_id'))
        rows_affected = Users.objects.filter(user_id = ipUserId).update(is_seller = True, seller_register_date = datetime.now())
        if rows_affected == 1:
            output = {'message': 'one row updated'}
            return Response(output, status=status.HTTP_200_OK)

        output = {'message': 'updation went wrong immediatly check db'}
        return  Response(output, status=status.HTTP_409_CONFLICT)



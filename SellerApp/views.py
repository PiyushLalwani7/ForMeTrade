from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from . import models
from Administrator.models import Status as OrderStatus
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
import rest_framework
from django.utils import timezone
from datetime import datetime
from Utility.cleanser import trimmer



# Create your views here.
@api_view(['GET', 'POST'])
def sellProducts(request):
    if request.method == 'GET':
        return render(request, 'SellerUI/productSellForm.html')
    elif request.method == 'POST':
        #take input
        ipProductID = int(request.data.get('product_id'))
        ipQuantity = float(trimmer(request.data.get('quantity')))
        ipProposedPrice = float(trimmer(request.data.get('rate')))
        ipUserId = request.session['user_token']
        insertion_date = datetime.now()

        #Get from Status DB
        status = OrderStatus.objects.get(status="New")
        status_id = status.status_id

        # FLUSH THIS TO DB
        sellRequest = models.SellerRequest(product_id=ipProductID,
                                                 user_id=ipUserId, quantity=ipQuantity, proposed_rate=ipProposedPrice,
                                                 seller_status=status_id, created_date=insertion_date)
        sellRequest.save()

        output = {'message': 'inserted_record'}
        return Response(output, status=rest_framework.status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def home(request):
    return render(request, 'SellerUI/index.html')
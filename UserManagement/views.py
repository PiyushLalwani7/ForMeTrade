from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from . import models
from datetime import datetime
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users, ProductStocks
from .serializers import UserSerializer, ProductCategorySerializer, UserCategorySerializer, ProductsSerializer, UnitsSerializer, ProductStockStatusSerializer
from KissanMart.settings import STATIC_ROOT, STATIC_URL,MEDIA_ROOT, MEDIA_URL
from django.utils import timezone
from Utility import cleanser, constants
from .raw_queries import custom_queries
from Utility.functions import serialize_dict
import os

# Create your views here.

@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        snippets = Users.objects.filter(user_id = 2)
        serializer = UserSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        ip_user_id = request.data.get('user_id')
        snippets = Users.objects.filter(user_id = ip_user_id)
        serializer = UserSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def checkAvailability(request):
    if request.method == 'POST':
        ipMobileNumber = request.data.get('contact_no_1')
#         Preprocess Data
        ipMobileNumber = cleanser.cleanMobileNumber(ipMobileNumber)

        users = len(Users.objects.filter(contact_no_1 = ipMobileNumber))
        if users > 0:
            return Response({"message" : "denied"} , status=status.HTTP_200_OK)
        else:
            return Response({"message" : "ok"} , status=status.HTTP_200_OK)



@api_view(['GET','POST'])
def addProductCategory(request):
    if request.method == 'GET':
        return render(request, "DummyWeb/addProductCategory.html")
    elif request.method == 'POST':
        ipCategory = request.data.get('category_name')
        ipProductCategoryDescription = request.data.get('category_description')
        ipImage = request.data.get('image')


        # DATA CLEANSING
        ipCategory = ' '.join(ipCategory.split())
        ipProductCategoryDescription = ' '.join(ipProductCategoryDescription.split())

        #STORE IMAGE TO LOCAL STORAGE
        imageName = ipCategory.replace(" ","_")
        imageName = imageName.lower()
        imagePath = constants.PRODUCT_CATEGORY_PICTURES_PATH
        fileStorage = FileSystemStorage(location= imagePath,base_url=MEDIA_URL)
        filename = fileStorage.save(imageName+".jpeg", ipImage)
        uploaded_file_url = fileStorage.url(filename)

        category_image_path = constants.DB_PRODUCT_CATEGORY_PICTURES_PATH + "/" + imageName + ".jpeg"


        # FLUSH THIS TO DB
        productCategory = models.ProductCategory(product_category_name = ipCategory, product_category_description = ipProductCategoryDescription, insertion_date = datetime.now(), category_image_path = category_image_path)
        productCategory.save()

        output = {'message' : 'Completed'}
        return Response(output, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
def addProduct(request):
    if request.method == 'GET':
        return render(request, "DummyWeb/addProduct.html")
    elif request.method == 'POST':

        ipProduct_category = int(request.data.get('product_categories'))
        ipProduct_name = request.data.get('product_name')
        ipProduct_description = request.data.get('product_description')
        ipReorder_quantity = request.data.get('reorder_quantity')
        ipProduct_image = request.data.get('product_image')
        ipUnitId = request.data.get('product_unit')

        #get ProductCategory Object
        productCategory = models.ProductCategory.objects.get(product_category_code=ipProduct_category)

        # DATA CLEANSING
        ipProduct_name = cleanser.textCleanser(ipProduct_name)
        ipProduct_description = cleanser.textCleanser(ipProduct_description)

        #STORE IMAGE TO LOCAL STORAGE
        imageName = ipProduct_name.replace(" ","_")
        imageName = imageName.lower()
        imagePath = os.path.join(constants.PRODUCT_PICTURES_PATH, productCategory.product_category_name)
        fileStorage = FileSystemStorage(location= imagePath)
        filename = fileStorage.save(imageName+".jpeg", ipProduct_image)

        product_image_path = constants.DB_PRODUCT_PICTURES_PATH+"/"+imageName+".jpeg"
        # FLUSH THIS TO DB
        product = models.Products(product_category_code = productCategory, product_name = ipProduct_name, product_description = ipProduct_description, product_reorder_quantity = ipReorder_quantity,insertion_date = datetime.now(), product_image_path = product_image_path, product_unit_id=ipUnitId)
        product.save()


        output = {'message' : 'Completed'}
        return Response(output, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUnits(request):
    units = models.Units.objects.all()
    serializer = UnitsSerializer(units, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductCategory(request):
    productCategories = models.ProductCategory.objects.all()
    serializer = ProductCategorySerializer(productCategories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getProductsAccordingCategory(request):
    productCategoryCode = int(request.data.get('productCategoryCode'))
    products = models.Products.objects.filter(product_category_code = models.ProductCategory.objects.get(product_category_code = productCategoryCode))
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUserCategory(request):
    userCategories = models.UserCategory.objects.all()
    serializer = UserCategorySerializer(userCategories, many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
def registerUser(request):
    if request.method == 'GET':
        return render(request, "DummyWeb/registerUser.html")
    elif request.method == 'POST':
        try:
            # Input Parameters
            ipFirstName = request.data.get('first_name')
            ipLastName = request.data.get('last_name')
            ipAddress = request.data.get('address')
            ipCity = request.data.get('city')
            ipState = request.data.get('state')
            ipPincode = request.data.get('pincode')
            ipPassword = request.data.get('password')
            insertion_date = datetime.now()
            ipContact1 = request.data.get('contact_no_1')
            ipContact2 = request.data.get('contact_no_2')

            # ipProfileImage = request.data.get('profilePicture')

            # DATA CLEANSING
            ipFirstName = cleanser.textCleanser(ipFirstName)
            ipLastName = cleanser.textCleanser(ipLastName)
            ipAddress = cleanser.textCleanser(ipAddress)
            ipCity = cleanser.textCleanser(ipCity)
            ipState = cleanser.textCleanser(ipState)

            ipPincode = cleanser.cleanMobileNumber(ipPincode)
            ipContact1 = cleanser.cleanMobileNumber(ipContact1)

            if ipContact2 != '' or ipContact2 is not None:
                ipContact2 = cleanser.textCleanser(ipContact2)
                ipContact2 = cleanser.cleanMobileNumber(ipContact2)

            # # STORE IMAGE TO LOCAL STORAGE
            # imageName = ipUsername.replace(" ", "_")
            # imageName = imageName.lower()
            # imagePath = constants.USER_PROFILE_PICTURES_PATH
            # fileStorage = FileSystemStorage(location=imagePath)
            # filename = fileStorage.save(imageName + ".jpeg", ipProfileImage)
            # user_profile_image_path = constants.DB_USER_PROFILE_PICTURES_PATH + "/" + imageName + ".jpeg"

            # FLUSH THIS TO DB
            user = models.Users(first_name=ipFirstName, last_name=ipLastName,
                                      insertion_date=insertion_date, address=ipAddress,
                                        city=ipCity,state=ipState, pincode=ipPincode,password=ipPassword,
                                      user_category_id=2, contact_no_1=ipContact1, contact_no_2=ipContact2)
            user.save()

            output = {'message': 'inserted_record'}
            return Response(output, status=status.HTTP_200_OK)
        except Exception as err:
            output = {'message': err}
            return Response(output, status=status.HTTP_200_OK)

@api_view(['POST'])
def loginUser(request):
    if request.method == 'POST':
        # Input Parameters
        ipRegisteredNumber = request.data.get('registered_number')
        ipPassword = request.data.get('password')

        # DATA CLEANSING
        ipRegisteredNumber = cleanser.cleanMobileNumber(ipRegisteredNumber)

        # CHECK INTO DB
        user = models.Users.objects.filter(contact_no_1 = ipRegisteredNumber)

        if len(user) > 0:
            if user[0].password == ipPassword:
                request.session['user_token'] = user[0].user_id
                request.session['first_name'] = user[0].first_name
                request.session['is_seller'] = user[0].is_seller
                request.session['authentication_token'] = True

                if user[0].is_seller:
                    output = {'message': 'authenticated', 'first_name': user[0].first_name, 'seller': 'registered_seller'}
                else:
                    output = {'message': 'authenticated', 'first_name': user[0].first_name, 'seller': ''}
            else:
                output = {'message': 'incorrect_password'}
        else:
            output = {'message': 'no_user_found'}
        return Response(output, status=status.HTTP_200_OK)

@api_view(['GET'])
def logoutUser(request):
    del request.session['user_token']
    del request.session['first_name']
    del request.session['is_seller']
    del request.session['authentication_token']
    output = {'message': 'successful'}
    return Response(output, status=status.HTTP_200_OK)

@api_view(['GET'])
def employeeList(request):
    if request.method == 'GET':
        employees = Users.objects.filter(user_category_id = 1) | Users.objects.filter(user_category_id = 3)
        serializer = UserSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def getProductsList(request):
    if request.method == 'GET':
        products = custom_queries.sql_getAllProducts()
        serialized_data = serialize_dict(products)
        return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllProductStockStatus(request):
    if request.method == 'GET':
        resultSet = ProductStocks.objects.raw("SELECT * FROM public.\"func_getAllProductsStocks\"() ")
        serializer = ProductStockStatusSerializer(resultSet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def sign(request):
    return render(request, 'sign.html')


@api_view(['GET'])
def verifySession(request):
    try:
        if request.session['authentication_token']:
            return Response({'message':'ok'}, status = status.HTTP_200_OK)
        else:
            return Response({'message':'unauthorized'}, status = status.HTTP_200_OK)
    except Exception as e:
        return Response({'message':'unauthorized'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def checkSellerAuthorization(request):
    try:
        if request.session['is_seller']:
            return Response({'message':'ok'},status = status.HTTP_200_OK)
        else:
            return Response({'message':'unauthorized'}, status = status.HTTP_200_OK)
    except Exception as e:
        return Response({'message':'unauthorized'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def contactPage(request):
    if request.method == 'GET':
        return render(request, 'contact.html')



@api_view(['GET'])
def policyPage(request):
    if request.method == 'GET':
        return render(request, 'policy.html')

@api_view(['GET'])
def termsPage(request):
    if request.method == 'GET':
        return render(request, 'terms.html')


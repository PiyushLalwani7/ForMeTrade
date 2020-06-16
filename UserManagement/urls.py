from django.conf.urls import url, include
from . import views
from django.urls import path

urlpatterns = [
    path('signup/', views.registerUser),
    path('login/', views.loginUser),
    path('logout/', views.logoutUser),
    path('userList/', views.user_list),
    path('checkAvailability/', views.checkAvailability),
    path('addProductCategory/', views.addProductCategory),
    path('getProductCategories/', views.getProductCategory),
    path('getEmployees/', views.employeeList),
    path('getProductsAccCategory/', views.getProductsAccordingCategory),
    path('getProducts/', views.getProductsList),
    path('getAllStockStatus/', views.getAllProductStockStatus),
    path('addProduct/', views.addProduct),
    path('units/', views.getUnits),
    path('getUserCategories/', views.getUserCategory),
    path('sign/',views.sign),
    path('verifyTimeOut/', views.verifySession),
    path('verifySeller/', views.checkSellerAuthorization),
    path('contact/', views.contactPage),
    path('policies/', views.policyPage),
    path('terms/', views.termsPage)
]
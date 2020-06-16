from django.conf.urls import url, include
from . import views
from django.urls import path

urlpatterns = [
    path('',views.adminPage),
    path('getStatus/', views.getStatus),
    path('approveSellerDeals/', views.sellerDeals),
    path('assignEmployee/', views.assignEmployee),
    path('getRequestInfo/', views.getRequestInfoApi),
    path('postfinalRate/', views.postFinalRate),

    path('getBuyerRequests/', views.getBuyerRequests),
    path('buyerRequestAssign/', views.assignEmployeeBuyerRequest),
    path('getRequestItems/', views.getBuyerRequestItems),
    path('getAvailableDeals/', views.getProductActiveSellerDeals),
    path('placeOrder/', views.placeOrder),
    path('updateStatus/', views.updateOrderStatus),

    path('getOrders/', views.allOrders),
    path('orderItems/', views.getOrderItems),
    path('getAssignedOrder/', views.getAssignedOrder),

    path('sellerRequestApproval/', views.registerSeller),
    path('approveSeller/', views.approveSeller),

]

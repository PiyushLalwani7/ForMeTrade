from . import views
from django.urls import path

urlpatterns = [
    path('cart/',views.cart),
    path('header/',views.header),
    path('footer/',views.footer),
    path('shoppingCart/', views.shoppingCart),
    path('buyRequest/', views.buyRequest),
    path('orders/', views.orders),
    path('getOrdersHistory/', views.ordersHistory),
]

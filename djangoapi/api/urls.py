
from django.urls import path,include
from .views import get_customers,update_customer,add_customer,delete_customer
urlpatterns = [
    path('customers/', get_customers, name='get_customers'),

    path('customers/add', add_customer, name='add_customer'),
    path('customers/update/<int:customer_id>', update_customer, name='update_customer'),
    path('customers/delete/<int:customer_id>', delete_customer, name='delete_customer'),
]

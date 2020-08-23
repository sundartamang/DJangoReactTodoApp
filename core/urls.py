from django.urls import path
from .views import (
    addItem,
    viewlist,
    update,
    delete,
    # UpdateDeleteView,
)

app_name = 'core'
urlpatterns = [
    # path('', home.as_view(), name='home'),
    path('', viewlist.as_view(), name='home'),
    path('add-item/', addItem.as_view(), name='add-item'),
    path('update/<str:pk>/', update,name='update'),
    path('delete/<str:pk>/', delete,name='delete'),
    # path('update-delete/<str:pk>/', UpdateDeleteView.as_view(), name='home'),
]


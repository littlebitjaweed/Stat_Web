from django.urls import path
from . import views

urlpatterns=[
    path('',views.home,name='home'),
    path('products/',views.products, name='products'),
    path('contact/',views.contact,name='contact'),
    path('aboutus/',views.aboutus,name='aboutus'),
    path('mystat/',views.mystat,name='mystat'),
    path('mycerebro/',views.mycerebro,name='mycerebro'),
]
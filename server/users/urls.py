from django.urls import re_path
from . import views

urlpatterns = [
    re_path('singup', views.singup),
    re_path('login', views.api_login),
    re_path('test-token', views.test_token),
]
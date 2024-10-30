from django.urls import re_path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    re_path('signup', views.signup),
    re_path('login/', obtain_auth_token, name='login'),
    re_path('test-token', views.test_token),
]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getTeams),
    path('team/add/', views.addTeam),
]
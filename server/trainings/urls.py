# trainings/urls.py

from django.urls import path, include
from .routers import router
from .views import signupTeam, getScheduleBydate

urlpatterns = [
    path('signup/', signupTeam, name='signup_team'),  
    path('get-schedule-by-date/', getScheduleBydate, name='get_schedule_by_date'),  
    path('', include(router.urls)),  # Incluir rutas generadas por el router
]

# trainings/routers.py

from rest_framework.routers import DefaultRouter
from .views import (
    TeamViewSet,
    TrainingDayViewSet,
    EnrollmentViewSet,
    GameViewSet
)

# Crear un router y registrar los ViewSets
router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'training-days', TrainingDayViewSet, basename='trainingday')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'games', GameViewSet, basename='game')

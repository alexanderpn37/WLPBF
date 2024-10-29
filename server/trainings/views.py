# trainings/views.py

from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import datetime

from .models import Team, TrainingDay, Enrollment, Game
from .serializers import (
    TeamSerializer,
    TrainingDaySerializer,
    EnrollmentSerializer,
    GameSerializer
)

# ViewSets para operaciones CRUD

class TeamViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar operaciones CRUD de Teams.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class TrainingDayViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar operaciones CRUD de TrainingDays.
    """
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class EnrollmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar operaciones CRUD de Enrollments.
    """
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class GameViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar operaciones CRUD de Games.
    """
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vistas Basadas en Funciones para Acciones Personalizadas

@api_view(['POST'])
@permission_classes([AllowAny])  # Permite que cualquier usuario se inscriba
def signupTeam(request):
    """
    Permite inscribir un equipo en un día de entrenamiento.
    """
    try:
        serializer = EnrollmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Equipo inscrito exitosamente.', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])  # Permite que cualquier usuario consulte
def getScheduleBydate(request):
    """
    Recupera todos los equipos inscritos para una fecha específica.
    """
    date_str = request.GET.get('date')
    
    if not date_str:
        return Response(
            {'error': 'El parámetro "date" es obligatorio.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Convertir el string a un objeto datetime.date
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return Response(
            {'error': 'El formato de la fecha debe ser YYYY-MM-DD.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Filtrar las Enrollments por la fecha proporcionada y optimizar la consulta
    enrollments = Enrollment.objects.filter(training_day=date).select_related('team')
    
    if not enrollments.exists():
        return Response(
            {'message': 'No hay equipos programados para esta fecha.'},
            status=status.HTTP_200_OK
        )
    
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

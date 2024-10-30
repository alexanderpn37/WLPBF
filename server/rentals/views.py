# rentals/views.py

from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from .models import Rental
from .serializers import RentalSerializer
from .filters import RentalFilter

class RentalViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing rental instances.
    """
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = RentalFilter
    ordering_fields = ['rental_date', 'rental_time', 'number_of_players']
    search_fields = ['first_name', 'last_name', 'email']

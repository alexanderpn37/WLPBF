import django_filters
from .models import Rental

class RentalFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name='rental_date', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='rental_date', lookup_expr='lte')

    class Meta:
        model = Rental
        fields = ['start_date', 'end_date']

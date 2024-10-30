from django.contrib import admin
from .models import Rental

@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'rental_date', 'rental_time', 'caliber')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('caliber', 'rental_date')

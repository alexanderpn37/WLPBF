# rentals/models.py

from django.db import models

class Rental(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    rental_date = models.DateField()
    rental_time = models.TimeField()
    number_of_players = models.PositiveIntegerField()
    caliber = models.CharField(max_length=10)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.caliber} Caliber"

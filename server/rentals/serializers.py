# rentals/serializers.py

from rest_framework import serializers
from .models import Rental

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = [
            'id',
            'first_name',
            'last_name',
            'phone_number',
            'email',
            'rental_date',
            'rental_time',
            'number_of_players',
            'caliber',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_email(self, value):
        """
        Ensure that the email is unique.
        """
        if self.instance:
            # When updating, exclude the current instance
            if Rental.objects.exclude(id=self.instance.id).filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        else:
            if Rental.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        return value
    
    def validate_number_of_players(self, value):
        """
        Ensure that the number of players is at least 1.
        """
        if value < 1:
            raise serializers.ValidationError("There must be at least one player.")
        return value

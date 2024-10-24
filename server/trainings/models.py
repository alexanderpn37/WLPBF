from django.db import models

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=255)
    division = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=50)
    contact_email = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Schedule(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    day = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.team.name} - {self.day}"
    
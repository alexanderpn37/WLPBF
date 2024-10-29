# trainings/models.py

from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255)
    division = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=50)
    contact_email = models.EmailField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class TrainingDay(models.Model):
    date = models.DateField(unique=True)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.date.strftime('%Y-%m-%d')

class Enrollment(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='enrollments')
    training_day = models.ForeignKey(TrainingDay, on_delete=models.CASCADE, related_name='enrollments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('team', 'training_day')
        verbose_name = 'Enrollment'
        verbose_name_plural = 'Enrollments'
    
    def __str__(self):
        return f"{self.team.name} enrolled on {self.training_day.date}"

class Game(models.Model):
    training_day = models.ForeignKey(TrainingDay, on_delete=models.CASCADE, related_name='games')
    home_team = models.ForeignKey(Team, related_name='home_games', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Team, related_name='away_games', on_delete=models.CASCADE)
    game_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.home_team.name} vs {self.away_team.name} on {self.training_day.date} at {self.game_time}"

# trainings/serializers.py

from rest_framework import serializers
from .models import Team, TrainingDay, Enrollment, Game

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'division', 'owner_name', 'contact_number', 'contact_email', 'created_at', 'updated_at']

class TrainingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingDay
        fields = ['id', 'date', 'location', 'created_at', 'updated_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    training_day = TrainingDaySerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True)
    training_day_id = serializers.PrimaryKeyRelatedField(queryset=TrainingDay.objects.all(), source='training_day', write_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['id', 'team', 'training_day', 'team_id', 'training_day_id', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'team', 'training_day']
    
    def validate(self, data):
        """
        Valida que un equipo no se inscriba más de una vez en el mismo día.
        """
        team = data.get('team')
        training_day = data.get('training_day')
        if Enrollment.objects.filter(team=team, training_day=training_day).exists():
            raise serializers.ValidationError("Este equipo ya está inscrito para el día especificado.")
        return data

class GameSerializer(serializers.ModelSerializer):
    training_day = TrainingDaySerializer(read_only=True)
    training_day_id = serializers.PrimaryKeyRelatedField(queryset=TrainingDay.objects.all(), source='training_day', write_only=True)
    home_team = TeamSerializer(read_only=True)
    away_team = TeamSerializer(read_only=True)
    home_team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='home_team', write_only=True)
    away_team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='away_team', write_only=True)
    
    class Meta:
        model = Game
        fields = [
            'id',
            'training_day',
            'training_day_id',
            'home_team',
            'home_team_id',
            'away_team',
            'away_team_id',
            'game_time',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'training_day', 'home_team', 'away_team']
    
    def validate(self, data):
        """
        Valida que el home_team y away_team sean diferentes y estén inscritos en el training_day.
        """
        home_team = data.get('home_team')
        away_team = data.get('away_team')
        training_day = data.get('training_day')
        
        if home_team == away_team:
            raise serializers.ValidationError("El equipo local y visitante deben ser diferentes.")
        
        # Verificar que ambos equipos estén inscritos en el training_day
        if not Enrollment.objects.filter(team=home_team, training_day=training_day).exists():
            raise serializers.ValidationError(f"{home_team.name} no está inscrito para el día {training_day.date}.")
        if not Enrollment.objects.filter(team=away_team, training_day=training_day).exists():
            raise serializers.ValidationError(f"{away_team.name} no está inscrito para el día {training_day.date}.")
        
        return data

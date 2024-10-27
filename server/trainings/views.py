from rest_framework.response import Response
from rest_framework.decorators import api_view
from trainings.models import Team, Schedule
from .serializers import TeamSerializer, ScheduleSerializer

@api_view(['GET'])
def getTeams(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addTeam(request, team):
    serializer = TeamSerializer(data=team)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['GET'])
def getSchedule(request):
    schedule = Schedule.objects.all()
    serializer = ScheduleSerializer(schedule, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addSchedule(request, schedule):
    serializer = ScheduleSerializer(data=schedule)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



from django.shortcuts import render
from .serializer import UserSerializer, TaskSerializer
from .models import Tasks
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, renderers
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout


class Logout(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    #Getting completed tasks 

    @action(detail=False)
    def completed(self, request):
        task_completed = Tasks.objects.all().filter(owner = request.user,status = 'COMPLETED')
        page = self.paginate_queryset(task_completed)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(task_completed, many=True)
        return Response(serializer.data)

    #Getting in-Progress tasks 

    @action(detail=False)
    def inProgress(self, request):
        task_inProgress = Tasks.objects.all().filter(owner = request.user,status = 'IN-PROGRESS')

        page = self.paginate_queryset(task_inProgress)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(task_inProgress, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def shopping(self, request):
        shopping_tasks = Tasks.objects.all().filter(owner = request.user,label = 'SHOPPING')
        page = self.paginate_queryset(shopping_tasks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(shopping_tasks, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def personal_task(self, request):
        personal_tasks = Tasks.objects.all().filter(owner = request.user,label = 'PERSONAL')
        page = self.paginate_queryset(personal_tasks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(personal_tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    def work(self, request):
        work_tasks = Tasks.objects.all().filter(owner = request.user,label = 'WORK')
        page = self.paginate_queryset(work_tasks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(work_tasks, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def others(self, request):
        other_tasks = Tasks.objects.all().filter(owner = request.user,label = 'OTHERS')
        page = self.paginate_queryset(other_tasks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(other_tasks, many=True)
        return Response(serializer.data)


    #Getting Complete tasks 

    @action(detail=False)
    def new(self, request):
        task_new = Tasks.objects.all().filter(owner = request.user,status = 'NEW')

        page = self.paginate_queryset(task_new)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(task_new, many=True)
        return Response(serializer.data)

    def get_queryset(self, *args, **kwargs):
        return Tasks.objects.all().filter(owner = self.request.user)
        # .exclude(status = 'COMPLETED')

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

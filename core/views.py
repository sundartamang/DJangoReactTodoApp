from django.shortcuts import render
from rest_framework.views import APIView
from django.views.generic import View,ListView,DetailView,DeleteView,CreateView,UpdateView
from .models import Task
from rest_framework.response import Response
from .serializers import TaskSerializer
from rest_framework import generics
from rest_framework import mixins
from rest_framework.decorators import api_view


class viewlist(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        # emp = employee.first() #serialize first object
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

class addItem(APIView):
    def post(self,request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Added one employee")
        else:
            return Response("Serializer is no valid")

# @api_view(['POST'])
# def update(request,pk):
#     tasks = Task.objects.get(id=pk)
#     serializer = TaskSerializer(instance=tasks, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response("Information updated successfully")
#     else:
#         return Response("Serializer is no valid")
        
@api_view(['POST'])
def update(request,pk):
    tasks = Task.objects.get(id=pk)
    print("Task : ",tasks)
    serializer = TaskSerializer(instance=tasks,data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response("Information updated successfully")
    else:
        pass


@api_view(['DELETE'])
def delete(request,pk):
    tasks = Task.objects.get(id=pk)
    tasks.delete()
    return Response("Successfully deleted")

    
# class PostListCreateView(generics.ListCreateAPIView):
#     serializer_class = TaskSerializer
#     queryset = Task.objects.all()

# class UpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = TaskSerializer
#     queryset = Task.objects.all()
    
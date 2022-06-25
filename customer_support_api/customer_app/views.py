from urllib import request
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
def Test(request):
    return JsonResponse({"data":"test"})
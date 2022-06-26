from django.urls import path
from .views import *

urlpatterns = [
    path('test', Test),
    path('FileClaim',PostClaimDetails),
    path('getQueryVideo',GetQueryVideo)
]

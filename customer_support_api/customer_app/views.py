from django.http import JsonResponse
from rest_framework.decorators import api_view

# Create your views here.
def dummy(req):
    return("answer to : " + req)

@api_view(['POST'])
def Test(request):
    try:
        data = request.data['message']
        return JsonResponse({
            "success":True,
            "data":dummy(data)
        })
    except:
        return JsonResponse({
            "success":False,
            "error":"invalid data"
        })
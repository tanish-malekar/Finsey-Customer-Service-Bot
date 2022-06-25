from django.http import JsonResponse
from rest_framework.decorators import api_view
from elasticsearch import Elasticsearch
from elasticsearch import Elasticsearch, helpers


# Create your views here.
def dummy(req):
    print(Elasticsearch)
    es = Elasticsearch(
    cloud_id="HackRX:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDA5OTMzNjQ5ODJkMDQyOThhY2IwZmY5ZmNjYTMwMGRmJGRiYWViNjhhOTlkNDRlY2FhOTU1NzE1ZTUxNGU3ZDM0",
    http_auth=("elastic", "IT46F8n20fj9lITRuK6EqRNE"),
    verify_certs=False
    )

    rest = es.search(index="some36", body={
                "query": {"match": {'text': req}}})  # search query

    soln = rest['hits']['hits'][0]['_source']['text']
    print(soln)
    return(soln)
    # return("answer to:" + req)

@api_view(['POST'])
def Test(request):
    # try:
    data = request.data['message']
    return JsonResponse({
        "success":True,
        "data":dummy(data)
    })
    # except:
    #     return JsonResponse({
    #         "success":False,
    #         "error":"invalid data"
    #     })
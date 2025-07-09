from django.urls import path
from .views import RAGAnswerView

urlpatterns = [
    path("ask/", RAGAnswerView.as_view(), name="rag-ask"),
]
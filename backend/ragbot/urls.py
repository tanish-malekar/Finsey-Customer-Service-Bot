from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WebsiteProjectViewSet, 
    RAGAnswerView, 
    SpeechToTextView, 
    TextToSpeechView
)

router = DefaultRouter()
router.register(r'projects', WebsiteProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("ask/", RAGAnswerView.as_view(), name="rag-ask"),
    path("speech-to-text/", SpeechToTextView.as_view(), name="speech-to-text"),
    path("text-to-speech/", TextToSpeechView.as_view(), name="text-to-speech"),
]
from django.urls import path
from . import views

urlpatterns = [
    path('ask/', views.RAGAnswerView.as_view(), name='rag-answer'),
    path('speech-to-text/', views.SpeechToTextView.as_view(), name='speech-to-text'),
    path('text-to-speech/', views.TextToSpeechView.as_view(), name='text-to-speech'),
]
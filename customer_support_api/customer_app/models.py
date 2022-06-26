from django.db import models

# Create your models here.
class ImageLink(models.Model):
    answer = models.CharField(max_length=1000)
    url = models.URLField(max_length=1000)
from django.db import models

# Create your models here.
class Note(models.Model):
    description = models.CharField(max_length=300)
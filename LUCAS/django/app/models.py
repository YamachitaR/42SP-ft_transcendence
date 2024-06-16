# app/models.py

from django.db import models

class YourModel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


# Create your models here.
class AccountType(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

User = settings.AUTH_USER_MODEL
# Create your models here.

class User(AbstractUser):
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_customers = models.BooleanField(default=True)
    phone_no = models.CharField(max_length=13, blank=True, null=True)
    ver_code = models.CharField(blank=True, null=True, max_length=10)

    def __str__(self):
        return self.username
from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


# Create your models here.
class AccountType(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class InstagramAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=254)
    followers = models.PositiveIntegerField(blank=True, null=True)
    lifespan = models.PositiveSmallIntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    

    def __str__(self):
        return self.username
    

class InstagramAccountPhotos(models.Model):
    account = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='images/instagram_account/%Y/%m/%d')

    def __str__(self):
        return self.account.username
    
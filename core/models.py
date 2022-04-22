from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


# Create your models here.
class AccountType(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Product(models.Model):
    account_type = models.ForeignKey(AccountType, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-id']
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.name

    
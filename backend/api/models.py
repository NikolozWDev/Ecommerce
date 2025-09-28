from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)

    REQUIRED_FIELDS = ["username"]
    USERNAME_FIELD = "email"
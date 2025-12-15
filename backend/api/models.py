from django.db import models
from django.contrib.auth.models import AbstractUser
import random
from django.utils import timezone
from datetime import timedelta
from cloudinary.models import CloudinaryField
from cloudinary_storage.storage import MediaCloudinaryStorage

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_picture = CloudinaryField('profile picture', blank=True, null=True)
    promo_code = models.CharField(max_length=40, blank=True, null=True)

    REQUIRED_FIELDS = ["username"]
    USERNAME_FIELD = "email"


class EmailVerification(models.Model):
    email = models.EmailField(unique=True)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)
    expires_at = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(random.randint(100000, 999999))
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=1)
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} - {self.code}"


class Product(models.Model):
    title = models.CharField(max_length=48)
    image_url = models.URLField(max_length=500)
    rate = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    down_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    text = models.TextField(max_length=128)
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} -> {self.product.title}"


COLOR_CHOICES = [
    ('color-first', 'Color 1'),
    ('color-second', 'Color 2'),
    ('color-third', 'Color 3'),
]
SIZE_CHOICES = [
    ('Small', 'S'),
    ('Medium', 'M'),
    ('Large', 'L'),
    ('X-Large', 'XL'),
]
class Basket(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="baskets")
    color = models.CharField(max_length=20, choices=COLOR_CHOICES)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    number = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.email} --> product:'{self.product.title}' (color:'{self.color}', size:'{self.size}'), count:'{self.number}'"
    
    def total_price(self):
        price = self.product.down_price if self.product.down_price != "0.00" else self.product.price
        return price * self.number
    total_price = property(total_price)


CURRENT_STATUS = [
    ("Student", "S"),
    ("Employed Graduate", "EG"),
    ("Unemployed Graduate", "UG"),
]
class ShippingAddress(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    address = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    qualification = models.CharField(max_length=100, blank=True, null=True)
    current_status = models.CharField(max_length=100, choices=CURRENT_STATUS)

    def __str__(self):
        return f"{self.user.email} address"


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
from django.contrib import admin
from .models import CustomUser, Product, Comment, Basket

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Comment)
admin.site.register(Basket)
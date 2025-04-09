from django.contrib import admin

# Register your models here.
from .models import RapChieuPhim

class RapChieuPhimAdmin(admin.ModelAdmin):
    list_display = ('ten_rap', 'dia_chi', 'mo_ta', 'kinh_do', 'vi_do', 'anh_rap')
    search_fields = ('ten_rap', 'dia_chi')

admin.site.register(RapChieuPhim, RapChieuPhimAdmin)
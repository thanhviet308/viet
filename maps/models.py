from django.db import models

# Create your models here.
class RapChieuPhim(models.Model):
    ten_rap = models.CharField(max_length=255)
    dia_chi = models.TextField()
    kinh_do = models.FloatField()  # longitude
    vi_do = models.FloatField()    # latitude
    mo_ta = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.ten_rap

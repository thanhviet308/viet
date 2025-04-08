from django.shortcuts import render
from .models import RapChieuPhim
from django.http import JsonResponse

# Create your views here.
def simplemap(request):
    return render(request, 'simple-map.html')
def search(request):
    return render(request, 'search-address.html')
def cinema(request):
    return render(request, 'index.html')
def cinema_geojson(request):
    features = []

    for rap in RapChieuPhim.objects.all():
        features.append({
            "type": "Feature",
            "properties": {
                "name": rap.ten_rap,
                "address": rap.dia_chi,
                "description": rap.mo_ta
            },
            "geometry": {
                "type": "Point",
                "coordinates": [rap.kinh_do, rap.vi_do]  # lon, lat
            }
        })

    data = {
        "type": "FeatureCollection",
        "features": features
    }

    return JsonResponse(data)
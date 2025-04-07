from django.shortcuts import render

# Create your views here.
def simplemap(request):
    return render(request, 'simple-map.html')
def search(request):
    return render(request, 'search-address.html')
def cinema(request):
    return render(request, 'index.html')

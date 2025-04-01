from django.urls import path
from . import views

urlpatterns = [
    path('', views.employees),
    path('add_employee', views.add_employee, name='add_employee'),
    path('addrec', views.addrec, name='addrec'),
    path('project', views.project, name='project'),
]
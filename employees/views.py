from django.shortcuts import render, redirect

from .models import Employee, Project



# Create your views here.
def employees(request):
    emp =Employee.objects.all()
    return render(request, 'employees/index.html', {'employees': emp})

def add_employee(request):
    return render(request, 'employees/add_emp.html') 

def addrec(request):
    x = request.POST['first_name']
    y = request.POST['last_name']
    z = request.POST['created_at']
    t = request.POST['updated_at']
    emp = Employee(first_name=x, last_name=y, created_at=z, updated_at=t)
    emp.save()
    return redirect('/employees')
def project(request):
    pro =Project.objects.all()
    return render(request, 'employees/index.html', {'project': pro})


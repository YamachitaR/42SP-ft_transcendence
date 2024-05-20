from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def printHomepage(request):
    return HttpResponse(request, 'homepage.html')

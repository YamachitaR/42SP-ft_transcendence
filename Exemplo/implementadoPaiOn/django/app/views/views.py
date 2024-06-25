from django.shortcuts import render

def home(request, any=None):
	return render(request, 'index.html')

from django.shortcuts import render

def home(request, any=None):
	return render(request, 'index.html')

def chat(request, room_name):
    return render(request, 'index.html', {
        'room_name': room_name
    })

# myapp/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Item

def item_list(request):
    items = Item.objects.all()
    return render(request, 'myapp/item_list.html', {'items': items})

def item_create(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        item = Item.objects.create(name=name, description=description)
        return JsonResponse({'id': item.id, 'name': item.name, 'description': item.description})
    return render(request, 'myapp/item_form.html')

def item_update(request, id):
    item = get_object_or_404(Item, id=id)
    if request.method == 'POST':
        item.name = request.POST.get('name')
        item.description = request.POST.get('description')
        item.save()
        return JsonResponse({'id': item.id, 'name': item.name, 'description': item.description})
    return render(request, 'myapp/item_form.html', {'item': item})

def item_delete(request, id):
    item = get_object_or_404(Item, id=id)
    if request.method == 'POST':
        item.delete()
        return JsonResponse({'result': 'success'})
    return render(request, 'myapp/item_confirm_delete.html', {'item': item})

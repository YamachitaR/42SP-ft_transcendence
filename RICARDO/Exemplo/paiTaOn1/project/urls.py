# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('online/', include('online.urls')),
    path('', TemplateView.as_view(template_name='status.html'), name='home'),
]


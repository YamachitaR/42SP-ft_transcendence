#!/bin/bash

for i in {1..30}
do
  python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
email = f'user$i@example.com'
username = f'user$i'
if not User.objects.filter(email=email).exists():
    user = User.objects.create_user(email=email, password='password123', username=username, first_name=f'User{i}', last_name='Test')
    user.save()
    print(f'Usuário {username} criado com sucesso!')
END
done
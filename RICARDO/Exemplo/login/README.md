# Aplicação de autenticação com email e senha.

Vamos criar uma Single Page Application (SPA) utilizando JavaScript Vanilla e Bootstrap no frontend, e Django no backend. A aplicação terá abas para login, logout e cadastro, e o cadastro será feito apenas com email. Utilizaremos sessões para autenticação, sem REST ou JWT.

## Tutorial 

### Passo 1: Configuração do Projeto Django

1. **Instalar Django:**
   ```bash
   pip install django
   ```

2. **Criar o projeto Django:**
   ```bash
   django-admin startproject myproject
   cd myproject
   ```

3. **Criar um aplicativo Django:**
   ```bash
   python manage.py startapp authapp
   ```

4. **Adicionar o aplicativo ao `INSTALLED_APPS` em `myproject/settings.py`:**
   ```python
   INSTALLED_APPS = [
       ...
       'authapp',
   ]
   ```

5. **Configurar URLs em `myproject/urls.py`:**
   ```python
   from django.contrib import admin
   from django.urls import path, include

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('', include('authapp.urls')),
   ]
   ```

6. **Criar URLs para o `authapp` em `authapp/urls.py`:**
   ```python
   from django.urls import path
   from . import views

   urlpatterns = [
       path('', views.index, name='index'),
       path('login/', views.login_view, name='login'),
       path('logout/', views.logout_view, name='logout'),
       path('check_login/', views.check_login, name='check_login'),
       path('register/', views.register_view, name='register'),
   ]
   ```

### Passo 2: Configuração do Backend

1. **Criar as views em `authapp/views.py`:**
   ```python
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        print("Recebido login:",email)
        try:
            if User.objects.filter(email=email).exists():
                nome = User.objects.get(email=email).username
                user = authenticate(username=nome, password=password)
            else:
                return JsonResponse({'success': False, 'error': 'Email not found'})

            if user is not None:
       
                login(request, user)
                print("Login bem-sucedido")
                return JsonResponse({'success': True})
            else:
                print("Falha na autenticação")
                return JsonResponse({'success': False})
        except User.DoesNotExist:
            print("Usuário não encontrado")
            return JsonResponse({'success': False})
    return JsonResponse({'success': False})


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        print("registttttttttttttttro")
        if not User.objects.filter(username=email).exists():
            User.objects.create_user(username=email, email=email, password=password)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Email already registered'})
    return JsonResponse({'success': False, 'error': 'Invalid request method'})




def index(request):
    return render(request, 'authapp/index.html')

def logout_view(request):
    logout(request)
    return JsonResponse({'success': True})

def check_login(request):
    if request.user.is_authenticated:
        return JsonResponse({'authenticated': True, 'username': request.user.username})
    return JsonResponse({'authenticated': False})

   ```

2. **Configurar templates e estáticos em `myproject/settings.py`:**
   ```python
   import os

   TEMPLATES = [
       {
           'BACKEND': 'django.template.backends.django.DjangoTemplates',
           'DIRS': [os.path.join(BASE_DIR, 'templates')],
           'APP_DIRS': True,
           'OPTIONS': {
               'context_processors': [
                   'django.template.context_processors.debug',
                   'django.template.context_processors.request',
                   'django.contrib.auth.context_processors.auth',
                   'django.contrib.messages.context_processors.messages',
               ],
           },
       },
   ]

   STATIC_URL = '/static/'
   STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
   ```

### Passo 3: Configuração do Frontend

1. **Criar o template HTML `templates/authapp/index.html` com abas para login, logout e cadastro:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Authentication SPA</title>
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
       <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
   </head>
   <body>
       <div class="container">
           <ul class="nav nav-tabs" id="authTabs" role="tablist">
               <li class="nav-item">
                   <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab">Login</a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab">Register</a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" id="logout-tab" data-toggle="tab" href="#logout" role="tab">Logout</a>
               </li>
           </ul>
           <div class="tab-content">
               <div class="tab-pane fade show active" id="login" role="tabpanel">
                   <h2>Login</h2>
                   <form id="login-form">
                       <div class="form-group">
                           <label for="login-email">Email</label>
                           <input type="email" class="form-control" id="login-email" required>
                       </div>
                       <div class="form-group">
                           <label for="login-password">Password</label>
                           <input type="password" class="form-control" id="login-password" required>
                       </div>
                       <button type="submit" class="btn btn-primary">Login</button>
                   </form>
               </div>
               <div class="tab-pane fade" id="register" role="tabpanel">
                   <h2>Register</h2>
                   <form id="register-form">
                       <div class="form-group">
                           <label for="register-email">Email</label>
                           <input type="email" class="form-control" id="register-email" required>
                       </div>
                       <div class="form-group">
                           <label for="register-password">Password</label>
                           <input type="password" class="form-control" id="register-password" required>
                       </div>
                       <button type="submit" class="btn btn-primary">Register</button>
                   </form>
               </div>
               <div class="tab-pane fade" id="logout" role="tabpanel">
                   <h2>Logout</h2>
                   <button id="logout-button" class="btn btn-secondary">Logout</button>
               </div>
           </div>
           <p id="user-info" style="display: none;"></p>
       </div>
       <script src="{% static 'authapp/script.js' %}"></script>
   </body>
   </html>
   ```

2. **Criar o script JavaScript `static/authapp/script.js`:**
   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       checkLoginStatus();

       document.getElementById('login-form').addEventListener('submit', function(event) {
           event.preventDefault();
           const email = document.getElementById('login-email').value;
           const password = document.getElementById('login-password').value;

           fetch('/login/', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'X-CSRFToken': getCookie('csrftoken')
               },
               body: JSON.stringify({ email, password })
           })
           .then(response => response.json())
           .then(data => {
               if (data.success) {
                   checkLoginStatus();
               } else {
                   alert('Login failed');
               }
           });
       });

       document.getElementById('register-form').addEventListener('submit', function(event) {
           event.preventDefault();
           const email = document.getElementById('register-email').value;
           const password = document.getElementById('register-password').value;

           fetch('/register/', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'X-CSRFToken': getCookie('csrftoken')
               },
               body: JSON.stringify({ email, password })
           })
           .then(response => response.json())
           .then(data => {
               if (data.success) {
                   alert('Registration successful');
                   document.getElementById('login-tab').click();
               } else {
                   alert('Registration failed: ' + data.error);
               }
           });
       });

       document.getElementById('logout-button').addEventListener('click', function() {
           fetch('/logout/')
           .then(() => {
               checkLoginStatus();
           });
       });
   });

   function checkLoginStatus() {


       fetch('/check_login/')
       .then(response => response.json())
       .then(data => {
           if (data.authenticated) {
               document.getElementById('user-info').innerText = `Logged in as ${data.email}`;
               document.getElementById('user-info').style.display = 'block';
               document.getElementById('login-form').style.display = 'none';
               document.getElementById('register-form').style.display = 'none';
               document.getElementById('logout').style.display = 'block';
           } else {
               document.getElementById('user-info').style.display = 'none';
               document.getElementById('login-form').style.display = 'block';
               document.getElementById('register-form').style.display = 'block';
               document.getElementById('logout').style.display = 'none';
           }
       });
   }

   function getCookie(name) {
       let cookieValue = null;
       if (document.cookie && document.cookie !== '') {
           const cookies = document.cookie.split(';');
           for (let i = 0; i < cookies.length; i++) {
               const cookie = cookies[i].trim();
               if (cookie.substring(0, name.length + 1) === (name + '=')) {
                   cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                   break;
               }
           }
       }
       return cookieValue;
   }
   ```

### Conclusão

Com esses passos, sua SPA terá abas para login, logout e cadastro, e a lógica de autenticação será gerenciada por sessões. O frontend é construído com JavaScript Vanilla e Bootstrap, enquanto o backend Django cuida da lógica de autenticação e cadastro, utilizando sessões para manter o estado de autenticação.



## Explicação

### CRF_exempt

No Django, o decorador `@csrf_exempt` é usado para isentar uma view específica da verificação de CSRF (Cross-Site Request Forgery). O Django inclui proteção contra ataques CSRF por padrão, o que ajuda a prevenir que um site malicioso envie requisições em nome do usuário sem seu consentimento.

Normalmente, todas as requisições POST, PUT, DELETE e PATCH precisam de um token CSRF válido para serem aceitas. No entanto, há situações em que você pode querer desativar essa proteção, como ao lidar com requisições de fontes confiáveis ou APIs que não precisam dessa verificação.

Aqui está um exemplo de como usar `@csrf_exempt` em uma view:

```python
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def minha_view(request):
    if request.method == 'POST':
        # Lógica para tratar o POST request
        return HttpResponse('Requisição POST recebida sem verificação CSRF')
    return HttpResponse('Requisição GET recebida')
```

Ao aplicar o decorador `@csrf_exempt`, você informa ao Django que essa view específica não deve realizar a verificação do token CSRF, permitindo que requisições sem o token sejam processadas normalmente. Contudo, use isso com cuidado, pois desativar a proteção CSRF pode aumentar a vulnerabilidade da aplicação a ataques.


Essas duas funções JavaScript têm funções distintas, mas importantes para a gestão de sessões e cookies em um site.

### Função `checkLoginStatus()`

A função `checkLoginStatus` verifica o status de autenticação do usuário fazendo uma requisição a um endpoint específico (`/check_login/`). Dependendo da resposta, ela altera o DOM (Document Object Model) para refletir o estado de login do usuário.

```javascript
function checkLoginStatus() {
    fetch('/check_login/')
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            document.getElementById('user-info').innerText = `in as ${data.email}`;
            document.getElementById('user-info').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
        } else {
            document.getElementById('user-info').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('logout').style.display = 'none';
        }
    });
}
```

**O que essa função faz:**

1. **Faz uma requisição ao servidor:** A função chama o endpoint `/check_login/` usando `fetch`.
2. **Processa a resposta:** Quando o servidor responde, a resposta é convertida para JSON.
3. **Atualiza a interface do usuário:** 
    - Se o usuário estiver autenticado (`data.authenticated` é `true`):
        - Exibe a informação do usuário (`user-info`) com o e-mail do usuário.
        - Esconde o formulário de login (`login-form`) e o formulário de registro (`register-form`).
        - Mostra o botão de logout (`logout`).
    - Se o usuário não estiver autenticado (`data.authenticated` é `false`):
        - Esconde a informação do usuário.
        - Mostra o formulário de login e o formulário de registro.
        - Esconde o botão de logout.

### Função `getCookie(name)`

A função `getCookie` é usada para obter o valor de um cookie específico a partir do documento.

```javascript
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
```

**O que essa função faz:**

1. **Inicializa `cookieValue` como `null`:** Começa com `cookieValue` definido como `null`.
2. **Verifica se há cookies:** Se houver cookies disponíveis (`document.cookie` não é uma string vazia):
    - Divide todos os cookies em um array usando `;` como delimitador.
    - Itera sobre cada cookie no array:
        - Remove espaços em branco extras (`trim`).
        - Verifica se o cookie atual começa com o nome do cookie procurado seguido de um `=`:
            - Se sim, extrai o valor do cookie e decodifica o valor (removendo codificações como `%20` para espaços) e atribui a `cookieValue`.
            - Encerra o loop após encontrar o cookie desejado.
3. **Retorna `cookieValue`:** Devolve o valor do cookie solicitado ou `null` se o cookie não for encontrado.

**Uso comum:**
Essa função é útil para recuperar valores de cookies específicos, como o token CSRF, que pode ser necessário para fazer requisições POST seguras.
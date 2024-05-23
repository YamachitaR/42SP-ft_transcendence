O `REDIRECT_URI` (ou URI de redirecionamento) é uma URL para onde o serviço de autenticação (neste caso, a API da 42) redireciona o usuário após ele ter autenticado e autorizado a aplicação. Este redirecionamento inclui um código de autorização, que a aplicação pode usar para obter um token de acesso.

### Papel do `REDIRECT_URI`

1. **Ponto de Retorno Após Autenticação**:
   - Quando o usuário autentica e autoriza a aplicação, ele é redirecionado de volta para a URL especificada em `REDIRECT_URI` junto com um código de autorização.

2. **Troca de Código por Token de Acesso**:
   - A aplicação então usa este código de autorização para solicitar um token de acesso do provedor de autenticação (API da 42).

3. **Segurança**:
   - O `REDIRECT_URI` precisa ser registrado no provedor de autenticação (API da 42) para evitar redirecionamentos maliciosos. Apenas URIs pré-registrados serão aceitos.

### Como Configurar o `REDIRECT_URI`

#### Registro na API da 42

Quando você registra sua aplicação na [API da 42](https://profile.intra.42.fr/oauth/applications/new), você precisa fornecer um `REDIRECT_URI`. Por exemplo:

- `http://localhost:8000/callback/` (para desenvolvimento local)
- `https://meu-dominio.com/callback/` (para produção)

#### Uso no Código

Você precisa garantir que o `REDIRECT_URI` configurado na sua aplicação corresponda ao que foi registrado na API da 42.

**Arquivo `.env`**:
```plaintext
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8000/callback/
```

**Configuração no `settings.py`**:
```python
# Carregar as variáveis de ambiente
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')
```

### Exemplo de Fluxo de Autenticação

#### 1. O usuário clica em "Login with 42":
- A função `login_view` redireciona o usuário para a URL de autorização da API da 42.

#### 2. O usuário autentica e autoriza a aplicação na 42:
- Após a autenticação, a API da 42 redireciona o usuário de volta para o `REDIRECT_URI` com um código de autorização.

#### 3. A aplicação recebe o código de autorização:
- A função `callback_view` pega este código e o troca por um token de acesso.

**Função `callback_view`**:

```python
def callback_view(request):
    code = request.GET.get('code')
    token_url = "https://api.intra.42.fr/oauth/token"
    token_data = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
    }
    token_response = requests.post(token_url, data=token_data)
    token_json = token_response.json()
    access_token = token_json.get('access_token')

    user_info_url = "https://api.intra.42.fr/v2/me"
    user_info_response = requests.get(
        user_info_url, headers={'Authorization': f'Bearer {access_token}'}
    )
    user_info = user_info_response.json()

    try:
        user = User.objects.get(username=user_info['login'])
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=user_info['login'],
            first_name=user_info['first_name'],
            last_name=user_info['last_name'],
            email=user_info['email'],
        )
    login(request, user)

    return redirect(settings.LOGIN_REDIRECT_URL)
```

### Conclusão

O `REDIRECT_URI` é uma URL crítica no fluxo de autenticação OAuth2, pois é o ponto onde o usuário é redirecionado após autorizar a aplicação e onde a aplicação troca o código de autorização pelo token de acesso. Certifique-se de que o `REDIRECT_URI` está corretamente configurado tanto na sua aplicação quanto no registro da aplicação na API da 42.
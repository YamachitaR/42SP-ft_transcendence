# Cadastro na Intra

A chave faz o cadastro [https://profile.intra.42.fr/oauth/applications](https://profile.intra.42.fr/oauth/applications) 


Preste atenção ao preencher:

-  `Redirect URI` : [leia](REDIRECT.md) 
- `scopes`: check no `Manage user data`


Apos criar o cadastro:

- `UID`  vai ser o valor da nossa variável `CLIENT_ID`
- `SECRET` vai ser o valor da nossa variável `CLIENT_SECRET`
-  **Essa chave tem validade** fique atento!

# Criando o arquivo 

Crie o arquivo `.env` no mesmo local do `manage.py`

~~~
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8000/callback/
~~~


export default function LoginView() {
    const main = document.getElementById('content');
    main.innerHTML = '


<div class="row">
    <div class="col-md-12">
        <h1>Login/Cadastro</h1>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <h2>Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="loginEmail">Email:</label>
                <input type="email" class="form-control" id="loginEmail" name="email" placeholder="Digite seu email">
            </div>
            <div class="form-group">
                <label for="loginSenha">Senha:</label>
                <input type="password" class="form-control" id="loginSenha" name="senha" placeholder="Digite sua senha">
            </div>
            <button type="button" class="btn btn-primary" id="loginButton">Entrar</button>
        </form>
    </div>

    <div class="col-md-6">
        <h2>Cadastro</h2>
        <form id="cadastroForm">
            <div class="form-group">
                <label for="cadastroNome">Nome:</label>
                <input type="text" class="form-control" id="cadastroNome" name="nome" placeholder="Digite seu nome completo">
            </div>
            <div class="form-group">
                <label for="cadastroEmail">Email:</label>
                <input type="email" class="form-control" id="cadastroEmail" name="email" placeholder="Digite seu email">
            </div>
            <div class="form-group">
                <label for="cadastroSenha">Senha:</label>
                <input type="password" class="form-control" id="cadastroSenha" name="senha" placeholder="Digite sua senha">
            </div>
            <button type="button" class="btn btn-primary" id="cadastroButton">Cadastrar</button>
        </form>
    </div>
</div>
</div>
';
}
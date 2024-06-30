export default function renderLogin() {
    return `
        <!--div class="d-flex justify-content-center align-items-center min-vh-100">
            <div class="card p-4" style="width: 100%; max-width: 400px; background-color: #333; border-color: #daa520;">
                <div class="card-body">
                    <h3 class="card-title text-center" style="color: #daa520;">Login</h3>
                    <form id="login-form">
                        <div class="mb-3">
                            <label for="email" class="form-label" style="color: #fff;">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label" style="color: #fff;">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn" style="background-color: #daa520; color: #333;">Login</button>
                            <button type="button" id="register-button" class="btn btn-outline" style="border: 2px solid #daa520; color: #daa520;">Cadastrar</button>
                            <button type="button" id="login-42-button" class="btn" style="background-color: #000; color: #fff;">Login com a 42</button>
                        </div>
                    </form>
                </div>
            </div>
        </div-->
        <div class="conteiner m-4">
            <div class="row">
                <div class="col"></div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 bg-dashboard rounded mx-auto">
                    <h3 class="mt-3 text-center text-light">Login</h3>
                    <!--Formulario de Login-->
                    <form id="login-form">
                        <!--Email-->
                        <div class="mb-3">
                            <label for="email" class="form-label text-light">Email</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="student@student.42.fr" required>
                        </div>
                        <!--Senha-->
                        <div class="mb-5">
                            <label for="password" class="form-label text-light">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="password" required>
                        </div>
                        <!--Botões-->
                        <div class="d-grid gap-2 mb-4">
                            <!--Login Com os dados do Form-->
                            <button type="submit" id="login-button" class="my-bg-gold btn-custom rounded p-2">Login</button>
                            <!--Login Via API 42-->
                            <button type="button" id="login-42-button" class="my-bg-gold btn-custom rounded p-2">Login com 42</button>
                            <!--Botão para Ir ao Cadastro-->
                            <button type="button" id="register-button" class="btn-custom rounded p-2">Não tem Conta? Cadastre-se</button>
                        </div>
                    </form>
                </div>
                <div class="col"></div>
            </div>
        </div>
    `;
}

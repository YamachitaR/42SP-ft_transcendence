export default function renderRegister() {
    return `
        <!--div class="d-flex justify-content-center align-items-center min-vh-100">
            <div class="card p-4" style="width: 100%; max-width: 400px; background-color: #333; border-color: #daa520;">
                <div class="card-body">
                    <h3 class="card-title text-center" style="color: #daa520;">Cadastrar</h3>
                    <form id="register-form">
					    <div class="mb-3">
                            <label for="username" class="form-label" style="color: #fff;">Username</label>
                            <input type="username" class="form-control" id="username" name="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label" style="color: #fff;">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label" style="color: #fff;">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn" style="background-color: #daa520; color: #333;">Cadastrar</button>
                            <button type="button" id="login-button" class="btn" style="border: 2px solid #daa520; color: #daa520;">Voltar ao Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div-->
        <div class="conteiner m-4">
			<div class="row">
				<div class="col"></div>
				<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 bg-dashboard rounded mx-auto">

					<!--Titulo da Pagina-->
					<h3 class="mt-3 text-center text-light">Cadastro</h3>

					<!--Formulario de Cadastro-->
					<form id="register-form">

						<!--Email-->
						<div class="mb-3">
							<label for="email" class="form-label text-light">Email</label>
							<input type="email" class="form-control" id="email" name="email" placeholder="student@student.42.fr" required>
						</div>

						<!--Username-->
						<div class="mb-3">
							<label for="username"" class="form-label text-light">Nickname</label>
							<input type="username" id="username" name="username" placeholder="nickname" class="form-control" required>
						</div>
						
						<!--Senha-->
						<div class="mb-5">
							<label for="password" class="form-label text-light">Password</label>
							<input type="password" class="form-control" id="password" name="password" placeholder="password" required>
						</div>
						
						<!--Botões-->
						<div class="d-grid gap-2 mb-4">
							<!--Botão Para Cadastro do Formulario-->
							<button type="submit" class="my-bg-gold btn-custom rounded p-2">Cadastre-se</button>
							<!--Botão Redireciona Para a Pagina de Login-->
							<button type="button" id="login-button" class="btn-custom rounded p-2">Já tem conta? Login</button>
						</div>
					</form>
				</div>
				<div class="col"></div>
			</div>
		</div>

    `;
}


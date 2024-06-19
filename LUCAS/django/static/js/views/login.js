export default function renderLogin() {
    return `
        <div class="d-flex justify-content-center align-items-center min-vh-100">
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
                        <div class="d-grid">
                            <button type="submit" class="btn" style="background-color: #daa520; color: #333;">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

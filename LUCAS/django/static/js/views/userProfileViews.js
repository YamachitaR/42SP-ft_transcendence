export default function renderProfileUser() {
    return `
        <!--Menu de Navegação do Site-->
        <div class="conteiner">
		    <div class="row h-2vh bg-body-color"></div>
				<div id="nav-buttons" class="row h-6vh d-flex align-items-center justify-content-center my-bg-gold">
					<div class="col-3"></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/dashboard/">Dashboard</button></div>
                    <div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/friends/">Friends</button></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/playGame/">Game</button></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/profile/">Profile</button></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/logout/">Logout</button></div>
					<div class="col-1 d-flex align-items-center justify-content-center">
						<button type="button" class="btn-custom-menu shadow d-flex align-items-center justify-content-center"><img src="../img/country_flags/br.png" class="country-flags-size"></button>
						<button type="button" class="btn-custom-menu shadow d-flex align-items-center justify-content-center"><img src="../img/country_flags/esp.png" class="country-flags-size"></button>
						<button type="button" class="btn-custom-menu shadow d-flex align-items-center justify-content-center"><img src="../img/country_flags/eua.png" class="country-flags-size"></button>
					</div>
                    <div class="col-3"></div>
				</div>
			</div>
        </div>

    <div class="container profile-container">
        <div class="row">
            <div class="col-md-4 profile-sidebar">
                <div class="profile-img">
                    <img src="{% static 'img/logo.png' %}" alt="User Image">

                </div>
                <div class="profile-info">
                    <h3 id="user-username">Nickname</h3>
                    <p>Games: <span id="user-games">00</span></p>
                    <p>Wins: <span id="user-wins">00</span></p>
                    <button class="btn btn-primary">Edit Profile</button>
                </div>
            </div>
            <div class="col-md-8 profile-details">
                <h4>Details</h4>
                <p>ID: <span id="user-id"></span></p>
                <p>Username: <span id="user-username-detail"></span></p>
                <p>Email: <span id="user-email"></span></p>
                <!-- Add more details as needed -->
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</body>
</html>


`;
}

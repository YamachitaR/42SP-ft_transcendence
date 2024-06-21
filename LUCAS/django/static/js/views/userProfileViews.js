export default function renderProfileUser() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{% static 'css/userprofile.css' %}">
    <title>User Profile</title>
</head>
<body>
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

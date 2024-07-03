export default function renderChat() {
    return `
        <link href="static/css/chat.css" rel="stylesheet"> <!-- Inclua o CSS do chat -->
        <div class="container mt-4">
            <div class="row mx-4 mt-4 text-light d-flex align-items-center justify-content-center">
                <div class="col-12 shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
                    <h3 class="mt-2" id="chat-room-name">Chat!</h3>
                </div>
            </div>

            <div class="row mx-4 mt-4 text-light d-flex justify-content-between">
                <div class="col-12 col-md-6 mt-3 text-center bg-dashboard shadow rounded">
                    <div class="chat-wrapper rounded">
                        <div id="chat-log" class="chat-log-container bg-light p-3 mb-0" style="height: 300px; overflow-y: scroll; color: black;"></div>
                        <div class="input-group mt-2">
                            <input id="chat-message-input" type="text" class="form-control" placeholder="Type your message..." style="color: black; background-color: white;">
                            <button id="chat-message-submit" class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-5 mt-3 text-center bg-dashboard shadow rounded d-flex flex-column align-items-center justify-content-center">
                    <div class="friend-info d-flex align-items-center mb-3">
                        <img src="" alt="Friend Image" class="friend-image rounded-circle">
                        <div class="ms-3">
                            <h5 class="friend-name">Friend Name</h5>
                            <button id="view-profile-button" class="btn btn-secondary btn-sm">View Profile</button>
                        </div>
                    </div>
                    <button id="block-friend-button" class="btn btn-danger mb-2">Bloquear Amigo</button>
                    <button id="join-game-button" class="btn btn-success">Join Game</button>
                </div>
            </div>
        </div>
    `;
}

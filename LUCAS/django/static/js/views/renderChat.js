export default function renderChat() {
    return `
        <link href="static/css/chat.css" rel="stylesheet"> <!-- Inclua o CSS do chat -->
        <div class="container mt-4">
            <div class="row mx-4 mt-4 text-light d-flex align-items-center justify-content-center">
                <div class="col-xs-7 col-sm-8 col-md-7 col-lg-12 shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
                    <h3 class="mt-2" id="chat-room-name">Chat Room</h3>
                </div>
            </div>

            <div class="row mx-4 mt-4 text-light d-flex justify-content-center">
                <div class="col-xs-7 col-sm-8 col-md-7 col-lg-6 mt-3 text-center bg-dashboard shadow rounded">
                    <div id="chat-log" class="chat-log-container rounded bg-light p-3 mb-3" style="height: 300px; overflow-y: scroll; color: black;"></div>
                    <input id="chat-message-input" type="text" class="form-control" placeholder="Type your message..." style="color: black; background-color: white;">
                    <button id="chat-message-submit" class="btn btn-primary mt-2">Send</button>
                </div>
            </div>
        </div>
    `;
}

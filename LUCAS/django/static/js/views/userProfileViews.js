export default function renderProfileUser() {
    return `
    <link rel="stylesheet" href="static/css/userprofile.css">
    <div id="user-info" data-default-image="../../static/img/pf.jpg">
        <img id="user-image" alt="User Image">
        <form id="user-form" enctype="multipart/form-data">
            <label for="user-id">ID:</label>
            <input type="text" id="user-id" name="user-id" readonly>
            <label for="user-username">Username:</label>
            <input type="text" id="user-username" name="user-username">
            <label for="user-email">Email:</label>
            <input type="email" id="user-email" name="user-email">
            <label for="user-image-upload">Upload Image:</label>
            <input type="file" id="user-image-upload" name="profile_image">
            <button type="submit">Alterar</button>
        </form>
    </div>
`;
}


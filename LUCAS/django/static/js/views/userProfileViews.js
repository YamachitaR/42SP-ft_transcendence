export default function renderProfileUser() {
    return `

<div id="user-info" data-default-image="../../static/img/pf.jpg">
	<img id="user-image" alt="User Image" />
    <p>ID: <span id="user-id"></span></p>
    <p>Username: <span id="user-username"></span></p>
    <p>Email: <span id="user-email"></span></p>
</div>
`;
}

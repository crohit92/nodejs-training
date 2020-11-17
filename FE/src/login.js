function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:3000/authorize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((res) => res.json())
        .then((token) => {
            sessionStorage.setItem('token', token);
            window.open('./todos.html');
        });
}

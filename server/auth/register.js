const form = document.getElementById('register_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    // TODO: Hash password / authenticate client
    const password = document.getElementById('password').value;
    const id_number = document.getElementById('id_number').value;
    const data = {username, password, id_number};

    // JSON post request
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                alert('Registration successful! ' + res.data);
                window.location.href = 'login.html';
            } else {
                alert('Registration failed!');
            }
        }).catch(err => console.log(err));
});
const form = document.getElementById('login_form')
form.addEventListener('submit', login)

async function login(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        // everything went fine
        console.log('Got the token: ', result.data)
        // localStorage.setItem('token', result.data)
        // Store as cookie
        // document.cookie = `accessToken=${result.data.accessToken} refreshToken=${result.data.refreshToken}`
        window.location.href = result.redirect;
    } else {
        alert(result.error)
    }
}
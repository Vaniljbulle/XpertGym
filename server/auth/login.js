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
        //localStorage.setItem('token', result.data)
        // Store as cookie
        document.cookie = `token=${result.data}`
        window.location.href = 'testpage_private.html'
        }
    else {
        alert(result.error)
    }
}
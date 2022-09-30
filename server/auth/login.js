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
        localStorage.setItem('token', result.data)
        //alert('Success')
        // request index with new token
        const t = fetch('/index.html', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        // Redirect to index
        console.log(t)
        console.log(t.url)
        }
    else {
        alert(result.error)
    }
}
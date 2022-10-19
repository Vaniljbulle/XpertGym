async function logout() {
    try {
        const result = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())

        if (result.status === 'ok') {
            alert(result.data)
            // console.log(document.cookie);
            window.location.href = 'index.html'
        } else {
            alert('Error logging out')
        }
    } catch (e) {
        alert('Error logging out')
    }
}

window.onload = function () {
    fetch('/api/login/status')
        .then(res => res.json())
        .then(res => {
            console.log(res.status);
            if (res.status === 'ok') {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.innerHTML = "Log out";
                a.href = "javascript:logout()";

                li.appendChild(a);

                document.getElementsByTagName('ul')[0].appendChild(li);
            }
        }).catch(err => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'login.html';
        a.innerHTML = "Log in";

        li.appendChild(a);

        document.getElementsByTagName('ul')[0].appendChild(li);
    });

}
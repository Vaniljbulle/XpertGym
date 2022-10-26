const navbarItem = Array.from(
    document.getElementsByClassName('PSitem')
);

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
    loadHeader();
}

function loadHeader() {
    console.log("Fetching login status");
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

                const landingText = document.getElementById('landingPageText');
                const logBtn = document.getElementById('loginButton');

                if (landingText !== null) {
                    logBtn.style.visibility = 'hidden';
                }
                if (logBtn !== null) {
                    landingText.innerText = "The gym that takes your training seriously.";
                }
            }
        }).catch(err => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'login.html';
        a.innerHTML = "Log in";

        li.appendChild(a);

        document.getElementsByTagName('ul')[0].appendChild(li);

        navbarItem.forEach(navbarItem => {
            navbarItem.style.display = 'none';
        });
    });
}
// Add new user to list
function addUserToList(user) {
    let userDiv = document.createElement("div");
    let userP = document.createElement("p");

    userDiv.classList.add("devListItem");
    userDiv.id = user._id;
    userP.innerText = user.username;
    userDiv.appendChild(userP);
    document.getElementsByClassName("devListContainer")[0].appendChild(userDiv);
}

// Remove all divs from list
function clearUserList() {
    let userDivs = document.getElementsByClassName("devListItem");
    while (userDivs.length > 0) {
        userDivs[0].parentNode.removeChild(userDivs[0]);
    }
}

// Fetch users
document.getElementById("fetch_users").addEventListener("click", function () {
    fetch("/api/dev/users")
        .then(response => response.json())
        .then(result => {
            clearUserList();
            result.data.forEach(user => {
                addUserToList(user);
            });
        });
})

// Add membership to database
document.getElementById("membershipIDSubmit").addEventListener("click", function (e) {
    e.preventDefault();

    const data = {MEMBERSHIP_ID: document.getElementById("membershipID").value};

    fetch('/api/membership/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                alert('Membership added!');
            } else {
                alert('Membership not added!');
            }
        });
})

// Clear all database
document.getElementById("clearAll").addEventListener("click", function () {
    fetch("/api/dev/clear")
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.status === 'ok') {
                alert('Database cleared!');
            } else {
                alert('Database not cleared!');
            }
        });
});
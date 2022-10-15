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
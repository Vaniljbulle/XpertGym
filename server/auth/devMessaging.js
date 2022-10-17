// Add new user to list
function addToList(data, id) {
    let divElement = document.createElement("div");
    let paragraphElement = document.createElement("p");

    divElement.classList.add("devListItem");
    divElement.id = data._id;
    data.username === undefined ? paragraphElement.innerText = data.name : paragraphElement.innerText = data.username;
    divElement.appendChild(paragraphElement);
    document.getElementById(id).appendChild(divElement);

    id === "devUserList" ? divElement.addEventListener("click", userListListener) :
        divElement.addEventListener("click", workoutListListener);
}

function workoutListListener(e) {
    e.preventDefault();
    console.log("Workout clicked");
}

// Event listener for user list
function userListListener(e) {
    e.preventDefault();

    const data = {user_id: e.currentTarget.id};

    fetch("/api/dev/schedule/getAll", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            if (res.status === "ok") {
                clearList("devWorkoutList");

                res.data.forEach(workout => {
                    addToList(workout, "devWorkoutList");
                });
            } else {
                console.log("Error getting schedules");
            }
        });


}

// Remove all divs from list
function clearList(id) {
    // Get element by class name and ID

    let divs = document.getElementById(id).getElementsByClassName("devListItem");
    while (divs.length > 0) {
        divs[0].parentNode.removeChild(divs[0]);
    }
}

// Fetch users
document.getElementById("fetch_users").addEventListener("click", function () {
    fetch("/api/dev/users")
        .then(response => response.json())
        .then(result => {
            clearList("devUserList");
            result.data.forEach(user => {
                addToList(user, "devUserList");
            });
        });
})

// Fetch schedules
document.getElementById("fetch_schedules").addEventListener("click", function () {
    fetch("/api/schedule/all")
        .then(response => response.json())
        .then(result => {
            result.data.forEach(schedule => {
                console.log(schedule);
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
// Add new user to list
function addUserToList(user) {
    let userDiv = document.createElement("div");
    let userP = document.createElement("p");

    userDiv.classList.add("devListItem");
    userDiv.id = user._id;
    userP.innerText = user.username;
    userDiv.appendChild(userP);
    document.getElementById("devUserList").appendChild(userDiv);

    userDiv.addEventListener("click", userListListener);
}

// Add new workout to list
function addWorkoutToList(workout) {
    let workoutDiv = document.createElement("div");
    let workoutP = document.createElement("p");

    workoutDiv.classList.add("devListItem");
    workoutDiv.id = workout._id;
    workoutP.innerText = workout.name;
    workoutDiv.appendChild(workoutP);
    document.getElementById("devWorkoutList").appendChild(workoutDiv);

    //workoutDiv.addEventListener("click", workoutListListener);
}

// Event listener for user list
function userListListener(e) {
    e.preventDefault();

    const data = {user_id: e.currentTarget.id};

    fetch("/api/dev/schedule/get", {
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
                    addWorkoutToList(workout);
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
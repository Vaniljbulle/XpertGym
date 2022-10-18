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

// Append message to message log
function appendMessage(message) {
    let fieldsetElement = document.createElement("fieldset");
    let legendElement = document.createElement("legend");
    let paragraphElement = document.createElement("p");

    fieldsetElement.classList.add("postedMessage");
    legendElement.innerText = message.username + " @ " + message.timestamp + " - " + message.date;
    paragraphElement.innerText = message.message;

    fieldsetElement.appendChild(legendElement);
    fieldsetElement.appendChild(paragraphElement);
    document.getElementsByClassName("devMessageLogBoard")[0].appendChild(fieldsetElement);
}


function workoutListListener(e) {
    e.preventDefault();
    console.log("Workout clicked");

    const data = {schedule_id: e.currentTarget.id};

    fetch("/api/dev/schedule/log", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            if (res.status === "ok") {
                if (res.data.length === undefined) {
                    clearMessageLog();
                    appendMessage({
                        username: "System message",
                        timestamp: "00:00:00",
                        date: "00/00/0000",
                        message: "There are no messages, be the first one to post!"
                    });
                }
            } else {
                console.log("Error getting message log");
            }
        });
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
    while (divs.length > 0)
        divs[0].parentNode.removeChild(divs[0]);
}

// Remove all fieldsets from list
function clearMessageLog() {
    let fieldsets = document.getElementById("devMessageLog").getElementsByTagName("fieldset");
    while (fieldsets.length > 0)
        fieldsets[0].parentNode.removeChild(fieldsets[0]);
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
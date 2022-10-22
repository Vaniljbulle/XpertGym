// Remove all fieldsets from list
function clearMessageLog() {
    let fieldsets = document.getElementById("devMessageLog").getElementsByTagName("fieldset");
    while (fieldsets.length > 0)
        fieldsets[0].parentNode.removeChild(fieldsets[0]);
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

// Submit message
document.getElementById("devMessageSubmit").addEventListener("click", function (e) {
    e.preventDefault();

    let data = {
        schedule_id: document.getElementsByClassName("devMessageLogBoard")[0].id,
        message: document.getElementById("devMessageBox").value
    };
    if (data.schedule_id === "" || data.message === null || data.message === undefined) {
        alert("Please select a schedule");
        return;
    } else if (data.message === "" || data.message === null || data.message === undefined) {
        console.log("Message is empty");
        return;
    }

    fetch("/api/dev/message/submit", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            if (res.status === "ok") {
                console.log("Message sent");
                document.getElementById("devMessageBox").value = "";
                appendMessage({
                    username: res.data.username,
                    timestamp: res.data.timestamp,
                    date: res.data.date,
                    message: res.data.message
                });
            } else {
                console.log("Error sending message");
            }
        });
});
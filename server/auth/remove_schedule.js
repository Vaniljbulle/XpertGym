function removeSchedule(_id) {
    // JSON post request
    fetch('/api/schedule/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_id)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                alert('Schedule removed successfully! ' + res.data);
            } else {
                alert('Schedule failed to be removed!');
            }
        }).catch(err => console.log(err));
}
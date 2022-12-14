function fetchSchedule(_id) {
    // JSON post request
    fetch('/api/schedule/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_id)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                return res.data;
            } else {
                console.log('Schedule failed to be fetched!');
            }
        }).catch(err => console.log(err));
}
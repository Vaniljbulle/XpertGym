function addExercise(data) {
    // JSON post request
    fetch('/api/exercise/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                alert('Exercise added successfully! ' + res.data);
            } else {
                alert('Exercise failed to be added!');
            }
        }).catch(err => console.log(err));
}
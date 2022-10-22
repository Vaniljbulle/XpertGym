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
                return res.data;
            } else {
                return null;
            }
        }).catch(err => console.log(err));
    return null;
}
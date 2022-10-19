function fetchAll() {
    fetch('/api/exercise/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
        .then(res => {
            if (res.status === 'ok') {
                return res.data;
                // for (let i = 0; i < exercises.length; i++) {
                //     document.getElementById('cardHolder').innerHTML += "<p>" + exercises[i].name + "</p>";
                //     document.getElementById('cardHolder').innerHTML += "<img" + " src='/img/" + exercises[i].image + "'>";
                //
                // }
            } else {
                console.log('All exercises failed to be fetched!');
                return [];
            }
        }).catch(err => console.log(err));

    return [];
}
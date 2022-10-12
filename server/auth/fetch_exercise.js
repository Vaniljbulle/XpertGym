function fetchAll() {

    let exercises = [];

    fetch('/api/exercise/getAll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
        .then(res => {
            if (res.status === 'ok') {
                console.log('All exercises fetched successfully!');
                exercises = JSON.parse(JSON.stringify(res.data));
                console.log(exercises);
                for (let i = 0; i < exercises.length; i++) {
                    document.getElementById('cardHolder').innerHTML += "<p>" + exercises[i].name + "</p>";
                    document.getElementById('cardHolder').innerHTML += "<img" + " src='/img/" + exercises[i].image + "'>";

                }
            } else {
                alert('All exercises failed to be fetched!');
            }
        }).catch(err => console.log(err));

}
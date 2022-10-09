//const form = document.getElementById('exercise_card');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     const _id = document.getElementById('_id').value;
//
//     removeExercise(_id);
// });

function removeExercise(_id) {
    // JSON post request
    fetch('/api/exercise/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_id)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                alert('Exercise removed successfully! ' + res.data);
                window.location.href = 'login.html';
            } else {
                alert('Exercise failed to be removed!');
            }
        }).catch(err => console.log(err));
}
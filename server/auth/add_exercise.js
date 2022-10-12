const form = document.getElementById('exercise_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const description = document.getElementById('description').value;
    const muscleGroup = document.getElementById('muscleGroup').value;
    const duration = document.getElementById('duration').value;
    const difficulty = document.getElementById('difficulty').value;
    const custom = document.getElementById('custom').value;
    const data = {name, image, sets, reps, description, muscleGroup, duration, difficulty, custom};

    addExercise(data);
});

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
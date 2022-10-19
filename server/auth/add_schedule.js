// const form = document.getElementById('schedule_form');
//
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     // const name = document.getElementById('name').value;
//     // const image = document.getElementById('image').value;
//     // const sets = document.getElementById('sets').value;
//     // const reps = document.getElementById('reps').value;
//     // const description = document.getElementById('description').value;
//     // const muscleGroup = document.getElementById('muscleGroup').value;
//     // const duration = document.getElementById('duration').value;
//     // const difficulty = document.getElementById('difficulty').value;
//     // const custom = document.getElementById('custom').value;
//     // const data = {name, image, sets, reps, description, muscleGroup, duration, difficulty, custom};
//
//     //addSchedule(data);
// });

function addSchedule(data) {
    // JSON post request
    fetch('/api/schedule/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                alert('Schedule added successfully! ' + res.data);
            } else {
                alert('Schedule failed to be added!');
            }
        }).catch(err => console.log(err));
}

function addTest() {
    addSchedule({
        name: "First schedule",
        exercises: [
            {
                exercise_id: "63470f30fccfc2373f8ddff8",
                order: 0
            },
            {
                exercise_id: "63470f30fccfc2373f8ddff8",
                order: 1
            },
            {
                exercise_id: "63470f30fccfc2373f8ddff8",
                order: 2
            },
            {
                exercise_id: "63470f30fccfc2373f8ddff8",
                order: 3
            }
        ]
    })
}

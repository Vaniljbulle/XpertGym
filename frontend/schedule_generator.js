const fill = document.querySelector('.planner-card-fill');
const empties = document.querySelectorAll('.planner-card-empty');
const exerciseModal = document.getElementById("planner-modal-container");

const name = document.getElementById("name_value");
const sets = document.getElementById("sets_value");
const reps = document.getElementById("reps_value");
const desc = document.getElementById("desc_value");
const duration = document.getElementById("duration_value");

const muscle = document.getElementsByName("muscleGroup");
const diff = document.getElementsByName("difficulty");

let exercises = fetchAll();

for (const exercise of exercises) {
    console.log(exercise);
}

function exitCreateExercise() {
    exerciseModal.style.display = "none";
}

function enterCreateExercise() {
    exerciseModal.style.display = "block";
}

function createExercise() {
    console.log(name.value);
    console.log(sets.value);
    console.log(reps.value);
    console.log(desc.value);
    console.log(duration.value);
    let _muscleGroup = 0;
    let _difficulty = 0;
    for (let i = 0; i < muscle.length; i++) {
        const tmp = muscle[i];
        if (tmp.checked) {
            _muscleGroup = i;
            break
        }
    }
    for (let i = 0; i < diff.length; i++) {
        const tmp = diff[i];
        if (tmp.checked) {
            _difficulty = i;
            break
        }
    }

    console.log(_muscleGroup);
    console.log(_difficulty);

    addExercise({
        name: name.value,
        image: "/img/wlogos.png",
        sets: sets.value,
        reps: reps.value,
        description: desc.value,
        muscleGroup: _muscleGroup,
        duration: duration.value,
        difficulty: _difficulty,
        type: 0
    })
    //     .then(data => {
    //     if (data !== null) {
    //         console.log(data);
    //         exitCreateExercise();
    //     } else
    //         alert("Failed to add exercise!");
    // })
}

// Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
    this.className += ' planner-card-hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    this.className = 'planner-card-fill';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' planner-card-hovered';
}

function dragLeave() {
    this.className = 'planner-card-empty';
}

function dragDrop() {
    this.className = 'planner-card-empty';
    this.append(fill);
}

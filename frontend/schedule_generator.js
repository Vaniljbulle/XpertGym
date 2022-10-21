const empties = document.querySelectorAll('.planner-card-empty');
const exerciseModal = document.getElementById("planner-modal-container");

const categories = document.getElementsByClassName("workout-container");
let exerciseCards = [];

let currentlyDragged = {element: null, type: 0};
let draggedFrom = null;

const name = document.getElementById("name_value");
const sets = document.getElementById("sets_value");
const reps = document.getElementById("reps_value");
const desc = document.getElementById("desc_value");
const duration = document.getElementById("duration_value");

const muscle = document.getElementsByName("muscleGroup");
const diff = document.getElementsByName("difficulty");

let sortedExercises = new Array(6);
for (let i = 0; i < sortedExercises.length; i++) {
    sortedExercises[i] = new Array(0);
}
let exercises = [];
loadAllExercises();

function loadAllExercises() {
    fetch('/api/exercise/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
        .then(res => {
            if (res.status === 'ok') {
                console.log(res.data);
                console.log("Fetched");
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i]);
                    fetchExercise(res.data[i]);
                }
            } else {
                console.log('All exercises failed to be fetched!');
            }
        }).catch(err => console.log(err));
}

function getExerciseClass(exercise) {
    switch (exercise.muscleGroup) {
        case 0:
            return "chest-card-empty";
        case 1:
            return "arms-card-empty";
        case 2:
            return "legs-card-empty";
        case 3:
            return "back-card-empty";
        case 4:
            return "abs-card-empty";
        case 5:
            return "cardio-card-empty";
        default:
            return "";
    }
}

function spawnExerciseCard(exercise) {
    const category = getExerciseClass(exercise);
    if (category === "") return;
    let card = document.createElement("div");
    let image = document.createElement("img");
    let text = document.createElement("p");
    image.src = exercise.image;
    text.innerHTML = exercise.name;
    card.className = category;
    card.draggable = true;
    card.append(image);
    card.appendChild(text);
    card.id = exercise.exerciseID; // ID of the exercise in the database
    categories[exercise.muscleGroup].appendChild(card);
    addCardToList(card);
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

    const data = {
        name: name.value,
        image: "/img/wlogos.png",
        sets: sets.value,
        reps: reps.value,
        description: desc.value,
        muscleGroup: _muscleGroup,
        duration: duration.value,
        difficulty: _difficulty,
        type: 0
    }

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
                console.log(res.data);
                exitCreateExercise();
                fetchExercise(res.data);
            } else {
                alert("Failed to add exercise!");
            }
        }).catch(err => console.log(err));

}

function fetchExercise(id) {
    //console.log("Fetching exercise with id: " + id);
    fetch('/api/exercise/getByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: id})
    }).then(res => res.json())
        .then(res => {
            if (res.status === 'ok') {
                console.log("An exercise was fetched");
                const data = {
                    name: res.data.name,
                    image: res.data.image,
                    sets: res.data.sets,
                    reps: res.data.reps,
                    description: res.data.description,
                    muscleGroup: res.data.muscleGroup,
                    duration: res.data.duration,
                    difficulty: res.data.difficulty,
                    type: res.data.type,
                    exerciseID: id._id === undefined ? id : id._id
                };
                sortedExercises[res.data.muscleGroup].push(data);
                const index = sortedExercises[res.data.muscleGroup].length - 1;
                const element = sortedExercises[res.data.muscleGroup][index];
                spawnExerciseCard(element);
            } else {
                console.log('Exercise failed to be fetched!');
            }
        }).catch(err => console.log(err));
}

function addCardToList(card) {
    exerciseCards.push(card);
    exerciseCards[exerciseCards.length - 1].addEventListener('dragstart', dragStart);
    exerciseCards[exerciseCards.length - 1].addEventListener('dragend', dragEnd);
}

// Loop through empty boxes and add listeners
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
    if (this.classList.contains('planner-card-fill')) {
        currentlyDragged.type = 1;
    } else {
        currentlyDragged.type = 0;
    }
    currentlyDragged.element = this;
    this.className += ' planner-card-hold';

    // Add class to the div card is being lifted from
    this.parentElement.classList.add('cardLifted');
    draggedFrom = this.parentElement;
    console.log(this.parentElement.classList);
}

function dragEnd() {
    console.log(this.className);
    currentlyDragged.element = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    if (this.firstElementChild === null)
        this.classList.add('planner-card-hovered');
}

function dragLeave() {
    if (currentlyDragged.element !== null && this.firstElementChild !== null) {
        if (currentlyDragged.element.id === this.firstElementChild.id && this.classList.contains('cardLifted')) {
            this.removeEventListener('click', cardOnClick);
            this.classList.remove('planner-card-selected');
            this.classList.remove('planner-card-selected-hovered');
            this.classList.remove('cardLifted');
        }
    } else {
        this.classList.remove('planner-card-hovered');
        console.log("REMOVED HOVER");
    }
}

function dragDrop() {
    console.log(this.className);
    if (this.firstElementChild !== null) {
        const tmp = this.firstElementChild;
        this.firstElementChild.remove();
        draggedFrom.appendChild(tmp);
        draggedFrom.id = tmp.id;
        draggedFrom.classList.add('planner-card-selected-hovered');
        draggedFrom.addEventListener('click', cardOnClick);
    }
    if (currentlyDragged.type === 0) {
        this.append(currentlyDragged.element.cloneNode(true));
        this.firstElementChild.classList.add('planner-card-fill');
        addCardToList(this.firstElementChild);
    } else {
        this.append(currentlyDragged.element);
    }
    this.addEventListener('click', cardOnClick); // Click event listener for the card
    this.id = currentlyDragged.element.id; // Set ID of the card to the ID of the exercise in the database
    this.firstElementChild.classList.remove('planner-card-hold');
    this.classList.remove('planner-card-hovered');
    this.classList.add('planner-card-selected-hovered'); // Border change when hovering over an unselected card
}

function cardOnClick() {
    // If the card is already selected, deselect it
    if (this.classList.contains('planner-card-selected')) {
        this.classList.remove('planner-card-selected');
        this.classList.add('planner-card-selected-hovered');
        return;
    }

    cardClearSelections();
    // Select the card
    this.classList.remove('planner-card-selected-hovered');
    this.classList.toggle('planner-card-selected');

    // Fetch exercise data
    fetch('/api/exercise/getByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: this.id})
    }).then(res => res.json()).then(res => {
        if (res.status === 'ok') {
            console.log(res.data);
        } else {
            console.log('Failed to fetch exercise data!');
        }
    })
}

function cardClearSelections() {
    // If the card is not selected, unselect all cards
    const divs = document.querySelectorAll('.planner-card-empty');
    for (const div of divs) {
        if (div.classList.contains('planner-card-selected')) {
            div.classList.remove('planner-card-selected');
            div.classList.add('planner-card-selected-hovered');
        }
    }
}

document.addEventListener("click", function (event) {
    if (event.target.id === "loadSchedule") {
        reload_loadScheduleModal();
        document.querySelector(".loadScheduleModal").style.display = "block"
    } else {
        document.querySelector(".loadScheduleModal").style.display = "none"
    }
});

function reload_loadScheduleModal(){
    const loadScheduleModal = document.querySelector(".loadScheduleModalSchedules");
    while (loadScheduleModal.firstChild) {
        loadScheduleModal.removeChild(loadScheduleModal.firstChild);
    }

    fetch("/api/schedule/all")
        .then(response => response.json())
        .then(result => {
            if (result.status === "ok") {
                if (result.data.length === 0) {
                    document.querySelector(".loadScheduleModalHintText").innerHTML = "No saved schedules found";
                } else {
                    document.querySelector(".loadScheduleModalHintText").innerHTML = "Select a schedule to load";
                    for (const schedule of result.data) {
                        addButtonLoadScheduleModal(schedule);
                    }
                }
            }
        });
}

function addButtonLoadScheduleModal(schedule){
    const loadScheduleModal = document.querySelector(".loadScheduleModalSchedules");
    const button = document.createElement("div");
    button.classList.add("modalButton");
    button.innerHTML = schedule.name;
    button.id = schedule._id;

    button.addEventListener("click", loadSchedule);
    loadScheduleModal.appendChild(button);
}

function loadSchedule(){
    const scheduleID = this.id;
    console.log("LOAD SCHEDULE WITH ID: " + scheduleID);
}
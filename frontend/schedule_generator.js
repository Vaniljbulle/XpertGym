const fill = document.querySelector('.planner-card-fill');
const empties = document.querySelectorAll('.planner-card-empty');

let exercises = fetchAll();

for (const exercise of exercises) {
    console.log(exercise);
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

onload = function () {
    let scheduleID = localStorage.getItem('scheduleID');
    localStorage.clear();

    if (scheduleID != null) {
        console.log("READ ONLY REQUEST FROM PROFILE, SCHEDULE ID: " + scheduleID);
    }
}
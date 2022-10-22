const EXERCISE = require("./exercise");

async function getAllExercises() {
    const exercises = await EXERCISE.find({type: 2}).lean();

    // If there are no exercises, generate them
    if (exercises.length === 0) {
        generateDefaultExercise(
            "Bench Press",
            "img/icons/bench-press.png",
            4,
            10,
            "Lay down on a bench and lift the barbell up and down",
            0,
            60,
            1,
            2
        );
    }
}

function generateDefaultExercise(name, image, sets, reps, desc, muscleGroup, duration, difficulty, type) {
    try {
        const exercise = new EXERCISE({
            name: name,
            image: image,
            sets: sets,
            reps: reps,
            description: desc,
            muscleGroup: muscleGroup,
            duration: duration,
            difficulty: difficulty,
            type: type
        });

        exercise.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    generateDefaultExercises: getAllExercises
}

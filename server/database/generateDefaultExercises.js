const EXERCISE = require("./exercise");

async function getAllExercises() {
    const exercises = await EXERCISE.find({type: 2}).lean();

    // If there are no exercises, generate them
    if (exercises.length === 0) {
        //region Chest exercises
        /***** Chest exercises *****/
        generateDefaultExercise(
            "Bench Press",
            "img/icons/bench-press.png",
            4,
            10,
            "Lay down on a bench and lift the barbell up and down",
            0,
            0,
            2,
            2
        );
        generateDefaultExercise(
            "Incline Bench Press",
            "img/icons/bench-press.png",
            4,
            10,
            "Lay down on a bench with a incline between 30° to 45° degrees and lift the barbell up and down",
            0,
            0,
            2,
            2
        );
        generateDefaultExercise(
            "Decline Bench Press",
            "img/icons/bench-press.png",
            4,
            10,
            "Lay down on a bench with a decline around -20° to -30° degrees and lift the barbell up and down",
            0,
            0,
            2,
            2
        );
        generateDefaultExercise(
            "Machine Chest Press",
            "img/icons/bench-press.png",
            4,
            10,
            "Sit down in the machine and use your chest muscles to press the handles away from your body moving them out until your arms are extended and return slowly.",
            0,
            0,
            1,
            2
        );
        generateDefaultExercise(
            "Push-up",
            "img/icons/pushups.png",
            4,
            10,
            "Get down on all fours and straighten your arms and legs, lower your body until your chest nearly touches the floor. Pause, then push yourself back up. If the exercise is too heavy you can use your knees as support.",
            0,
            0,
            1,
            2
        );
        generateDefaultExercise(
            "Dip",
            "img/icons/bench-press.png",
            4,
            10,
            "Push through your chest extending your arms and stopping just before locking out. Focus on using your chest since this exercise can be used for triceps also.",
            0,
            0,
            1,
            2
        );
        generateDefaultExercise(
            "Dumbbell pull-over",
            "img/icons/bench-press.png",
            3,
            10,
            "Lay down on a bench and hold the dumbbell with both your hands on the part furthest away from you. Slowly let it fall behind your head then push it up to bench press position.",
            0,
            0,
            3,
            2
        );
        generateDefaultExercise(
            "Machine fly",
            "img/icons/bench-press.png",
            4,
            10,
            "Have your arms aligned with your chest on the sides extended and grip the handles. ",
            0,
            0,
            1,
            2
        );
        /***** Shoulder exercises *****/
        //endregion

        //region arm exercises
        /***** Tricep exercises *****/
        generateDefaultExercise(
            "Dip",
            "img/icons/bench-press.png",
            4,
            10,
            "Push through your chest extending your arms and stopping just before locking out. Focus on using your triceps (arms) since this exercise can be used for chest also.",
            1,
            0,
            1,
            2
        );

        /***** Bicep exercises *****/
        //endregion

        //region Leg exercises
        /***** Leg exercises *****/
        generateDefaultExercise(
            "Squat",
            "img/icons/squats.png",
            4,
            10,
            "Stand straight with your feet hip-width apart and tigthen your stomach muscles. Lower down to about 90 degrees and straighten your legs to lift back up then repeat this movement.",
            2,
            0,
            2,
            2
        );
        //endregion

        //region Back exercises
        /***** Back exercises *****/
        generateDefaultExercise(
            "Pull up",
            "img/icons/pullups.png",
            4,
            10,
            "Stand beneath the bar and grip it. Let go of the ground and start pulling yourself up towards the bar and then returning to a hanging position",
            3,
            0,
            1,
            2
        );
        //endregion

        //region Ab exercises
        /***** Ab exercises *****/
        generateDefaultExercise(
            "Sit up",
            "img/icons/bench-press.png",
            4,
            10,
            "Lie down on your back with your knees bent. Curl your upper body towards your knees while keeping your feet on the ground then return and repeat.",
            4,
            0,
            1,
            2
        );
        //endregion

        //region Cardio exercises
        /***** Cardio exercises *****/
        generateDefaultExercise(
            "Jogging",
            "img/icons/parkour.png",
            0,
            0,
            "Distance jogging",
            5,
            20,
            1,
            2
        );
        //endregion
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

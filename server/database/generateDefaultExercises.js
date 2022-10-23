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
        generateDefaultExercise(
            "Barbell overhead press",
            "img/icons/bench-press.png",
            3,
            12,
            "",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Seated dumbbell press",
            "img/icons/bench-press.png",
            3,
            12,
            "",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Front raise",
            "img/icons/bench-press.png",
            3,
            12,
            "",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Dumbbell lateral raise",
            "img/icons/bench-press.png",
            3,
            12,
            "",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Cable lateral raise",
            "img/icons/bench-press.png",
            3,
            12,
            "",
            1,
            0,
            1,
            2
        );

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

        generateDefaultExercise(
            "Overhead extension",
            "img/icons/bench-press.png",
            3,
            10,
            "Sit up with your back straigh preferebly against the back of the chair if possible, and hold on to a dumbbell with 2 hands. Lift the dumbbell above the head reaching to the back while holding a position with the arms at 90° and lift up the dumbbell in that position while extending your arms.",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Cable rope pushdowns",
            "img/icons/bench-press.png",
            4,
            12,
            "",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Skull crusher",
            "img/icons/bench-press.png",
            2,
            10,
            "",
            1,
            0,
            3,
            2
        );

        generateDefaultExercise(
            "Diamond pushup",
            "img/icons/bench-press.png",
            2,
            12,
            "",
            1,
            0,
            2,
            2
        );

        /***** Bicep exercises *****/
        generateDefaultExercise(
            "Dumbbell curl",
            "img/icons/bench-press.png",
            4,
            12,
            "",
            1,
            0,
            1,
            2
        );

        generateDefaultExercise(
            "Cable curl",
            "img/icons/bench-press.png",
            4,
            10,
            "",
            1,
            0,
            1,
            2
        );

        generateDefaultExercise(
            "Barbell curl",
            "img/icons/bench-press.png",
            2,
            12,
            "",
            1,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Hammer curl",
            "img/icons/bench-press.png",
            4,
            10,
            "",
            1,
            0,
            1,
            2
        );

        generateDefaultExercise(
            "EZ-bar preacher curl",
            "img/icons/bench-press.png",
            4,
            10,
            "",
            1,
            0,
            1,
            2
        );



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

        generateDefaultExercise(
            "Calf raises",
            "img/icons/squats.png",
            4,
            10,
            "",
            2,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Lunges",
            "img/icons/squats.png",
            4,
            10,
            "",
            2,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Wall sit",
            "img/icons/squats.png",
            0,
            0,
            "",
            2,
            0.5,
            3,
            2
        );

        generateDefaultExercise(
            "Leg press",
            "img/icons/squats.png",
            3,
            12,
            "",
            2,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Leg extension",
            "img/icons/squats.png",
            3,
            12,
            "",
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

        generateDefaultExercise(
            "Deadlift",
            "img/icons/pullups.png",
            2,
            10,
            "",
            3,
            0,
            3,
            2
        );

        generateDefaultExercise(
            "Seated cable row",
            "img/icons/pullups.png",
            4,
            10,
            "",
            3,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Lat pulldown",
            "img/icons/pullups.png",
            4,
            10,
            "",
            3,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Single arm dumbbell row",
            "img/icons/pullups.png",
            4,
            10,
            "",
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

        generateDefaultExercise(
            "Plank",
            "img/icons/bench-press.png",
            0,
            0,
            "Lie down on your chest with arms bent at 90° angle and standing on your toes so you have a straight form on your body. Hold this position for a duration of time.",
            4,
            1,
            2,
            2
        );

        generateDefaultExercise(
            "Leg raises",
            "img/icons/bench-press.png",
            2,
            16,
            "",
            4,
            0,
            1,
            2
        );

        generateDefaultExercise(
            "Bicycle crunches",
            "img/icons/bench-press.png",
            2,
            12,
            "",
            4,
            0,
            2,
            2
        );

        generateDefaultExercise(
            "Mountain climber",
            "img/icons/bench-press.png",
            2,
            16,
            "",
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

        generateDefaultExercise(
            "Jump rope",
            "img/icons/parkour.png",
            0,
            0,
            "Jumping rope. If its too difficult to do 15-30 minutes in one go, you can do intervals of jumping as fast as you can for 1 minute and take a 20-30 second break and repeat.",
            15,
            5,
            1,
            2
        );
        generateDefaultExercise(
            "Cycling",
            "img/icons/parkour.png",
            0,
            0,
            "",
            5,
            30,
            1,
            2
        );

        generateDefaultExercise(
            "Stair climbers",
            "img/icons/parkour.png",
            0,
            0,
            "",
            5,
            25,
            2,
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

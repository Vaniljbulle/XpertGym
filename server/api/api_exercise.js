const Exercise = require("../database/exercise");
const UserExercise = require("../database/userExercise");
const Schedule = require("../database/schedule");
const {verify} = require("jsonwebtoken");
const {verifyToken} = require("../auth/token");
const isAdmin = require("../auth/isAdmin");
const isPersonalTrainer = require("../auth/isPersonalTrainer");
const router = require('express').Router();

// Add exercise post request
router.post('/api/exercise/add', verifyToken, async (req, res) => {
    console.log("Exercise add post request");

    // Check input for validity
    if (req.body.name === undefined ||
        req.body.image === undefined ||
        req.body.sets === undefined ||
        req.body.reps === undefined ||
        req.body.description === undefined ||
        req.body.muscleGroup === undefined ||
        req.body.duration === undefined ||
        req.body.difficulty === undefined ||
        req.body.type === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {name, image, sets, reps, description, muscleGroup, duration, difficulty, type} = req.body;
    console.log({name, image, sets, reps, description, muscleGroup, duration, difficulty, type});

    try {
        const isUserExercise = type === 0 || type === 1;
        if (!await isAdmin(req.user))
            if (!isUserExercise) throw "User not allowed";

        const exercise = await Exercise.create({
            name,
            image,
            sets,
            reps,
            description,
            muscleGroup,
            duration,
            difficulty,
            type
        });

        if (isUserExercise) {
            await UserExercise.create({id_exercise: exercise._id, id_user: req.user.id});
        }

        console.log("Exercise added successfully: ", exercise);
        res.status(200).json({status: 'ok', data: exercise._id});
    } catch (err) {
        console.log("Encountered error during adding exercise: ", err);
        res.status(500).json({status: 'error'});
    }
})

// Remove exercise post request
router.post('/api/exercise/remove', verifyToken, async (req, res) => {
    console.log("Exercise remove post request");

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        if (await isAdmin(req.user)){
            const exercise = await Exercise.findById(_id).deleteOne();
            await UserExercise.find({id_exercise: _id}).deleteOne();
            console.log("Exercise removed successfully: ", exercise);
            res.status(200).json({status: 'ok'});
        }
        else {
            await UserExercise.find({id_exercise: _id, id_user: req.user.id}).deleteOne();
            const exercise = await Exercise.findById(_id).deleteOne();
            console.log("Exercise removed successfully: ", exercise);
            res.status(200).json({status: 'ok'});
        }

    } catch (err) {
        console.log("Encountered error during exercise removal: ", err);
        res.status(500).json({status: 'error'});
    }
})

// Get one exercise by ID post request
router.post('/api/exercise/getByID', verifyToken, async (req, res) => {
    console.log("Exercise getByID post request");

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        if (await isAdmin(req.user)){
            const exercise = await Exercise.findById(_id).lean();
            console.log("Exercise fetched successfully: ", exercise);
            res.status(200).json({status: 'ok', data: exercise});
        }
        else {
            await UserExercise.find({id_exercise: _id, id_user: req.user.id}).lean();
            const exercise = await Exercise.findById(_id).lean();
            console.log("Exercise fetched successfully: ", exercise);
            res.status(200).json({status: 'ok', data: exercise});
        }

    } catch (err) {
        console.log("Encountered error during exercise fetching: ", err);
        res.status(500).json({status: 'error'});
    }
})

// All exercises get request
router.post('/api/exercise/all', verifyToken, async (req, res) => {
    console.log("Send all get request");

    if (await isAdmin(req.user)  || await isPersonalTrainer(req.user)) {
        try {
            const filter = {};
            const all = await Exercise.find(filter);

            console.log("All exercises was sent");
            res.status(200).json({status: 'ok', data: all});
        } catch (err) {
            res.status(500).json({status: 'error', data: err});
        }
    } else {
        try {
            let all = [];
            const standards = await Exercise.find({type: 2}).lean();
            for (const standard of standards) {
                all.push(standard._id);
            }
            const customExercises = await UserExercise.find({id_user: req.user.id}).lean();
            for (const customExercise of customExercises) {
                const tmp = await Exercise.findById(customExercise.id_exercise).lean();
                all.push(tmp._id);
            }

            console.log("All allowed exercises was sent", all);
            res.status(200).json({status: 'ok', data: all});
        } catch (err) {
            res.status(500).json({status: 'error', data: err});
        }
    }
})

module.exports = router;
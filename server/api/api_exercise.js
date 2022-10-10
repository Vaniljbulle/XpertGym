const Exercise = require("../database/exercise");
const router = require('express').Router();

// Add exercise post request
router.post('/api/exercise/add', async (req, res) => {
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
        req.body.custom === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {name, image, sets, reps, description, muscleGroup, duration, difficulty, custom} = req.body;

    try {
        const user = await Exercise.create({name, image, sets, reps, description, muscleGroup, duration, difficulty, custom});
        console.log("Exercise added successfully: ", user);
        res.status(200).json({status: 'ok', data: name});
    }
    catch (err) {
        console.log("Encountered error during adding exercise: ", err);
        res.status(500).json({status: 'error'});
    }
})

// Remove exercise post request
router.post('/api/exercise/remove', async (req, res) => {
    console.log("Exercise remove post request");

    const filter = {};
    const all = await Exercise.find(filter);

    console.log(all);

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        const user = await Exercise.findById(_id).deleteOne();
        console.log("Exercise removed successfully: ", user);
        res.status(200).json({status: 'ok'});
    }
    catch (err) {
        console.log("Encountered error during exercise removal: ", err);
        res.status(500).json({status: 'error'});
    }
})

// All exercises get request
router.post('/api/exercise/getAll', async (req, res) => {
    console.log("Send all get request");

    const filter = {};
    const all = await Exercise.find(filter);

    console.log(all);

    res.status(200).json({status: 'ok', data: all});
})

module.exports = router;
const Exercise = require("../database/exercise");
const router = require('express').Router();

// Register post request
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
        req.body.difficulty === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    //console.log(req.body);
    const {name, image, sets, reps, description, muscleGroup, duration, difficulty} = req.body;
    //console.log(hashedPassword);
    /*
        await User.create({username, password: hashedPassword, id_number}, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).json({status: 'error'});
            } else {
                console.log(user);
                res.status(200).json({status: 'ok', data: user});
            }
        })
    */

    try {
        const user = await Exercise.create({name, image, sets, reps, description, muscleGroup, duration, difficulty});
        console.log("Exercise added successfully: ", user);
        res.status(200).json({status: 'ok', data: name});
    }
    catch (err) {
        console.log("Encountered error during sign up: ", err);
        res.status(500).json({status: 'error'});
    }
    //res.json({status: 'ok', data: 'Data test'});


})

module.exports = router;
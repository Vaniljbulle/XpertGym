const User = require("../database/user");
const Exercise = require("../database/exercise");
const Schedule = require("../database/schedule");
const ScheduleLink = require("../database/scheduleLink");
const e = require("express");
const {verifyToken} = require("../auth/token");
const router = require('express').Router();

// Add schedule post request
router.post('/api/schedule/add', async (req, res) => {
    console.log("Schedule add post request");

    // Check input for validity
    if (req.body.name === undefined ||
        req.body.username === undefined ||
        req.body.exercises === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {name, username, exercises} = req.body;

    try {
        for (const exercise of exercises) {
            await Exercise.findOne({_id: exercise.exercise_id});
        }
        const user = await User.findOne({username}).lean();
        const schedule = await Schedule.create({name, id_user: user._id});

        for (const exercise of exercises) {
            await ScheduleLink.create({id_exercise: exercise.exercise_id, id_schedule: schedule._id, order: exercise.order});
        }

        console.log("Schedule added successfully: ", user);
        res.status(200).json({status: 'ok', data: username});
    }
    catch (err) {
        console.log("Encountered error during adding schedule: ", err);
        res.status(500).json({status: 'error'});
    }
})

// MOCK SCHEDULE ADD
router.post('/api/schedule/mock/add', verifyToken, async (req, res) => {
    console.log("Mocking schedule add post request");

    // Check input for validity
    if (req.body.name === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {name} = req.body;
    const username = req.user.username;

    try {
        const user = await User.findOne({username}).lean();
        await Schedule.create({name, id_user: user._id});

        console.log("Mocked schedule added successfully: ", user);
        res.status(200).json({status: 'ok', data: username});
    }
    catch (err) {
        console.log("Encountered error during adding schedule: ", err);
        res.status(500).json({status: 'error'});
    }
})


// Remove schedule post request
router.post('/api/schedule/remove', async (req, res) => {
    console.log("Schedule remove post request");

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        const schedule = await Schedule.findById(_id);
        if (!schedule) throw "Schedule does not exist";
        schedule.deleteOne();
        await ScheduleLink.find({id_schedule: _id}).deleteMany();
        console.log("Schedule removed successfully: ", schedule);
        res.status(200).json({status: 'ok'});
    }
    catch (err) {
        console.log("Encountered error during schedule removal: ", err);
        res.status(500).json({status: 'error'});
    }
})

// All exercises from schedule get request
router.post('/api/schedule/get', async (req, res) => {
    console.log("Send all exercises from schedule get request");

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        const schedule = await Schedule.findById(_id).lean();
        if (!schedule) throw "Schedule does not exist";
        const exercises = await ScheduleLink.find({id_schedule: _id}).lean();

        console.log("Schedule fetched successfully: ", _id);
        res.status(200).json({status: 'ok', data: exercises});
    }
    catch (err) {
        console.log("Encountered error during schedule removal: ", err);
        res.status(500).json({status: 'error'});
    }
})

module.exports = router;
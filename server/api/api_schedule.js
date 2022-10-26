const User = require("../database/user");
const Exercise = require("../database/exercise");
const Schedule = require("../database/schedule");
const ScheduleLink = require("../database/scheduleLink");
const e = require("express");
const isAdmin = require("../auth/isAdmin");
const Membership = require("../database/membership");
const {verifyToken} = require("../auth/token");
const isPersonalTrainer = require("../auth/isPersonalTrainer");
const router = require('express').Router();

// Add schedule post request
router.post('/api/schedule/add', verifyToken, async (req, res) => {
    console.log("Schedule add post request");

    // Check input for validity
    if (req.body.name === undefined ||
        req.body.exercises === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {name, exercises} = req.body;

    try {
        for (const exercise of exercises) {
            await Exercise.findOne({_id: exercise.exercise_id});
        }
        const user = await User.findOne({username: req.user.username}).lean();
        const schedule = await Schedule.create({name, id_user: req.user.id, type: 0});

        for (const exercise of exercises) {
            await ScheduleLink.create({
                id_exercise: exercise.exercise_id,
                id_schedule: schedule._id,
                day: exercise.day,
                order: exercise.order
            });
        }

        console.log("Schedule added successfully: ", req.user);
        res.status(200).json({status: 'ok', data: req.user.username, scheduleID: schedule._id});
    } catch (err) {
        console.log("Encountered error during adding schedule: ", err);
        res.status(500).json({status: 'error'});
    }
})

// Get all schedules for user
router.get('/api/schedule/getAll', verifyToken, async (req, res) => {
    console.log("Get schedules get request");
    try {
        const user = await User.findOne({username: req.user.username}).lean();
        const schedules = await Schedule.find({id_user: user._id}).lean();

        console.log("Schedules fetched successfully: ", schedules);
        res.status(200).json({status: 'ok', data: schedules});
    }
    catch (err) {
        console.log("Encountered error during fetching schedules: ", err);
        res.status(500).json({status: 'error'});
    }
})

// Remove schedule post request
router.post('/api/schedule/remove', verifyToken, async (req, res) => {
    console.log("Schedule remove post request");

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        const schedule = await Schedule.findOne({_id, id_user: req.user.id}).lean();
        if (!schedule) throw "Schedule does not exist";
        schedule.deleteOne();
        await ScheduleLink.find({id_schedule: _id}).deleteMany();
        console.log("Schedule removed successfully: ", schedule);
        res.status(200).json({status: 'ok'});
    } catch (err) {
        console.log("Encountered error during schedule removal: ", err);
        res.status(500).json({status: 'error'});
    }
})

// All exercises from schedule get request
router.post('/api/schedule/getExercises', verifyToken, async (req, res) => {
    console.log("Send all exercises from schedule get request");

    // Check input for validity
    if (req.body._id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {_id} = req.body;

    try {
        const schedule = await Schedule.findById({_id, id_user: req.user.id}).lean();
        if (!schedule) throw "Schedule does not exist";
        const exercises = await ScheduleLink.find({id_schedule: _id}).lean();

        console.log("Schedule fetched successfully: ", _id);
        res.status(200).json({status: 'ok', data: exercises});
    } catch (err) {
        console.log("Encountered error during schedule fetching: ", err);
        res.status(500).json({status: 'error'});
    }
})

// All schedules get request
router.get('/api/schedule/all', verifyToken, async (req, res) => {
    console.log("Send all schedules get request");

    if (await isAdmin(req.user)  || await isPersonalTrainer(req.user)) {
        try {
            const schedules = await Schedule.find({}).lean();

            console.log("All schedules fetched successfully");
            return res.status(200).json({status: 'ok', data: schedules});
        } catch (err) {
            return res.status(500).json({status: 'error', data: err});
        }
    } else {
        try {
            const schedules = await Schedule.find({id_user: req.user.id}).lean();

            console.log("Schedules fetched successfully: ", schedules);
            return res.status(200).json({status: 'ok', data: schedules});
        } catch (err) {
            return res.status(500).json({status: 'error', data: err});
        }
    }
})

module.exports = router;
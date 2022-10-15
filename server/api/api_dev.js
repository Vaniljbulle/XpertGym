const {verifyToken} = require("../auth/token");
const router = require('express').Router();
const isAdmin = require("../auth/isAdmin");

const User = require("../database/user");
const Membership = require("../database/membership");
const Exercise = require("../database/exercise");
const UserExercise = require("../database/userExercise");
const Schedule = require("../database/schedule");
const ScheduleLink = require("../database/scheduleLink");


// All users fetch
router.get('/api/dev/users', verifyToken, async (req, res) => {
    if (await isAdmin(req.user)) {
        const users = await User.find({}).lean();
        for (let i = 0; i < users.length; i++) {
            users[i].password = "REDACTED";
            users[i].__v = "REDACTED";
            users[i].refreshTokens = "REDACTED";
        }
        res.status(200).json({status: 'ok', data: users});
    } else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
});

// Cleanse databse
router.get('/api/dev/clear', verifyToken, async (req, res) => {
    // Clear all databases
    if (await isAdmin(req.user)) {
        console.log("Clearing all databases");
        await User.deleteMany({});
        await Membership.deleteMany({});
        await Exercise.deleteMany({});
        await UserExercise.deleteMany({});
        await Schedule.deleteMany({});
        await ScheduleLink.deleteMany({});
        res.status(200).json({status: 'ok', data: 'All databases cleared'});
    }else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
})


module.exports = router;
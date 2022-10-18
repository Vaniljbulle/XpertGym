const router = require('express').Router();
const isAdmin = require("../auth/isAdmin");
const User = require("../database/user");
const Membership = require("../database/membership");
const Exercise = require("../database/exercise");
const UserExercise = require("../database/userExercise");
const Schedule = require("../database/schedule");
const ScheduleLink = require("../database/scheduleLink");
const {verifyToken} = require("../auth/token");

/*
 * Removes all entries from all databases except the admin user
 */
router.get('/api/database/clear/all', verifyToken, async (req, res) => {
    if (await isAdmin(req.user)) {
        console.log("Clearing all databases");
        await User.deleteMany({username: {$nin:["Admin"]}}); // Delete all accounts except Admin
        await Membership.deleteMany({user_level: {$nin:[2]}}); // Delete all memberships except Admin
        await Exercise.deleteMany({});
        await UserExercise.deleteMany({});
        await Schedule.deleteMany({});
        await ScheduleLink.deleteMany({});
        res.status(200).json({status: 'ok', data: 'All databases cleared'});
    }else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
})

/*
 * Removes all users from database except the admin user
 * Frees up all memberships
 */
router.get('/api/database/clear/users', verifyToken, async (req, res) => {
    if (await isAdmin(req.user)) {
        console.log("Clearing user database");
        await User.deleteMany({username: {$nin:["Admin"]}}); // Delete all accounts except Admin
        await Membership.updateMany({user_id: {$nin:[req.user.id]}}, {user_id: null}); // Free up memberships
        await Schedule.deleteMany({id_user: {$nin:[req.user.id]}}); // Delete all schedules except Admin
        await ScheduleLink.deleteMany({id_user: {$nin:[req.user.id]}}); // Delete all schedule links except Admin

        res.status(200).json({status: 'ok', data: 'Users deleted, memberships freed'});
    }else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
});

/*
 * Removes all memberships from database except the admin membership
 * Doesn't remove/ban already registered users
 */
router.get('/api/database/clear/memberships', verifyToken, async (req, res) => {
    if (await isAdmin(req.user)) {
        console.log("Clearing membership database");
        await Membership.deleteMany({user_level: {$nin:[2]}}); // Delete all memberships except Admin
        res.status(200).json({status: 'ok', data: 'Memberships deleted'});
    }else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
});

/*
 * Removes all message logs from all schedules
 */
router.get('/api/database/clear/messages', verifyToken, async (req, res) => {
    if (await isAdmin(req.user)) {
        console.log("Clearing message logs");
        await Schedule.updateMany({}, {messages: []});
        res.status(200).json({status: 'ok', data: 'Message logs cleared'});
    } else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
});

/*
 * Removes all schedules from database
 */
router.get('/api/database/clear/schedules', verifyToken, async (req, res) => {
   if(await isAdmin(req.user)) {
       console.log("Clearing schedule database");
       await Schedule.deleteMany({});
       await ScheduleLink.deleteMany({});
       res.status(200).json({status: 'ok', data: 'Schedules deleted'});
   }else {
       res.status(403).json({status: 'error', data: 'Not authorized'});
   }
});

module.exports = router;
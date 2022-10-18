const {verifyToken} = require("../auth/token");
const isAdmin = require("../auth/isAdmin");
const User = require("../database/user");
const Membership = require("../database/membership");
const Exercise = require("../database/exercise");
const UserExercise = require("../database/userExercise");
const Schedule = require("../database/schedule");
const ScheduleLink = require("../database/scheduleLink");

router.get('/api/database/clear/all', verifyToken, async (req, res) => {
    // Clear all databases
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

module.exports = router;
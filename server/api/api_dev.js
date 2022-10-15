const User = require("../database/user");
const Membership = require("../database/membership");
const {verifyToken} = require("../auth/token");
const router = require('express').Router();

router.get('/api/dev/users', verifyToken, async (req, res) => {
    // Check if user is admin
    const user = await User.findOne({username: req.user.username}).lean();
    const membership = await Membership.findOne({user_id: user._id}).lean();
    if (membership.user_level !== 2) {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    } else {
        const users = await User.find({}).lean();
        for (let i = 0; i < users.length; i++) {
            users[i].password = "REDACTED";
            users[i].__v = "REDACTED";
            users[i].refreshTokens = "REDACTED";
        }
        res.status(200).json({status: 'ok', data: users});
    }
});


module.exports = router;
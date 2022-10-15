const User = require("../database/user");
const Membership = require("../database/membership");
const {verifyToken} = require("../auth/token");
const router = require('express').Router();
const isAdmin = require("../auth/isAdmin");

router.post('/api/membership/add', verifyToken, async (req, res) => {
    // Check if user is admin

    if (await isAdmin(req.user) === false) {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    } else {
        // Add membership to database
        console.log("Adding membership " + req.body.MEMBERSHIP_ID + " to database");
        try {
            await Membership.create({user_id: null, membership_id: req.body.MEMBERSHIP_ID, user_level: 0});
            res.status(200).json({status: 'ok', data: 'Membership added'});
        } catch (err) {
            res.status(500).json({status: 'error', data: err});
        }

    }
});

module.exports = router;
const User = require("../database/user");
const Membership = require("../database/membership");
const {verifyToken} = require("../auth/token");
const router = require('express').Router();
const isAdmin = require("../auth/isAdmin");

router.post('/api/membership/add', verifyToken, async (req, res) => {
    // Check if user is admin

    if (await isAdmin(req.user)) {
        // Add membership to database
        console.log("Adding membership " + req.body.MEMBERSHIP_ID + " to database");
        try {
            await Membership.create({user_id: null, membership_id: req.body.MEMBERSHIP_ID, user_level: 0});
            res.status(200).json({status: 'ok', data: 'Membership added'});
        } catch (err) {
            res.status(500).json({status: 'error', data: err});
        }
    } else {
        res.status(403).json({status: 'error', data: 'Not authorized'});
    }
});

/*
* Returns all memberships IDs if the requesting user is an admin
* Returns the membership ID of the requesting user if the requesting user is not an admin
*/
router.get('/api/membership/get', verifyToken, async (req, res) => {
    if (await isAdmin(req.user)) {
        try {
            const memberships = await Membership.find({}).lean();
            res.status(200).json({status: 'ok', data: memberships});
        } catch (err) {
            res.status(500).json({status: 'error', data: err});
        }
    }
    else {
        try {
            const memberships = await Membership.find({user_id: req.user.id}).lean();
            res.status(200).json({status: 'ok', data: memberships});
        } catch (err) {
            res.status(500).json({status: 'error', data: err});
        }
    }
});

/*
 * Removes a membership from the database if the requesting user is an admin
 */
router.post('/api/membership/remove', verifyToken, async (req, res) => {
   if (await isAdmin(req.user)) {
       try {
           let membership = await Membership.findOne({membership_id: req.body.MEMBERSHIP_ID}).lean();
           if (membership.user_id === null) {
               await Membership.deleteOne({membership_id: req.body.MEMBERSHIP_ID});
               return res.status(200).json({status: 'ok', data: 'Membership removed'});
           }
           return res.status(400).json({status: 'error', data: 'Membership is in use'});
       } catch (err) {
           res.status(500).json({status: 'error', data: err});
       }
   }
});

module.exports = router;
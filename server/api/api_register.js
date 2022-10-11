const bcrypt = require("bcrypt");
const User = require("../database/user");
const Membership = require("../database/membership");
const router = require('express').Router();

// Register post request
router.post('/api/register', async (req, res) => {
    console.log("Register post request");

    // Check input for validity
    if (req.body.username === undefined || req.body.password === undefined || req.body.membership_id === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {username, password, membership_id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const membership = await Membership.findOne({membership_id: membership_id}).lean();
        const user = await User.create({username, password: hashedPassword});
        membership.update({user_id: user._id});
        console.log("User created successfully: ", user);
        res.status(200).json({status: 'ok', data: username});
    }
    catch (err) {
        console.log("Encountered error during sign up: ", err);
        res.status(500).json({status: 'error'});
    }
})

module.exports = router;
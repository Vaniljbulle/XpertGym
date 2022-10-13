const bcrypt = require("bcrypt");
const User = require("../database/user");
const Membership = require("../database/membership");
const router = require('express').Router();

// Register post request
router.post('/api/register', async (req, res) => {
    console.log("Register post request");

    // Check input for validity
    if (req.body.username === undefined || req.body.password === undefined || req.body.membership_id === undefined ||
        req.body.username === "" || req.body.password === "" || req.body.membership_id === "") {
        console.log(req.body);
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    const {username, password, membership_id} = req.body;

    if (await User.findOne({username}).lean()) {
        res.status(403).json({status: 'error', data: 'Username already exists'});
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const membership = await Membership.findOne({membership_id: membership_id}).lean();
        if (!membership) throw "No membership found";

        const user = await User.create({username, password: hashedPassword});

        await Membership.updateOne({membership_id: membership_id}, {$set: {user_id: user._id}});

        console.log("User created successfully: ", user);
        res.status(200).json({status: 'ok', data: username});
    } catch (err) {
        console.log("Encountered error during sign up: ", err);
        res.status(500).json({status: 'error'});
    }
})

module.exports = router;
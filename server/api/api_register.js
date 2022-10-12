const bcrypt = require("bcrypt");
const User = require("../database/user");
const router = require('express').Router();

// Register post request
router.post('/api/register', async (req, res) => {
    console.log("Register post request");

    // Check input for validity
    if (req.body.username === undefined || req.body.password === undefined || req.body.id_number === undefined ||
        req.body.username === "" || req.body.password === "" || req.body.id_number === "") {
        console.log(req.body);
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    //console.log(req.body);
    const {username, password, id_number} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);
    /*
        await User.create({username, password: hashedPassword, id_number}, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).json({status: 'error'});
            } else {
                console.log(user);
                res.status(200).json({status: 'ok', data: user});
            }
        })
    */

    try {
        const user = await User.create({username, password: hashedPassword, id_number});
        console.log("User created successfully: ", user);
        res.status(200).json({status: 'ok', data: username});
    } catch (err) {
        console.log("Encountered error during sign up: ", err);
        res.status(500).json({status: 'error'});
    }
    //res.json({status: 'ok', data: 'Data test'});


})

module.exports = router;
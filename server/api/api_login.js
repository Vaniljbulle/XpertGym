const bcrypt = require("bcrypt");
const User = require("../database/user");
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

// Login post request
router.post('/api/login', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    const user = await User.findOne({ username }).lean()
    console.log(user);

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )

        return res.json({ header: 'Authorization', status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

module.exports = router
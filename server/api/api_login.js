const bcrypt = require("bcrypt");
const User = require("../database/user");
const router = require('express').Router();
const {generateAccessToken, generateRefreshToken} = require('../auth/token');

// Login post request
router.post('/api/login', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    const user = await User.findOne({username}).lean()
    console.log(user);

    if (!user) {
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const tokenUser = {id: user._id, username: user.username};
        const accessToken = generateAccessToken(tokenUser);
        const refreshToken = generateRefreshToken(tokenUser);

        // Store refresh token in database
        await User.findOneAndUpdate({username}, {$push: {refreshTokens: refreshToken}});

        res.cookie('accessToken', accessToken, {httpOnly: true});
        res.cookie('refreshToken', refreshToken, {httpOnly: true});
        return res.json({status: 'ok', data: 'Logged in'});
    }
    res.json({status: 'error', error: 'Invalid username/password'})
})

module.exports = router
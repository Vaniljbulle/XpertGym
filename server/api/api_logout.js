const router = require('express').Router();
const {verifyAccessToken} = require('../auth/token');
const mongoose = require('mongoose');
const User = require('../database/user');

// Logout post request
router.post('/api/logout', verifyAccessToken, async (req, res) => {
    console.log("Logout post request");
    await User.findOneAndUpdate({username: req.user.username}, {refreshTokens: []});

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ status: 'ok', data: 'Logged out' });
    console.log("Logged out " + req.user.username);
})

module.exports = router
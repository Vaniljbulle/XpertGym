const router = require('express').Router();
const {verifyRefreshToken} = require('../auth/tokenValidation');
const {generateAccessToken, generateRefreshToken} = require("../auth/token");

// Refresh token post request
router.get('/api/token', verifyRefreshToken, async (req, res) => {
    console.log("Refresh token post request");
    console.log(req.headers);

    const tokenUser = {id: req.user.id, username: req.user.username};
    const accessToken = generateAccessToken(tokenUser);
    const refreshToken = generateRefreshToken(tokenUser);

    res.cookie('accessToken', accessToken, {httpOnly: true});
    res.cookie('refreshToken', refreshToken, {httpOnly: true});
    res.redirect('back');
})

module.exports = router
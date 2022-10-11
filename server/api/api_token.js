const router = require('express').Router();
const {verifyRefreshToken, generateAccessToken, verifyAccessToken} = require("../auth/token");

// Refresh token post request
router.get('/api/token', verifyRefreshToken, async (req, res) => {
    console.log("Refresh token post request");
    //console.log(req.headers);

    const tokenUser = {id: req.user.id, username: req.user.username};
    const accessToken = generateAccessToken(tokenUser);

    res.cookie('accessToken', accessToken, {httpOnly: true});
    res.status(200).json({status: 'ok', data: 'Refreshed token'});
})

module.exports = router
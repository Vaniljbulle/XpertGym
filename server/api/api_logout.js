const router = require('express').Router();
const {verifyAccessToken} = require('../auth/tokenValidation');

// Logout post request
router.post('/api/logout', verifyAccessToken, async (req, res) => {
    console.log("Logout post request");

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ status: 'ok', data: 'Logged out' });
    console.log("Logged out " + req.user.username);
})

module.exports = router
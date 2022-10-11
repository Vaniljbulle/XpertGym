const router = require('express').Router();
const verifyToken = require('../auth/tokenValidation');

// Logout post request
router.post('/api/logout', verifyToken, async (req, res) => {
    console.log("Logout post request");

    res.clearCookie('token');
    res.json({ status: 'ok', data: 'Logged out' });
    console.log("Logged out " + req.user.username);
})

module.exports = router
const bcrypt = require("bcrypt");
const User = require("../database/user");
const Membership = require("../database/membership");
const router = require('express').Router();
const {generateAccessToken, generateRefreshToken, verifyToken} = require('../auth/token');

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
        
        let page = 'index.html';
        let code = 301;
        const membership = await Membership.findOne({user_id: user._id}).lean();
        if (!membership) {
            res.json({status: 'error', error: 'No membership found'});
        } else {
            console.log("Membership level: " + membership.user_level);
            if (membership.user_level === 2) {
                page = 'admin.html'
            }
        
            return res.json({status: 'ok', data: 'Logged in', redirect: page});
        }
    }
    res.json({status: 'error', error: 'Invalid username/password'})
})

// Get for status if user is logged in or not, returns username if logged in
router.get('/api/login/status', verifyToken, async (req, res) => {
    console.log("Login status get request");
    res.json({status: 'ok', data: req.user.username});
});

module.exports = router
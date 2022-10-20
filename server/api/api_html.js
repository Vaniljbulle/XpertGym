const path = require("path");
const router = require('express').Router();
const User = require("../database/user");
const Membership = require("../database/membership");
const {verifyToken} = require('../auth/token');
const isAdmin = require('../auth/isAdmin');

// Get profile.html
router.get('/profile.html', verifyToken, async (req, res) => {
    res.sendFile('profile.html', {root: 'frontend'});
});

// GET devMessaging.js
router.get('/devMessaging.js', verifyToken, async (req, res) => {
    res.sendFile('devMessaging.js', {root: 'server/auth'});
});

// GET request for client side gym pop data change js
router.get('/gym_pop_client.js', async (req, res) => {
    res.sendFile('gym_pop_client.js', {root: 'server/auth'});
});

// token test (private test page)
const testPagePaths = ['/testpage_private.html', '/testpage_private'];
router.get(testPagePaths, verifyToken, (req, res) => {
    console.log("Private test page requested");
    console.log("Username: " + req.user.id);
    res.sendFile('testpage_private.html', {root: 'frontend'});
})

// Admin page
router.get('/admin.html', verifyToken, async (req, res) => {
    console.log("Private admin page requested");
    console.log("Username: " + req.user.username);
    const user = await User.findOne({username: req.user.username}).lean();
    if (!user) {
        console.log("Failed to find user: " + req.user.username);
        return;
    }
    const membership = await Membership.findOne({user_id: user._id}).lean();
    if (!membership) {
        console.log("Failed to find membership of: " + user._id);
        return;
    }

    if (await isAdmin(req.user)) {
        console.log("Admin page was sent to " + req.user.username + " with membership id " + membership.user_level);
        res.sendFile('admin.html', {root: 'frontend'});
    }
    else {
        console.log("Non-admin user attempted to access admin page");
        return res.status(403).send('Forbidden - ' + req.user.username + ' with user level ' + membership.user_level);
    }
})

// Index (Home page)
const indexPaths = ['/', '/index', '/home', '/index.html', '/home.html'];
router.get(indexPaths, async (req, res) => {
    console.log("Index page requested");
    res.sendFile('index.html', {root: path.join('frontend')});
})

// Style sheet
router.get('/style.css', async (req, res) => {
    console.log("Style sheet requested");
    res.sendFile('style.css', {root: path.join('frontend')});
})

// Login page
const loginPaths = ['/login', '/login.html'];
router.get(loginPaths, async (req, res) => {
    console.log("Login page requested");
    res.sendFile('login.html', {root: path.join('frontend')});
})

// Register page
const registerPaths = ['/register', '/register.html', '/signup', '/signup.html'];
router.get(registerPaths, async (req, res) => {
    console.log("Sign up page requested");
    res.sendFile('signup.html', {root: path.join('frontend')});
})

// Register script (client side)
router.get('/register.js', async (req, res) => {
    console.log("Register script requested");
    res.sendFile('register.js', {root: path.join('server/auth')});
})

// Login script (client side)
router.get('/login.js', async (req, res) => {
    console.log("Login script requested");
    res.sendFile('login.js', {root: path.join('server/auth')});
})

// Logout script (client side)
router.get('/logout.js', async (req, res) => {
    console.log("Logout script requested");
    res.sendFile('logout.js', {root: path.join('server/auth')});
})

// add_exercise script (client side)
router.get('/add_exercise.js', async (req, res) => {
    console.log("add_exercise script requested");
    res.sendFile('add_exercise.js', {root: path.join('server/auth')});
})

// remove_exercise script (client side)
router.get('/remove_exercise.js', async (req, res) => {
    console.log("remove_exercise script requested");
    res.sendFile('remove_exercise.js', {root: path.join('server/auth')});
})

// fetch_exercise script (client side)
router.get('/fetch_exercise.js', async (req, res) => {
    console.log("fetch_exercise script requested");
    res.sendFile('fetch_exercise.js', {root: path.join('server/auth')});
})

// add_schedule script (client side)
router.get('/add_schedule.js', async (req, res) => {
    console.log("add_schedule script requested");
    res.sendFile('add_schedule.js', {root: path.join('server/auth')});
})

// remove_schedule script (client side)
router.get('/remove_schedule.js', async (req, res) => {
    console.log("remove_schedule script requested");
    res.sendFile('remove_schedule.js', {root: path.join('server/auth')});
})

// fetch_schedule script (client side)
router.get('/fetch_schedule.js', async (req, res) => {
    console.log("fetch_schedule script requested");
    res.sendFile('fetch_schedule.js', {root: path.join('server/auth')});
})

// workout_planner.html
router.get('/workout_planner.html', verifyToken, async (req, res) => {
    console.log("workout_planner.html requested");
    res.sendFile('workout_planner.html', {root: path.join('frontend')});
})

// schedule_generator.js
router.get('/schedule_generator.js', verifyToken, async (req, res) => {
    console.log("schedule_generator.js requested");
    res.sendFile('schedule_generator.js', {root: path.join('frontend')});
})

module.exports = router
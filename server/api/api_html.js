const path = require("path");
const router = require('express').Router();
const verifyToken = require('../auth/tokenValidation');
const User = require("../database/user");
const Membership = require("../database/membership");

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

    console.log("Admin page was sent to " + req.user.username);
    res.sendFile('admin.html', {root: 'frontend'});
})

// Index (Home page)
const indexPaths = ['/', '/index', '/home', '/index.html'];
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

module.exports = router
const path = require("path");
const router = require('express').Router();
const {verifyAccessToken} = require('../auth/token');

// token test (private test page)
const testPagePaths = ['/testpage_private.html', '/testpage_private'];
router.get(testPagePaths, verifyAccessToken, (req, res) => {
    console.log("Private test page requested");
    res.sendFile('testpage_private.html', {root: 'frontend'});
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

module.exports = router
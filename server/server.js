const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Index (Home page)
const indexPaths = ['/', '/index', '/home', '/index.html'];
app.get(indexPaths, async (req, res) => {
    console.log("Index page requested");
    res.sendFile('index.html', {root : path.join('frontend')});
})

// Style sheet
app.get('/style.css', async (req, res) => {
    console.log("Style sheet requested");
    res.sendFile('style.css', {root : path.join('frontend')});
})

// Login page
const loginPaths = ['/login', '/login.html'];
app.get(loginPaths, async (req, res) => {
    console.log("Login page requested");
    res.sendFile('login.html', {root: path.join('frontend')});
})

// Register page
const registerPaths = ['/register', '/register.html', '/signup', '/signup.html'];
app.get(registerPaths, async (req, res) => {
    console.log("Sign up page requested");
    res.sendFile('signup.html', {root: path.join('frontend')});
})

// Register script (client side)
app.get('/register.js', async (req, res) => {
    console.log("Register script requested");
    res.sendFile('register.js', {root : path.join('server')});
})

// Register post request
app.post('/api/register', async(req, res) => {
    console.log("Register post request");
    console.log(req.body);
    // register user
    res.json({status: 'ok', data: 'Data test'});

})


app.listen(3000, () => console.log('Listening on port 3000...'));

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Console = require("console");

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const app = express();
app.use(express.json());
app.use(bodyParser.json());


// Index (Home page)
const indexPaths = ['/', '/index', '/home', '/index.html'];
app.get(indexPaths, async (req, res) => {
    console.log("Index page requested");
    res.sendFile('index.html', {root: path.join('frontend')});
})

// Style sheet
app.get('/style.css', async (req, res) => {
    console.log("Style sheet requested");
    res.sendFile('style.css', {root: path.join('frontend')});
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
    res.sendFile('register.js', {root: path.join('server')});
})

// Login script (client side)
app.get('/login.js', async (req, res) => {
    console.log("Login script requested");
    res.sendFile('login.js', {root: path.join('server')});
})

// Register post request
app.post('/api/register', async (req, res) => {
    console.log("Register post request");

    // Check input for validity
    if (req.body.username === undefined || req.body.password === undefined || req.body.id_number === undefined) {
        res.status(400).json({status: 'error', data: 'Invalid input'});
        return;
    }

    //console.log(req.body);
    const {username, password, id_number} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);
/*
    await User.create({username, password: hashedPassword, id_number}, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json({status: 'error'});
        } else {
            console.log(user);
            res.status(200).json({status: 'ok', data: user});
        }
    })
*/

    try {
        const user = await User.create({username, password: hashedPassword, id_number});
        console.log("User created successfully: ", user);
        res.status(200).json({status: 'ok', data: username});
    }
    catch (err) {
        console.log("Encountered error during sign up: ", err);
        res.status(500).json({status: 'error'});
    }
    //res.json({status: 'ok', data: 'Data test'});


})

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    const user = await User.findOne({ username }).lean()
    console.log(user);

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

mongoose.connection.on('disconnected', function() {
    fatalError(-2);
})

Console.log("Connecting to MongoDB...");
mongoose.connect('mongodb://127.0.0.1:27017/xpertdb', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB, starting server...");
    app.listen(3000, () => console.log('Server started\nListening on port 3000...'));
}).catch(() => {
    fatalError(-1);
});

function fatalError(code){
    switch (code) {
        case -1:
            console.log("Unable to connect to MongoDB");
            break;
        case -2:
            console.log("Disconnected from MongoDB");
            break;
    }

    process.exit(code);
}


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
app.get('/style.css', (req, res) => {
    console.log("Style sheet requested");
    res.sendFile('style.css', {root : path.join('frontend')});
})

// Register script (client side)
app.get('/register.js', (req, res) => {
    console.log("Register script requested");
    res.sendFile('register.js', {root : path.join('server')});
})

// Register post request
app.post('/api/register', (req, res) => {
    console.log("Register post request");
    console.log(req.body);
    // Registration logic
})


app.listen(3000, () => console.log('Listening on port 3000...'));

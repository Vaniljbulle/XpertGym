const express = require('express');
const app = express();
const path = require('path');

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



app.listen(3000, () => console.log('Listening on port 3000...'));

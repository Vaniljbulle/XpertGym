const express = require('express');
const app = express();
const path = 'frontend'
const indexPaths = ['/', '/index', '/home', '/index.html'];

// Index (Home page)
app.get(indexPaths, (req, res) => {
    res.sendFile('index.html', {root : path});
})

// Style sheet
app.get('/style.css', (req, res) => {
    res.sendFile('style.css', {root : path});
})

app.listen(3000, () => console.log('Listening on port 3000...'));

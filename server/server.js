const express = require('express');
const app = express();
const path = 'frontend'

// Index (Home page)
app.get('/', (req, res) => {
    res.sendFile('index.html', {root : path});
})

// Style sheet
app.get('/style.css', (req, res) => {
    res.sendFile('style.css', {root : path});
})

app.listen(3000, () => console.log('Listening on port 3000...'));

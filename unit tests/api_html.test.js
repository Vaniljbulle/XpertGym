request = require('supertest');
const express = require('express');
const htmlRoutes = require('../server/api/api_html.js');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(htmlRoutes);

function indexExpect(response) {
    let expected;
    try {
        expected = fs.readFileSync('./frontend/index.html', 'utf8');
    } catch (err) {
        console.error(err);
    }

    expect(response.type).toBe('text/html');
    expect(response.text).toBe(expected);
    expect(response.statusCode).toBe(200);
}

describe('api_html', () => {
    describe('index.html', () => {
        test('responds to /', async () => {
            indexExpect(await request(app).get('/'));
        });

        test('responds to /index', async () => {
            indexExpect(await request(app).get('/index'))
        });

        test('responds to /index.html', async () => {
            indexExpect(await request(app).get('/index.html'))
        });

        test('responds to /home', async () => {
            indexExpect(await request(app).get('/home'))
        });

        test('responds to /home.html', async () => {
            indexExpect(await request(app).get('/home.html'))
        });

        test('responds to /iNdEx', async () => {
            indexExpect(await request(app).get('/iNdEx'))
        });
    });
});
request = require('supertest');
const express = require('express');
const htmlRoutes = require('../server/api/api_html.js');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(htmlRoutes);

describe('api_html', () => {
    let expected = fs.readFileSync('./frontend/index.html', 'utf8');

    test('responds to /', async () => {
        const response = await request(app).get('/');

        expect(response.text).toBe(expected);
        expect(response.statusCode).toBe(200);
    });

    test('responds to /index', async () => {
        const response = await request(app).get('/index');

        expect(response.text).toBe(expected);
        expect(response.statusCode).toBe(200);
    });
});
request = require('supertest');
const express = require('express');
const loginRoute = require('../server/api/api_login.js');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(loginRoute);


describe('api_login.js', function () {
    describe('POST /api/login', function () {
        const user = {username: "admin", password: "admin"};

        mongoose.connect('mongodb://127.0.0.1:27017/xpertdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        test('responds with json', async () => {
            const res = await request(app).post('/api/login').set('Content-Type', "application/json").send(JSON.stringify(user));


            expect(res.body.header).toBe('Authorization');
            expect(res.body.token).not.toBe(null);
            expect(res.body.status).toBe('ok');

            mongoose.connection.close();
        });

    });
});


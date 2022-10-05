request = require('supertest');
const express = require('express');
const loginRoute = require('../server/api/api_login.js');

const app = express();
app.use(express.json());
app.use(loginRoute);


describe('api_login.js', function () {
    describe('POST /api/login', function () {
        const user = {username: "admin", password: "admin"};
        jest.setTimeout(100000);
        test('responds with json', async (done) => {
            try{
                await request(app).post('/api/login').set('Content-Type', "application/json").send(JSON.stringify(user));
                done();
            } catch (err) {
                //console.log("REEEEEEEEE" + err)
                done(err);
            }
            done();
        });

    });
});


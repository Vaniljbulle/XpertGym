request = require('supertest');
const express = require('express');
const loginRoute = require('../server/api/api_login.js');
const registerRoute = require('../server/api/api_register.js');
const logoutRoute = require('../server/api/api_logout.js');
const mongoose = require('mongoose');
const User = require("../server/database/user");
const verifyToken = require('../server/auth/tokenValidation');

const app = express();
app.use(express.json());
app.use(loginRoute);
app.use(registerRoute);
app.use(logoutRoute);



describe('api_register.js', function () {
    beforeAll(async () => await mongoose.connect('mongodb://127.0.0.1:27017/xpertdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }));

    const testUser = {username: "testUserRegistration", password: "testPassword", id_number: "48946548974"};
    let token = "";

    describe('POST /api/register', () => {
        const falseUsers = [
            {username: "", password: "testPassword", id_number: "48946548974"},
            {username: "wetwetw", password: "", id_number: "48946548974"},
            {username: "awbrwnrqateant", password: "testPassword", id_number: ""},
            {username: "", password: "", id_number: ""},
            {username: "", password: "", id_number: "48946548974"},
            {username: "", password: "testPassword", id_number: ""},
            {username: "qe5tketqmetg", password: "", id_number: ""},
        ];

        test('Proper user info', async () => {
            const response = await request(app).post('/api/register').set('Content-Type', "application/json").send(JSON.stringify(testUser));
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('ok')
        });

        test('Username taken', async () => {
            const response = await request(app).post('/api/register').set('Content-Type', "application/json").send(JSON.stringify(testUser));
            expect(response.statusCode).toBe(500);
            expect(response.body.status).toBe('error');
        });

        // For each false user, test if the response is 400 and the status is error
        falseUsers.forEach((falseUser, index) => {
            test(`False user ${index}`, async () => {
                const response = await request(app).post('/api/register').set('Content-Type', "application/json").send(JSON.stringify(falseUser));
                expect(response.statusCode).toBe(400);
                expect(response.body.status).toBe('error');
            });
        });


    });

    describe('POST /api/login', () =>{
        test('Wrong password', async () => {
            const response = await request(app).post('/api/login').set('Content-Type', "application/json").send(JSON.stringify({
                username: testUser.username,
                password: "wrongPasswordlelelelle"
            }));

            expect(response.body.status).toBe('error');
        })

        test('No user', async () => {
            const response = await request(app).post('/api/login').set('Content-Type', "application/json").send(JSON.stringify({
                username: "Idontexist",
                password: "wrongPasswordlelelelle"
            }));

            expect(response.body.status).toBe('error');
        })

        test('Login (token request)', async () => {
            const response = await request(app).post('/api/login').set('Content-Type', "application/json").send(JSON.stringify({
                username: testUser.username,
                password: testUser.password
            }));

            token = response.body.data;
            expect(response.body.header).toBe('Authorization');
            expect(response.body.data).not.toBe(undefined);
            expect(response.body.data).not.toBe(null);
            expect(response.body.status).toBe('ok');
        });
    });

    describe('POST /api/logout', () => {

        test('Invalid token', async () => {
            // Test logout post request by sending cookie
            const response = await request(app).post('/api/logout').set('Cookie', `token=1`);
            expect(response.status).toBe(403);
        });

        test('Valid token', async () => {
            const response = await request(app).post('/api/logout').set('Cookie', `token=${token}`);
            expect(response.body.status).toBe('ok');
        });

    });


    afterAll(async () => {
        /*
            const users = await User.find({});
            users.forEach(user => {
                console.log(user.username);
            });
        */

        await User.deleteMany({});
        await mongoose.connection.close();
    });
});

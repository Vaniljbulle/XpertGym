request = require('supertest');
const express = require('express');
const htmlRoutes = require('../server/api/api_html.js');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(htmlRoutes);

function expected(response, type, code, file) {
    let expected;
    try {
        expected = fs.readFileSync(file, 'utf8');
    } catch (err) {
        console.error(err);
    }

    expect(response.type).toBe(type);
    expect(response.text).toBe(expected);
    expect(response.statusCode).toBe(code);
}

describe('api_html', () => {

    /* INDEX GET TESTS */

    describe('index.html', () => {
        test('responds to /', async () => {
            expected(
                await request(app).get('/'),
                'text/html',
                200,
                './frontend/index.html');
        });

        test('responds to /index', async () => {
            expected(
                await request(app).get('/index'),
                'text/html',
                200,
                './frontend/index.html');
        });

        test('responds to /index.html', async () => {
            expected(
                await request(app).get('/index.html'),
                'text/html',
                200,
                './frontend/index.html');
        });

        test('responds to /home', async () => {
            expected(
                await request(app).get('/home'),
                'text/html',
                200,
                './frontend/index.html');
        });

        test('responds to /home.html', async () => {
            expected(
                await request(app).get('/home.html'),
                'text/html',
                200,
                './frontend/index.html');
        });

        test('responds to /iNdEx', async () => {
            expected(
                await request(app).get('/iNdEx'),
                'text/html',
                200,
                './frontend/index.html');
        });
    });

    /* CSS GET TESTS */

    describe('style.css', () => {
        test('responds to /style.css', async () => {
            expected(
                await request(app).get('/style.css'),
                'text/css',
                200,
                './frontend/style.css');
        });
    });

    /* LOGIN GET TESTS */

    describe('login.html', () => {
        test('responds to /login', async () => {
            expected(
                await request(app).get('/login'),
                'text/html',
                200,
                './frontend/login.html');
        });

        test('responds to /login.html', async () => {
            expected(
                await request(app).get('/login.html'),
                'text/html',
                200,
                './frontend/login.html');
        });
    });

    /* SIGN UP / REGISTER GET TESTS */

    describe('signup.html', () => {
        test('responds to /register', async () => {
            expected(
                await request(app).get('/register'),
                'text/html',
                200,
                './frontend/signup.html');
        });

        test('responds to /register.html', async () => {
            expected(
                await request(app).get('/register.html'),
                'text/html',
                200,
                './frontend/signup.html');
        });

        test('responds to /signup', async () => {
            expected(
                await request(app).get('/signup'),
                'text/html',
                200,
                './frontend/signup.html');
        });

        test('responds to /signup.html', async () => {
            expected(
                await request(app).get('/signup.html'),
                'text/html',
                200,
                './frontend/signup.html');
        });
    });

    /* SCRIPTS GET TESTS */

    describe('login/register scripts', () => {
        test('responds to /login.js', async () => {
            expected(
                await request(app).get('/login.js'),
                'application/javascript',
                200,
                './server/auth/login.js');
        });
        test('responds to /register.js', async () => {
            expected(
                await request(app).get('/register.js'),
                'application/javascript',
                200,
                './server/auth/register.js');
        });

    });

});
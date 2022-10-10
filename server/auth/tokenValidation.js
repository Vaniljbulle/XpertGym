const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../database/user');
const {generateAccessToken} = require("./token");

const ACCESS_TOKEN_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const REFRESH_TOKEN_SECRET = 'qh987p3hg789ytg832qyt98@#*(&@*!^#&@347n347n34734n6w4tw908y5VFW978G9UWH2V3HYT9823TY'

function validateAccessToken(req, res, next) {
    const cookieHeader = req.get('cookie')
    console.log(req.headers);

    const accessToken = getToken(cookieHeader, 'accessToken=');

    if (accessToken) {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(403).json({status: 'AccessTokenExpired'});
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(403).send('Forbidden');
    }
}

function validateRefreshToken(req, res, next) {
    const cookieHeader = req.get('cookie')
    console.log(req.headers);

    const refreshToken = getToken(cookieHeader, 'refreshToken=');
    if (refreshToken) {
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, username) => {
            if (err) {
                return res.status(403).json({status: 'Forbidden - Token invalid'});
            }

            const user = await User.findOne({username}).lean();
            if (!user) {
                return res.status(403).json({status: 'Forbidden - User not found'});
            }

            if (user.refreshTokens.includes(refreshToken)) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({status: 'Forbidden - Log in again'});
            }
        });
    } else {
        return res.status(403).send('Forbidden - No token');
    }
}

function getToken(cookieHeader, tokenName) {
    let token = null;

    if (cookieHeader) {
        const items = cookieHeader.split(' ');

        for (let i = 0; i < items.length; i++) {
            if (items[i].startsWith(tokenName)) {
                token = items[i].split('=')[1];
                break;
            }
        }
    }

    return token;
}

module.exports = {
    verifyAccessToken: validateAccessToken,
    verifyRefreshToken: validateRefreshToken
}
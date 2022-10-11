const jwt = require('jsonwebtoken');
const User = require('../database/user');


const ACCESS_TOKEN_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const REFRESH_TOKEN_SECRET = 'qh987p3hg789ytg832qyt98@#*(&@*!^#&@347n347n34734n6w4tw908y5VFW978G9UWH2V3HYT9823TY'
const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '12h';

function validateAccessToken(req, res, next) {
    const cookieHeader = req.get('cookie')
    const accessToken = getToken(cookieHeader, 'accessToken=');

    if (accessToken) {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err instanceof jwt.TokenExpiredError) {
                return validateRefreshToken(req, res, next);
            }
            else if (err) {
                return res.status(403).json({status: 'Forbidden - Token invalid'});
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(403).send('Forbidden');
    }
}

function validateRefreshToken(req, res, next) {
    const cookieHeader = req.get('cookie');
    const refreshToken = getToken(cookieHeader, 'refreshToken=');

    console.log("GOT ALL THE WAY HERE");
    if (refreshToken) {
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async(err, username) => {
            if (err) {
                return res.status(403).redirect('/login');
            }
            const user = await User.findOne(username).lean();
            if (!user || user.refreshTokens === undefined) {
                return res.status(403).json({status: 'Forbidden - User not found'});
            }
            if (user.refreshTokens.includes(refreshToken)) {
                const tokenUser = {id: user._id, username: user.username};
                const accessToken = generateAccessToken(tokenUser);
                res.cookie('accessToken', accessToken, {httpOnly: true});
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

function generateAccessToken (user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION});
}

function generateRefreshToken (user) {
    return jwt.sign({username: user.username}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRATION});
}

function getToken(cookieHeader, tokenName) {
    let token = null;

    if (cookieHeader) {
        const items = cookieHeader.split(' ');

        for (let i = 0; i < items.length; i++) {
            if (items[i].startsWith(tokenName)) {
                token = items[i].split('=')[1];
                if (token.charAt(token.length - 1) === ';')
                    token = token.substring(0, token.length - 1);
                break;
            }
        }
    }

    return token;
}

module.exports = {
    verifyToken : validateAccessToken,
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken
}
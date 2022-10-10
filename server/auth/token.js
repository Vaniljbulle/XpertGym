const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const REFRESH_TOKEN_SECRET = 'qh987p3hg789ytg832qyt98@#*(&@*!^#&@347n347n34734n6w4tw908y5VFW978G9UWH2V3HYT9823TY'

let refreshTokens = []; // todo: store in database

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    },
    generateRefreshToken: (user) => {
        return jwt.sign(user.username, REFRESH_TOKEN_SECRET);
    }
}
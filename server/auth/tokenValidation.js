const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

function validateToken(req) {
    const authHeader = req.get('Authorization')
    let validated = false;
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    console.log("Token invalid");
                }
                req.user = user;
                console.log(user);
                console.log("Token verified");
                validated = true;
            })
        } else {
            console.log("No token");
        }
    } else {
        console.log("No auth header");
    }
    return validated;
}

function validateTokenRemote(req, res, next) {
    const authHeader = req.get('Authorization')
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    console.log("Token invalid");
                    //return res.sendStatus(403);
                    return;
                }
                req.user = user;
                console.log(user);
                console.log("Token verified");
                next();
            })
        } else {
            console.log("No token");
            res.sendStatus(401);
        }
    } else {
        console.log("No auth header");
        //console.log(req.headers);
        //console.log(req.body);
        res.sendStatus(401);
    }
}

module.exports = validateToken;
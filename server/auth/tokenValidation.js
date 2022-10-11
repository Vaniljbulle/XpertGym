const jwt = require('jsonwebtoken');
//const res = require("express/lib/response");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


function validateToken(req, res, next) {
    const authHeader = req.get('cookie')
    console.log(req.headers);
    //console.log(authHeader);

    if (authHeader) {
        const items = authHeader.split(' ');
        let tokenExists = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].startsWith("token=")) {
                tokenExists = true;
                const token = items[i].split('=')[1];
                jwt.verify(token, JWT_SECRET, (err, user) => {
                    if (err) {
                        //console.log(err);
                        console.log("Token invalid");
                        return res.status(403).sendFile('login.html' , {root: './frontend'});
                    }

                    req.user = user;
                    console.log(user);
                    console.log("Token verified");
                    next();
                })
            }
        }
        if(!tokenExists) {
            return res.status(403).sendFile('login.html' , {root: './frontend'});
        }
    } else {
        console.log("No auth header");
        return res.status(403).sendFile('login.html' , {root: './frontend'});
    }
}

module.exports = validateToken;
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (tokenHeader) {
        const tokenStrings = tokenHeader.split(" ");
        
            jwt.verify(tokenHeader, secrets.jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({message: 'verifying token is coming up error wise', error: err});
                } else {
                    req.decodedJwt = decodedToken;
                    next();
                }
            });
    } else {
        res.status(401).json({message: 'missing Auth header'});
    }
};
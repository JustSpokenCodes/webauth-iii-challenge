const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send("It's Alive!!");
});

server.get('/token', (req, res) => {
    
    const payload = {
        subject: 'user',
        username: 'jstevens',
        favoriteGame: 'gears'
    };
    const secret = 'whatitdobaybee';
    const options = {
        expiresIn: '1h'
    };

    const token = jwt.sign(payload, secret, options);
    console.log(token);

    res.json(token);
})

module.exports = server;
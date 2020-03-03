require('dotenv').config();

const session = require('express-session');
const store = require('session-file-store')(session);

module.exports = () => {
    return session({
        name: '$sid',
        secret: process.env.session_secret,
        cookie_secret: process.env.cookie_secret,
        resave: false,
        saveUninitialized: false,
        store: new store({
            path: __dirname + '/../sessions'
        })
    });
}

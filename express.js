require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cookies = require('cookie-parser');

const session = require('./middlewares/session');

const app = express();
app.use(morgan('combined'));
app.use(cookies(process.env.cookie_secret));
app.use(session());

module.exports = app;
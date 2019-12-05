const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const login = require('./loginroutes')
const router = express.Router();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    next();
});
app.route('/api/user').get(login.allUsers);
app.route('/api/register').post(login.register);
app.route('/api/login').post(login.login);
app.listen(8000, () => {
    console.log('Server started!')
});

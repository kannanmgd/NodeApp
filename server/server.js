const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

app.listen(8000, () => {
    console.log('Server started!')
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Database connected!')
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
});

app.route('/api/users').get((req, res) => {
    con.query('SELECT * FROM customers', (err, result) => {
        if (err) {
            res.status(400).send('Error in getting da')
        } else {
            res.send(result);
        }
    })
})
const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const encrypt = require('password-hash');
const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

con.connect(function (err) {
    if (err) {
        console.log('login db error ' + err);
    } else {
        console.log('db connected');
    }
});

exports.register = (req, res) => {
    const password = encrypt.generate(req.body.password);
    var users = [
        [req.body.name, password, req.body.email]
    ]
    const sql = "INSERT INTO customers(username, password, email) VALUES ?";
    con.query(sql, [users], function (err, results, fields) {
        if (err) {
            console.log('error occured', err);
            res.status(400).send('error storing datas')
        } else {
            console.log('the solution is', results);
            res.status(200).send({
                val: 'Success'
            });
        }
    });
}
exports.login = (req, res) => {
    const uName = req.body.userName
    con.query('SELECT * FROM customers WHERE username = ?', [uName], (err, results, fields) => {
        if (err) {
            console.log('error occured', err);
            res.send({
                "code":400,
                "failed":"error ocurred"
              })
        } else {
            if (results.length > 0) {
                const compare = encrypt.verify(req.body.password, results[0].password); // returns true or false
                if (compare) {
                    res.status(200).send({
                        val: 'success'
                    });
                } else {
                    res.status(200).send({
                        val: 'username password mismatch'
                    });
                }
            } else {
                res.status(200).send({
                    val: 'username does not exist'
                });
            }
        }
    });
}

exports.allUsers = (req, res) => {
    con.query('SELECT * FROM customers', (err, result) => {
        if (err) {
            res.status(400).send('Error in getting data')
        } else {
            res.send(result);
        }
    })
}
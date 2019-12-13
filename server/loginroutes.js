const mysql = require('mysql');
const encrypt = require('password-hash');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

// Global variables
let authCustomerId;

con.connect(function (err) {
    if (err) {
        console.log('login db error ' + err);
    } else {
        console.log('db connected in login module');
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
    const uName = req.body.userName;
    con.query('SELECT * FROM customers WHERE username = ?', [uName], (err, results, fields) => {
        if (err) {
            console.log('error occured', err);
            res.send({
                "code":400,
                "failed":"error ocurred"
              })
        } else {
            if (results.length > 0) {
                authCustomerId = results[0].id ? results[0].id : '';
                const compare = encrypt.verify(req.body.passWord, results[0].password); // returns true or false
                if (compare) {
                    var token = jwt.sign({userID: results[0].id}, 'my-seceret', {expiresIn: '1d'})
                    res.status(200).send({
                        val: 'success',
                        custId: results[0].id,
                        token
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

exports.authUser = (req, res) => {
    var q = "SELECT employee_Id, employee_name, employee_email, employee_age, employee_type, employee_dpt, CONCAT(address_1, ', ',address_2, ', ',city, ', ',state,', ',pincode) AS address FROM employees WHERE active_status = 'yes'";
    con.query(q, (err, result) => {
        if (err) {
            console.log(result);
            res.status(400).send('Error in getting data')
        } else {
            res.send(result);
        }
    });
}
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login = require('./loginroutes')
const employee = require('./employee');


app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    next();
});

app.route('/api/user').get(login.authUser);
app.route('/api/register').post(login.register);
app.route('/api/login').post(login.login);
app.route('/api/addEmployee').post(employee.addEmployee)
app.route('/api/deleteemp').post(employee.deleteEmp)
app.listen(8000, () => {
    console.log('Server started!')
});

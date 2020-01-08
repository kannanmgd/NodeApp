const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login = require('./loginroutes')
const employee = require('./employee');
const expressJwt = require('express-jwt');


app.use(bodyParser.json());
app.use(expressJwt({secret: 'my-seceret'}).unless({path: ['/api/login', '/api/register']}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.route('/api/user').get(login.authUser);
app.route('/api/register').post(login.register);
app.route('/api/login').post(login.login);
app.route('/api/addEmployee').post(employee.addEmployee);
app.route('/api/deleteemp').post(employee.deleteEmp);
app.route('/api/editEmployee').post(employee.editEmployee);
app.listen(8000, () => {
    console.log('Server started @ "port = 8000" !');
});

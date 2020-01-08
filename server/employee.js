const mysql = require('mysql');
const login = require('./loginroutes')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('employee module connected');
});

exports.addEmployee = (req, res) => {
    const reqBody = req.body;
    const empValues = [
        [reqBody.name, reqBody.email, reqBody.age, reqBody.role, reqBody.department, 
        reqBody.address_1, reqBody.address_2, reqBody.city, reqBody.state, reqBody.pincode, 'yes']
    ];
    const checkExisting = 'SELECT * FROM employees WHERE employee_email = ?';
    console.log(reqBody.email)
    con.query(checkExisting, [reqBody.email], function(err, results, fields){
        if(err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                res.send({
                    val: 'fail',
                    result: 'User alreday Exist'
                });
            } else {
                addEmp = `INSERT INTO employees(employee_name, employee_email, employee_age, employee_type, 
                        employee_dpt, address_1, address_2, city, state, pincode, active_status) VALUES ?`;
                con.query(addEmp, [empValues], function(err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(400).send('error storing datas');
                    } else {
                        res.status(200).
                        send({
                            val: 'success',
                            result: 'Employee added sucess'
                        });
                    }
                });
            }
        }
    });
}

exports.deleteEmp = (req, res) => {
    deleteQuery = "UPDATE employees SET active_status = 'no' WHERE employee_Id = ?";
    con.query(deleteQuery, [req.body.employee_Id], function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            var q = "SELECT employee_Id, employee_name, employee_email, employee_age, employee_type, employee_dpt, CONCAT(address_1, ', ',address_2, ', ',city, ', ',state,', ',pincode) AS address FROM employees WHERE active_status = 'yes'";
            con.query(q, (err, result) => {
                if (err) {
                    console.log(result);
                    res.status(400).send('Error in getting data');
                } else {
                    res.send(result);
                }
            });
        }
    });
}

exports.editEmployee = (req, res) => {
    const empId = req.body.id;
    getEmp = "SELECT * FROM employees WHERE employee_Id = ?"
    con.query(getEmp, [empId], (err, results, fields) => {
        if (err) {
            res.status(400).send({
                'error': 'error getting data'
            })
        } else {
            res.status(200).send(
                results
            );
        }
    })
}

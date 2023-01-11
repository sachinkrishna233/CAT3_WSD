const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = 3022
const hostname = 'localhost'
const db = 'infosys'
const tbl = 'spring'

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: db
});

con.connect((err) => {
    if (err)
        throw (err)
    console.log("MySql Connected")
})

app.get('/', (req, res) => {
    con.query("SELECT * from " + tbl, function (err, result) {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/add', (req,res) => {
    var resp = req.body
    console.log(resp['id'])
    con.query("INSERT into " + tbl + " VALUES (" + resp['emp_id'] + ",\'" + resp['emp_name'] + "\',\'" + resp['emp_designation'] + "\',\'" + resp['emp_department'] + "\'," + resp['emp_salary'] + ",\'" + resp['emp_location'] + "\')", function (err, result) {
        if (err) throw err;
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})
   
app.post('/update', (req,res) => {
    var resp = req.body
    con.query("UPDATE " + tbl + " SET emp_location= \'" + resp['emp_location'] + "\' where emp_id = " + resp['emp_id'], function (err, result) {
        if (err) throw err;
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/search', (req, res) => {
    var getEmp = req.body
    con.query("SELECT * from " + tbl + " where emp_department = \'" + getEmp['emp_department'] + "\'" + "AND emp_salary > " + getEmp['emp_salary'], function (err, result) {
        if (err) throw err;
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/delete', (req,res) => {
    var delId = req.body['delId'] 
    
    con.query("DELETE from " + tbl + " where emp_id = " + delId, function (err, result) {
        if (err) throw err;
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.get('/*', (req, res) => {
    res.status(404)
    res.end("<h1>404 Error</h1><br><p>Not Found!</p>")
})

app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`)
})
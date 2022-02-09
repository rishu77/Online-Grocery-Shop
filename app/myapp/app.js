const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));


const oracledb = require('oracledb');
const config = {
    user: 'app',
    password: '12345',
    connectString: 'localhost:1521/xe'
}
// ...
var userService = require('./Services/EmployeeService')
app.use(userService)

//const { Employee } = require('./models/Employee.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));


var loginService = require('./Services/RegisterService')
app.use(loginService)


var productService = require('./Services/ProductService')
app.use(productService)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

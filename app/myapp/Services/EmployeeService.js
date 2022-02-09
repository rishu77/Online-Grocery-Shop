const express = require('express')
var router = express.Router();
const oracledb = require('oracledb');
oracledb.autoCommit = true;
const connectionProperties = {
  user: 'app',
  password: '12345',
  connectString: 'localhost:1521/xe'
}
router.use(function (request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  console.log("BODY:" + JSON.stringify(request.body));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
* GET / 
* Returns a list of employees 
*/
router.route('/employees/').get(function (request, response) {
  console.log("GET EMPLOYEES");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }
    console.log("After connection");
    connection.execute("SELECT * FROM employee", {},
      { outFormat: oracledb.OBJECT },
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error getting data from DB");
          doRelease(connection);
          return;
        }
        console.log("RESULTSET:" + JSON.stringify(result));
        var employees = [];
        result.rows.forEach(function (element) {
          employees.push({
            empid: element.EMPID, firstName: element.EMPNAME,
            salary: element.SALARY, project :element.PROJECTID,dept: element.DEPTID,address: element.ADDRESSID
          });
        }, this);
        response.json(employees);
        doRelease(connection);
      });
  });
});
function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}

/**
 * POST / 
 * Saves a new employee 
 */
router.route('/employees/').post(function (request, response) {
  console.log("POST EMPLOYEE:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;


    connection.execute("INSERT INTO EMPLOYEE (EMPID, EMPNAME,SALARY, PROJECTID,DEPTID,ADDRESSID)" +
      "VALUES(EMPLOYEE_SEQ.NEXTVAL, :empname,:salary,:project,:department,:address)",
      [body.EMPNAME, body.SALARY, body.PROJECTID,body.DEPTID,body.ADDRESSID],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error saving employee to DB");
          doRelease(connection);
          return;
        }
        connection.execute("commit")
        response.status(200).send("Employee added.");
        doRelease(connection);
      });
  });
});



/**
 * PUT / 
 * Update a employee 
 */
 router.route('/employees/:id').put(function (request, response) {
  console.log("PUT EMPLOYEE:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;

    connection.execute("UPDATE EMPLOYEE SET EMPNAME=:EMPNAME, SALARY=:SALARY, PROJECTID=:PROJECTID, DEPTID=:DEPTID,"+
    " ADDRESSID=:ADDRESSID  WHERE EMPID=:id",
      [body.EMPNAME, body.SALARY,body.PROJECTID, body.DEPTID, body.ADDRESSID,  id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error updating employee to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});
/**
 * DELETE / 
 * Delete a employee 
 */
 router.route('/employees/:id').delete(function (request, response) {
  console.log("DELETE EMPLOYEE ID:"+request.params.id);
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;
    connection.execute("DELETE FROM EMPLOYEE WHERE EMPID = :id",
      [id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error deleting employee to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});

module.exports = router
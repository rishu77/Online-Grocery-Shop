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
router.route('/register/').get(function (request, response) {
  console.log("GET EMPLOYEES");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }
    console.log("After connection");
    connection.execute("SELECT * FROM detail", {},
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
            email: element.EMAIL, name: element.NAME,
            firstname: element.FIRSTNAME, lastname :element.LASTNAME,password: element.PASSWORD
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
 router.route('/register/').post(function (request, response) {
    console.log("POST USER:");
    oracledb.getConnection(connectionProperties, function (err, connection) {
      if (err) {
        console.error(err.message);
        response.status(500).send("Error connecting to DB");
        return;
      }
  
      var body = request.body;
  
  
      connection.execute("INSERT INTO DETAIL (EMAIL, NAME,FIRSTNAME, LASTNAME,PASSWORD)" +
        "VALUES( :EMAIL,:NAME,:FIRSTNAME,:LASTNAME,:PASSWORD)",
        [body.EMAIL, body.NAME, body.FIRSTNAME,body.LASTNAME,body.PASSWORD],
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
 router.route('/register/:email').put(function (request, response) {
    console.log("PUT EMPLOYEE:");
    oracledb.getConnection(connectionProperties, function (err, connection) {
      if (err) {
        console.error(err.message);
        response.status(500).send("Error connecting to DB");
        return;
      }
  
      var body = request.body;
      var email = request.params.email;
  
      connection.execute("UPDATE DETAIL SET NAME=:NAME, FIRSTNAME=:FIRSTNAME, LASTNAME=:LASTNAME, PASSWORD=:PASSWORD",
     
        [body.NAME,body.FIRSTNAME, body.LASTNAME, body.PASSWORD],
        function (err, result) {
          if (err) {
            console.error(err.message);
            response.status(500).send("Error updating user to DB");
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
   router.route('/employees/:email').delete(function (request, response) {
    console.log("DELETE USER:"+request.params.email);
    oracledb.getConnection(connectionProperties, function (err, connection) {
      if (err) {
        console.error(err.message);
        response.status(500).send("Error connecting to DB");
        return;
      }
  
      var body = request.body;
      var email = request.params.email;
      connection.execute("DELETE FROM DEATIL WHERE EMAIL = :email",
        [email],
        function (err, result) {
          if (err) {
            console.error(err.message);
            response.status(500).send("Error deleting user to DB");
            doRelease(connection);
            return;
          }
          response.end();
          doRelease(connection);
        });
    });
  });




/**
 * POST / 
 *  employee login 
 */
 router.route('/login/').post(function (request, response) {
  console.log("POST login:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    console.log(body);
    console.log("After connection");
    connection.execute("SELECT * FROM DETAIL WHERE email=:EMAIL ", [body.EMAIL],
      { outFormat: oracledb.OBJECT },
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error getting data from DB");
          doRelease(connection);
          return;
        }
        // console.log("RESULTSET:" + JSON.stringify(result));
        console.log("User Password:"+body.PASSWORD )
        var rowsProcessed = result.rows.length;

       // console.log("Fetched rows:" + rowsProcessed)
        //console.log("Fetched row data:" + JSON.stringify(result.rows[0]))

        if (rowsProcessed > 0) {
          var element = result.rows[0]
          var user = {
            email: element.EMAIL, name: element.NAME,
            firstname: element.FIRSTNAME, lastname :element.LASTNAME,password: element.PASSWORD
          };

        }

        // logic for auth

        if (rowsProcessed == 0) {
          response.status(400).send("User not found !")
        }
        else if (user.password == body.PASSWORD) {
          user.password = "";
          response.status(200).send(user)
        }
        else {
          response.status(400).send("Wrong user credentials ! ")
        }

        doRelease(connection);

      });
  });
})


module.exports=router
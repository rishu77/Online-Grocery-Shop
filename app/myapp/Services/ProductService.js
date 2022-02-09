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
* Returns a list of products 
*/
router.route('/products/').get(function (request, response) {
  console.log("GET ALL PRODUCTS");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }
    console.log("After connection");
    connection.execute("SELECT * FROM PRODUCTS", {},
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
            id: element.ID, NAME: element.NAME,
            DESCRIPTION: element.DESCRIPTION, PRICE :element.PRICE,DISCOUNT: element.DISCOUNT,QUANTITY: element.QUANTITY
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
 * Saves a new product 
 */
router.route('/products/').post(function (request, response) {
  console.log("POST PRODUCT:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;


    connection.execute("INSERT INTO PRODUCTS (ID, NAME,DESCRIPTION, PRICE,DISCOUNT,QUANTITY)" +
      "VALUES(PRODUCTS_SEQ.NEXTVAL, :name,:description,:price,:discount,:quantity)",
      [body.NAME, body.DESCRIPTION, body.PRICE,body.DISCOUNT,body.QUANTITY],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error saving product to DB");
          doRelease(connection);
          return;
        }
        connection.execute("commit")
        response.status(200).send("Product added.");
        doRelease(connection);
      });
  });
});

/**
 * PUT / 
 * Update a product 
 */
 router.route('/products/:id').put(function (request, response) {
  console.log("PUT PRODUCTS:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;

    connection.execute("UPDATE PRODUCTS SET NAME=:NAME, DESCRIPTION=:DESCRIPTION, PRICE=:PRICE, DISCOUNT=:DISCOUNT,"+
                       " QUANTITY=:QUANTITY WHERE ID=:id",
      [body.NAME, body.DESCRIPTION,body.PRICE, body.DISCOUNT, body.QUANTITY,id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error updating product to DB");
          doRelease(connection);
          return;
        }
      
        response.status(200).send("Product Updated.");
        doRelease(connection);
      });
  });
});


/**
 * DELETE / 
 * Delete a product 
 */
 router.route('/products/:id').delete(function (request, response) {
  console.log("DELETE PRODUCT ID:"+request.params.id);
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;
    connection.execute("DELETE FROM PRODUCTS WHERE ID = :id",
      [id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error deleting products to DB");
          doRelease(connection);
          return;
        }
        response.status(200).send("Product Deleted.");
        doRelease(connection);
      });
  });
});



/**
 * Update POST / 
 * Update a new product 
 */
 router.route('/products/update/').post(function (request, response) {
  console.log("POST PRODUCT:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
 console.log(body);
    console.log("After connection");

    connection.execute("UPDATE PRODUCTS SET NAME=:NAME, DESCRIPTION=:DESCRIPTION, PRICE=:PRICE, DISCOUNT=:DISCOUNT,"+
    " QUANTITY=:QUANTITY WHERE ID=:id",
[body.NAME, body.DESCRIPTION,body.PRICE, body.DISCOUNT, body.QUANTITY,body.id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error saving product to DB");
          doRelease(connection);
          return;
        }
        connection.execute("commit")
        response.status(200).send("Product Updated.");
        doRelease(connection);
      });
  });
});

       

module.exports = router
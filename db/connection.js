const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "kawsarbyherself",
    // Your password
    password: "password",
    database: "employeeTracker",
  });

  connection.connect();


connection.query = util.promisify(connection.query);

module.exports = connection;
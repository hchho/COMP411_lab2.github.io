const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "artists",
  password: ""
});

module.exports = pool.promise();

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "comp4711",
  port: 3306,
  password: "password"
});

module.exports = pool.promise();

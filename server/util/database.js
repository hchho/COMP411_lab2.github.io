const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  database: process.env.DATABASE || "comp4711",
  port: 3306,
  password: process.env.PASSWORD || "password"
});

module.exports = pool.promise();

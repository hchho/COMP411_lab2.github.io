const mysql = require("mysql2");

const connection = mysql.connect({
  host: "localhost",
  user: "root",
  database: "comp4711",
  port: 3306,
  password: "password"
});

connection.connect(err => {
    if (err) throw err
    const sql = "CREATE TABLE artists (" + 
    "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, " + 
    "name TEXT NOT NULL, " + 
    "about varchar(300) NOT NULL, " + 
    "img TEXT NOT NULL" + 
    ")"
    connection.query(sql, (err, result) => {
        if (err) throw err
        console.log("Table created")
    })
})
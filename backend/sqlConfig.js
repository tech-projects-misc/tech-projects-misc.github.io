const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
});

connection.connect((err) => {
    if (err)
        console.log(err);
    else
        console.log("DB Connection successful");
});

module.exports = connection;
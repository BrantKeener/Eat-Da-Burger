
// This module houses the code needed to connect Node.js to our DB
// The password will have to be here whenever you push up the DB
// Our connection is working!

const mysql = require('mysql');
const path = require('path');

// A connection variable to be changed depending on whether local or JawsDB
let connection;

// Added a .env to protect the db password
const env = require('dotenv').config({ path: path.join(__dirname, '../.env')});

// Jaws.DB provisions
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASS,
        database: 'burgers_db'
    });
};

// Connect to our DB
connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`)
});

// Exporting to orm.js
module.exports = connection;
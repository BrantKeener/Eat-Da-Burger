
// This module houses the code needed to connect Node.js to our DB
// The password will have to be here whenever you push up the DB
// Our connection is working!

const mysql = require('mysql');
const path = require('path');

// Added a .env to protect the db password
const env = require('dotenv').config({ path: path.join(__dirname, '../.env')});

// Create the connection variable
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'burgers_db'
});

// Connect to our DB
connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`)
});

// Exporting to orm.js
module.exports = connection;
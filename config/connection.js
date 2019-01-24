
// This module houses the code needed to connect Node.js to our DB
// The password will have to be here whenever you push up the DB
// Our connection is working!

const mysql = require('mysql');
const path = require('path');
const env = require('dotenv').config({ path: path.join(__dirname, '../.env')});

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'burgers_db'
});

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`)
});

module.exports = connection;
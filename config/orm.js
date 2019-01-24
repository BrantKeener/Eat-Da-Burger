
// Build our ORM!
// selectAll = works!; insertOne = works!; updateOne = works!;

const connection = require('./connection');

// Select all burgers from the table
selectAll = (table, cb) => {
    const queryString = `SELECT * FROM ??;`
    connection.query(queryString, table, (err, res) => {
        if(err) throw err;
        cb(res)
    });
};

// Insert a new burger into the table
insertOne = (table, columns, name, status, cb) => {
    let queryString = `INSERT INTO ?? (??)`
    queryString += `VALUES(?, ?);`
    connection.query(queryString, [table, [columns], name, status], (err, res) => {
        if(err) throw err;
        cb('New burger successfully added!');
    });
};

// Update the devoured status of a burger
updateOne = (table, column, id, name, status, cb) => {
    const queryString = `UPDATE ?? SET ?? = ? WHERE id = ?;`
    connection.query(queryString, [table, column, status, id], (err, res) => {
        if(err) throw err;
        cb(`${name} has been devoured!`);
    });
};

module.exports = {selectAll, insertOne, updateOne};
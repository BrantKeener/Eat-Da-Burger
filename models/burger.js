
// This will house a js file that communicates with the ORM to do specific burger-related inquiries.

// Require the ORM file
const orm = require('../config/orm');

// An object that is exportable, and runs the different ORM features with burger-related inputs.
const burger = {
    all: (cb) => {
        orm.selectAll('burgers', (res) => {
            cb(res);
        });
    },
    create: (name, cb) => {
        orm.insertOne('burgers', ['burger_name', 'devoured'], name, 0, (res) =>{
            cb(res);
        });
    },
    update: (id, status, cb) => {
        orm.updateOne('burgers', 'devoured', id, status, (res) => {
            cb(res);
        });
    },
};

// Exporting to burgers_controllers.js
module.exports = burger;
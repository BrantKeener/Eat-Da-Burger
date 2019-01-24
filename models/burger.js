
// This will house a js file that communicates with the ORM to do specific burger-related inquiries.

const orm = require('../config/orm');

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
    update: (id, name, cb) => {
        orm.updateOne('burgers', 'devoured', id, name, (res) => {
            cb(res);
        });
    },
};

module.exports = burger;
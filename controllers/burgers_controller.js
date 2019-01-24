
// The controller acts as the router of our app.

const burger = require('../models/burger');
const express = require('express');

// express.Router() allows us to make the route controller a seperate app incresing modularity
const router = express.Router();

// Get request for all burger-related data
router.get('/', (req, res) => {
    burger.all((data) => {
        const hasObject = {
            burgers: data
        };
        console.log(hasObject);
        res.render('index', hasObject);
    });
});

// Add a new burger functionality
router.post('/api/burgers', (req, res) => {
    burger.create(req.body.name, (data) => {
        res.json({id: data.insertId});
    });
});

// Update an already known burger
router.put('/api/burgers/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    burger.update(id, status, (data) => {
        if(data.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

// Exporting to server
module.exports = router;
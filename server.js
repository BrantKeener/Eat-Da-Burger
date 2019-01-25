
// Build the server functionality

// Server variables setup
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const exphbs = require('express-handlebars');

// Hosting for static pages
app.use('/public', express.static('./public'));

// Our parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Utilize the routes supplied by burgers_controller.js
const routes = require('./controllers/burgers_controller.js')
app.use(routes);

// Server listen
app.listen(PORT, () => {
    console.log('Server listening on: PORT');
});


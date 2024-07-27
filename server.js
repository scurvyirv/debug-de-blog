//import packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//connect to routes
const routes = require('./controllers');

//connect to database
const sequelize = require('./config/connection');

//connect to helpers
const helpers = require('./utils/helpers');

//invoke express application
const app = express();

//define PORT variable
const PORT = process.env.PORT || 3001;

//accesses environmental variables
require('dotenv').config()

//create session configuration
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//use session middleware
app.use(session(sess));

//invoke helper functions
const hbs = exphbs.create({ helpers });

//handlebars is the engine that looks for a views and layout folder
app.engine('handlebars', hbs.engine);

//front-end rendered with handlebars
app.set('view engine', 'handlebars');

//customize express to use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//provide middleware for express to serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes from controllers
app.use(routes);

//start up the server and sync database
sequelize.sync({ force: false }).then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
//force false creates persistent data
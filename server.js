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

//create session
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//invoke helper functions
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//customize express to use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//start up the server
sequelize.sync({ force: false }).then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
//force false creates persistent data
// Dependencies
const path = require("path");
const express = require("express");

// all routes as defined in the routes folder
const routes = require("./routes");

const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const session = require("express-session");

// initialize the server
const app = express();

// define the port for the server
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// handlebar helpers
const helpers = require("./utils/helpers");

// initialize handlebars for html templates
const hbs = exphbs.create({ helpers });

require("dotenv").config();

// initialize sessions
const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: { maxAge: 1800000 },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});




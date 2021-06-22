// Dependencies
const path = require("path");
const express = require("express");

// all routes as defined in the controllers folder
const routes = require("./controllers/");

const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequilize")(session.Store);

// handlebar helpers
const helpers = require("./utils/helpers");

// initialize handlebars for html templates
const hbs = exphbs.create({ helpers });

require("dotenv").config();

// initialize sessions
const session = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: { maxAge: 72000000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true })); // turn on HTML Forms
app.use(express.json()); // turn on JSON
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { httpOnly: true,
  //  secure: true,
  //  maxAge: new Date ( Date.now() + (3600000))
  },
}))

app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
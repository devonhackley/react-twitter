'use strict';

require('dotenv').load();

const express = require('express');
// const React = require('react');
// const ReactDomServer = require('react-dom/server');
// const ReactRouter = require('react-router');
// const ServerRouter = ReactRouter.ServerRouter;
// const _ = require('lodash');
// const fs = require('fs');
// const baseTemplate = fs.readFileSync('./index.html')
// const template = _.template(baseTemplate);
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const router = express.Router();
const PORT = process.env.PORT ||3000;
const App = require('./app/entry.js');


const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;



app.use(cors());
app.use('/public', express.static('./public'));


app.use((err,req,res,next) => {
  console.err(err.message);
  if(err.status){
    return res.sendStatus(err.status);
  }
  res.sendStatus(500);
  next();
});

app.get('*', (req,res) => res.redirect('/'));


app.use(session({ secret: 'devisthename', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())

require('./configs/passport-config.js')(passport);
require('./routes/routes.js')(router,passport);
app.use(router);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT)
})

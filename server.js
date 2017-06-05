'use strict';

const express = require('express');
const cors = require('cors');
const twitConfig = require('./config.js');
const passport = require('passport');
const session = require('express-session');
const router = express.Router();
const PORT = process.env.PORT || 3000;


const app = express();




app.use(cors());
app.use(express.static(`${__dirname}/../build`));

require('./routes/routes.js')(router);
app.use(router);
app.use((err,req,res,next) => {
  console.err(err.message);
  if(err.status){
    return res.sendStatus(err.status);
  }
  res.sendStatus(500);
  next();
});

app.get('*', (req,res) => res.redirect('/'));

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT)
})

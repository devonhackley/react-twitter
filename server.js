'use strict';

const express = require('express');
const cors = require('cors');
const Twitter = require('twitter');
const PORT = process.env.PORT || 3000;


const app = express();
const client = new Twitter({
  consumer_key:process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
  access_token_key:process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.use(cors());
app.use(express.static(`${__dirname}/../build`));
app.get('*', (req,res) => res.redirect('/'))
app.use((err,req,res,next) => {
  console.err(err.message);
  if(err.status){
    return res.sendStatus(err.status);
  }
  res.sendStatus(500);
  next();
});

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT)
})

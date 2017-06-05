'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../model/user/user.js');
const twitAuth = require('./twitter-config.js');


module.exports = function(passport){

  passport.serializeUser(function(user,done) {
    done(null,user.id);
  })

  passport.deserializeUser(function(id,done){
    User.findById(id, (err,data) => {
      if (err) console.log(err.message);
      done(err,user);
    })
  })

  passport.use(new TwitterStrategy({
    consumerKey    : twitAuth.consumer_key,
    consumerSecret : twitAuth.consumer_secret,
    callbackURL    : twitAuth.callbackURL
  },
  function(token,tokenSecret,profile,done){
    process.nextTick(function() {
      User.findOne({'id' : profile.id}, function(err,user){
        if(err) done(err);

        if(user) done(null,user);

        let newUser = new User();
        newUser.id = profile.id;
        newUser.token = token;
        newUser.username = profile.username;

        newUser.save(function(err){
          if(err) throw console.error();
          return done(null,newUser);
        })
      })
    })
  }))
}

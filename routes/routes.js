'use strict';
const User = require('../model/user');
const
module.exports = function(router,passport){
  router.get('/auth', passport.authenticate('twitter'));

  router.get('/auth/twitter', passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));

  // router.get('/app/tweets', (req,res) => {
  //
  // });
}

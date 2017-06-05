'use strict';
const User = require('../model/user/user.js');

module.exports = function(router,passport){
  router.get('/login/twitter', passport.authenticate('twitter'));

  router.get('/login/twitter/return', passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));

  // router.get('/app/tweets', (req,res) => {
  //
  // });
}

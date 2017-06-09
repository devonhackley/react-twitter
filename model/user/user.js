'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type:String, required:true, unique:true},
  id: {type:String},
  token:{type:String}
})

module.exports = mongoose.model('User', userSchema)

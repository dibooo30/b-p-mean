const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var newUser = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    image:{
      type:String,
      require:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    invok:{
      type:Array
    },
    updated_date: { type: Date, default: Date.now }
});

const User = module.exports = mongoose.model('User', newUser);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
  }
  
  module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
  }
  
  module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');
// to varfay user
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
// Authenticate
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({success: false, errMSG: 'User not found'});
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) {
        return  res.json({success: false, errMSG: 'somthig wrong  plz try agean later'})
        }
        if(isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            token: 'JWT '+ token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          })
        } else {
          return res.json({success: false, errMSG: 'Wrong password'});
        }
      });
    });
  }); 

// registry  
router.post('/register', (req, res, next)=>{
  let username = req.body.username;
  let password = req.body.password;
  let email    = req.body.email;
  let newUser  = new User({
      username:username,
      password:password,
      email:email
  });
  User.findOne({"username":req.body.username}, (err, user)=>{
    if (err) {
      res.json(err)
    }
    if(user){
      res.json({success: false, sms:'username is alredy taken'})
    }if(!user){
      User.addUser(newUser, (err)=>{
        if (err) {
            res.json(err)
        }
        res.json({success: true, sms:'now you can login'})
    });    }

  })


    } 
);
// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

  // profile
router.get('/dashbord', verifyToken, (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router;

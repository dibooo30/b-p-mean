const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var im = require('imagemagick');
const Shoes = require('../models/ladise_module/shoes');
const Skirts = require('../models/ladise_module/skirts');
const Accesories = require('../models/ladise_module/accesories');
const Bags = require('../models/ladise_module/bags');
const Dresses = require('../models/ladise_module/dresses');

// start path to save images & rename images
const storage = multer.diskStorage({

  destination: function (req, file, callback) {
      callback(null, 'public/users_images/')
  },
  filename: function(req, file, cd){
      cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})// end path to save images & rename images

// start handel multer file size and use check file type fun
const upload = multer({
   storage:storage,
   limits: {fileSize: 100000000000},
   fileFilter: function(req, file, cb){
     checkFileType(file, cb);
   }
}).single('user_image') // end handel multer file size and use check file type fun

// start check file type 
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype)
  if(mimetype && extname){
    return cb(null, true);
  } else{
    cb('Error: must be image');
  }
} // end check file type 
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
              _id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              image:user.image,
              invok:user.invok
            }// end user
          }) // end res.json
        } else {
          return res.json({success: false, errMSG: 'Wrong password'});
        }// end else
      }); // end User.comparePassword
    }); // end User.getUserByUsername
  }); 

// registry  
router.post('/register', (req, res, next)=>{
  upload(req, res, (err) => {
    if(err)  {
      console.log(err)
      return  res.json({success:false, errMSG: err.message});
    } else{
      let username = req.body.username;
      let password = req.body.password;
      let email    = req.body.email;
      let image    = req.file.filename;
      let newUser  = new User({
          username:username,
          password:password,
          email:email,
          image:image
      });
      User.findOne({"username":req.body.username}, (err, user)=>{
        if (err) {
          res.json({errMSG:err})
        }
        if(user){
          res.json({success: false, MSG:'username is alredy taken'})
        }if(!user){
          User.addUser(newUser, (err)=>{
            if (err) {
                res.json({errMSG:err.message})
            }
            res.json({success: true, MSG:'now you can login'})
        })
        }
      })
      
      }
    });
  })// end user post


// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

router.post('/user/:id', (req, res, next)=>{
  let invok = req.body;
  let ids = [];
  let all = [];
  let aSpCategory = [];
  for (const i of invok) {
    ids.push(i.id);
    all.push(i)
  }
  for (const a of all) {
    aSpCategory.push(a.sp_category)
} // end for
for (const sp of all) {
  if (sp.sp_category === 'Shoes') {
    ids.forEach(id => {
      let ii = id;
          Shoes.findById(ii.slice(0, 24), (err, product)=>{
          if (err) {
              res.json({success:false, errMSG:err.message})
          }else{
            var item = all.find((i)=>{return i.id === ii});
            if (item.size === '38') {
              if (product.size_38 <  item.qut) {
                console.log('sorry this is the last qut ', product.size_38)
              }else{
                product.size_38 -= item.qut;
                product.save();
              }

            }else if (item.size === '37') {
              product.size_37 -= item.qut;
              product.save();
            }else if (item.size === '36') {
              product.size_36 -= item.qut;
              product.save();
            }
          }
        });         
    });
  }else if(sp.sp_category === 'Bags'){
    ids.forEach(id => {
      let ii = id;
          Bags.findById(ii.slice(0, 24), (err, product)=>{
          if (err) {
              res.json({success:false, errMSG:err.message})
          }else{
            var item = all.find((i)=>{return i.id === ii});
            if (item.size === 'one size') {
              product.qut -= item.qut;
              product.save();
            }
          }
        });         
    });
  }
  console.log(sp.sp_category)
}

  User.findByIdAndUpdate(req.params.id, { $push:  { invok:invok} }, (err, data)=>{
    if (err) {
      res.json({errMsg:err.message})
    }else{
      res.json({success:true, MSG:'saved'})
    }
  })
})// end user post

  // profile
router.get('/dashbord', verifyToken, (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router;

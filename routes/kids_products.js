const express = require('express');
const router = express.Router();
const Baby_Girls = require('../models/kids_module/baby_girls');
const Baby_Boys = require('../models/kids_module/baby_boys');
const Baby_Cars = require('../models/kids_module/baby_cars');
const Men_Accesories = require('../models/men_module/men_accesories');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var im = require('imagemagick');


// get all sharts & Tsherts
router.get('/baby_girls/:id', (req, res, next)=>{
    Baby_Girls.findByIdAndRemove(req.params.id, (err, product)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
// to remove product images from src folder
            for (const i of product.images) {
                fs.unlink('./public/src/'+i, (err) => {
                    if (err) throw err;
                    });
                fs.unlink('./public/build/small_'+i, (err) => {
                    if (err) throw err;
                });
                } // end remove product images from src folder
            res.json({success:true, data:'removed success'})
        }
    })
}); // end get all sharts & Tsherts

// get all sharts & Tsherts
router.get('/baby_boys/:id', (req, res, next)=>{
    Baby_Boys.findByIdAndRemove(req.params.id, (err, product)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
// to remove product images from src folder
            for (const i of product.images) {
                fs.unlink('./public/src/'+i, (err) => {
                    if (err) throw err;
                    });
                fs.unlink('./public/build/small_'+i, (err) => {
                    if (err) throw err;
                });
                } // end remove product images from src folder
            res.json({success:true, data:'removed success'})
        }
    })
}); // end get all sharts & Tsherts

// get all sharts & Tsherts
router.get('/baby_cars/:id', (req, res, next)=>{
    Baby_Cars.findByIdAndRemove(req.params.id, (err, product)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
// to remove product images from src folder
            for (const i of product.images) {
                fs.unlink('./public/src/'+i, (err) => {
                    if (err) throw err;
                    });
                fs.unlink('./public/build/small_'+i, (err) => {
                    if (err) throw err;
                });
                } // end remove product images from src folder
            res.json({success:true, data:'removed success'})
        }
    })
}); // end get all sharts & Tsherts
//////////////////////////////////////////// start get data ////////////////////////////////////
// get all sharts & Tsherts
router.get('/baby_boys', (req, res, next)=>{
    Baby_Boys.find({}, (err, clothes)=>{
        if (err) {

            res.json({success:false, errMSG:err.message})
        }else{
            
            res.json({success:true, data:clothes})
        }
    })
}); // end get all sharts & Tsherts

// get all Shoes
router.get('/baby_girls', (req, res, next)=>{
    Baby_Girls.find({}, (err, Shoes)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:Shoes})
        }
    })
}) //end  get all Shoes

// get all jeans
router.get('/baby_cars', (req, res, next)=>{
    Baby_Cars.find({}, (err, jeans)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:jeans})
        }
    })
}) //end  get all jeans


////////////////////////////////////////// startget data by id ////////////////////////////////////
// router.get('/clothes/:id', (req, res, next)=>{
//     Men_Clothes.findById(req.params.id, (err, product)=>{
//         if(err) res.json({errMSG: err.message});

//         res.json({success:true, data:product})
//     })
// })
////////////////////////////////////////// end get data by id ////////////////////////////////////


/////////////////////////////// start handel multer multer /////////////////////////////////
// start path to save images & rename images
const storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, 'public/src/')
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
  }).array('images') // end handel multer file size and use check file type fun

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
// end multer fun
/////////////////////////////// end handel multer multer /////////////////////////////////

///////////////////////////////////////// start post data /////////////////////////////////////
// start post new shose
router.post('/baby_girls', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
            res.json({success:false, errMSG: err.message});
        } else{
            var req_images = [];  
            for (const image of req.files) {
                req_images.push(image.filename);
                im.resize({
                    srcPath:  process.cwd() + '/public/src/' + image.filename,
                    dstPath:  process.cwd() + '/public/build/small_'+image.filename,
                    width:80
                  }, function(err, stdout, stderr){
                    if (err) {
                        console.log('error while resizing images' + stderr);
                        throw err;
                    }else{
                        console.log('resize done')
                    }
                  });
            }
            var sp_category = req.body.sp_category,
                category = req.body.category,
                price      = parseInt(req.body.price),
                title      = req.body.title,
                dis        = req.body.dis,
                small_qut     = parseInt(req.body.small_qut),
                mideam_qut    = parseInt(req.body.mideam_qut),
                large_qut     = parseInt(req.body.large_qut);
// create new schema
                var newBabyGirls = new Baby_Girls({
                    category:category,
                    sp_category: sp_category,
                    price:price,
                    dis:dis,
                    title:title,
                    small_qut:small_qut,
                    mideam_qut:mideam_qut,
                    large_qut:large_qut,
                    images:req_images
                    })//end create new schema
// save new schema to mongose
                Baby_Girls.create(newBabyGirls, (err)=>{
                    if (err) {
                        res.json({success:false, errMSG: err.message});
                    }else{
                        res.json({success:true, MSG: 'saved'});
                    }
                })// end save new schema to mongose
            } // end add new product to men Shoes
            })
}) // end post new shose

// post new shart & t-shart
router.post('/baby_boys', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
          res.json({success:false, errMSG:err.message})
        } else{
            var req_images = [];
            for (const image of req.files) {
                req_images.push(image.filename);
                im.resize({
                    srcPath:  process.cwd() + '/public/src/' + image.filename,
                    dstPath:  process.cwd() + '/public/build/small_'+image.filename,
                    width:80
                  }, function(err, stdout, stderr){
                    if (err) {
                        console.log('error while resizing images' + stderr);
                        throw err;
                    }else{
                        console.log('resize done')
                    }
                  });
            }             
                var sp_category = req.body.sp_category,
                    category = req.body.category,
                    price         = parseInt(req.body.price),
                    title         = req.body.title,
                    dis           = req.body.dis,
                    small_qut     = parseInt(req.body.small_qut),
                    mideam_qut    = parseInt(req.body.mideam_qut),
                    large_qut     = parseInt(req.body.large_qut);
// create new schema
                var newBabyBoys = new Baby_Boys({
                    category:category,
                    sp_category: sp_category,
                    price:price,
                    dis:dis,
                    title:title,
                    small_qut:small_qut,
                    mideam_qut:mideam_qut,
                    large_qut:large_qut,
                    images:req_images
                })//end create new schema
// save new schema to mongose
                Baby_Boys.create(newBabyBoys, (err)=>{
                    if (err) {
                        res.json({success:false, errMSG: err.message});
                    }else{
                        res.json({success:true, MSG: 'saved'});
                    }
                })// end save new schema to mongose
            } // end add new product to men Shoes
            })
}) // end post new shart & t-shart

/// post new jeans
router.post('/baby_cars', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
            res.json({success:false, errMSG: err.message});
        } else{
            var req_images = [];
            for (const image of req.files) {
                req_images.push(image.filename);
                im.resize({
                    srcPath:  process.cwd() + '/public/src/' + image.filename,
                    dstPath:  process.cwd() + '/public/build/small_'+image.filename,
                    width:80
                  }, function(err, stdout, stderr){
                    if (err) {
                        console.log('error while resizing images' + stderr);
                        throw err;
                    }else{
                        console.log('resize done')
                    }
                  });
            }                
                var sp_category = req.body.sp_category,
                    category    = req.body.category,
                    price       = parseInt(req.body.price),
                    title       = req.body.title,
                    dis         = req.body.dis,
                    qut         = req.body.qut;

// create new schema
                var newBabyCar = new Baby_Cars({
                    category:category,
                    sp_category: sp_category,
                    price  :price,
                    dis    :dis,
                    title  :title,
                    qut:qut,
                    images :req_images
                })//end create new schema
// save new schema to mongose
                Baby_Cars.create(newBabyCar, (err)=>{
                    if (err) {
                        res.json({success:false, errMSG: err.message});
                    }else{
                        res.json({success:true, MSG: 'saved'});
                    }
                })// end save new schema to mongose
            } // end add new product to men Shoes
            })
}) // end post new jeans

///////////////////////////////// end post data //////////////////////////


module.exports = router;
const express = require('express');
const router = express.Router();
const Men_Clothes = require('../models/men_module/men_clothes');
const Men_Shoes = require('../models/men_module/Men_Shoes');
const Men_Jeans = require('../models/men_module/men_jeans');
const Men_Accesories = require('../models/men_module/men_accesories');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var im = require('imagemagick');


// get all sharts & Tsherts
router.get('/jeans/:id', (req, res, next)=>{
    Men_Jeans.findByIdAndRemove(req.params.id, (err, product)=>{
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
router.get('/accesories/:id', (req, res, next)=>{
    Men_Accesories.findByIdAndRemove(req.params.id, (err, product)=>{
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
router.get('/clothes/:id', (req, res, next)=>{
    Men_Clothes.findByIdAndRemove(req.params.id, (err, product)=>{
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
router.get('/shoes/:id', (req, res, next)=>{
    Men_Shoes.findByIdAndRemove(req.params.id, (err, product)=>{
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
router.get('/clothes', (req, res, next)=>{
    Men_Clothes.find({}, (err, clothes)=>{
        if (err) {

            res.json({success:false, errMSG:err.message})
        }else{
            
            res.json({success:true, data:clothes})
        }
    })
}); // end get all sharts & Tsherts

// get all Shoes
router.get('/shoes', (req, res, next)=>{
    Men_Shoes.find({}, (err, Shoes)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:Shoes})
        }
    })
}) //end  get all Shoes

// get all jeans
router.get('/jeans', (req, res, next)=>{
    Men_Jeans.find({}, (err, jeans)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:jeans})
        }
    })
}) //end  get all jeans

// get all Accesories
router.get('/accesories', (req, res, next)=>{
    Men_Accesories.find({}, (err, Accesories)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:Accesories})
        }
    })
}) //end  get all Accesories
////////////////////////////////////////// end get data ////////////////////////////////////

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
router.post('/shoes', (req, res, next)=>{
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
                    size_41    = parseInt(req.body.size_41),
                    size_42    = parseInt(req.body.size_42),
                    size_43    = parseInt(req.body.size_43);
// create new schema
                var newMenShoes = new Men_Shoes({
                    category:category,
                    sp_category: sp_category,
                    price:price,
                    dis:dis,
                    title:title,
                    size_41:size_41,
                    size_42:size_42,
                    size_43:size_43,
                    images:req_images
                })//end create new schema
// save new schema to mongose
                Men_Shoes.create(newMenShoes, (err)=>{
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
router.post('/clothes', (req, res, next)=>{
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
                var newMenClothes = new Men_Clothes({
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
                Men_Clothes.create(newMenClothes, (err)=>{
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
router.post('/jeans', (req, res, next)=>{
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
                    size_30     = parseInt(req.body.size_30),
                    size_31     = parseInt(req.body.size_31),
                    size_32     = parseInt(req.body.size_32);

// create new schema
                var newMenJeans = new Men_Jeans({
                    category:category,
                    sp_category: sp_category,
                    price  :price,
                    dis    :dis,
                    title  :title,
                    size_30:size_30,
                    size_31:size_31,
                    size_32:size_32,
                    images :req_images
                })//end create new schema
// save new schema to mongose
                Men_Jeans.create(newMenJeans, (err)=>{
                    if (err) {
                        res.json({success:false, errMSG: err.message});
                    }else{
                        res.json({success:true, MSG: 'saved'});
                    }
                })// end save new schema to mongose
            } // end add new product to men Shoes
            })
}) // end post new jeans

/// post new jeans
router.post('/accesories', (req, res, next)=>{
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
                    qut         = parseInt(req.body.qut);
// create new schema
                var newMenAccesories = new Men_Accesories({
                    price:price,
                    dis:dis,
                    title:title,
                    qut:qut,
                    category:category,
                    sp_category: sp_category,
                    images:req_images
                })//end create new schema
// save new schema to mongose
                Men_Accesories.create(newMenAccesories, (err)=>{
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

// start to get param by id
router.param('id', function(req, res, next, id){
    Men_Clothes.findById(id, function(err, docs){
        if(err) throw err;
        else
        {
          req.id = docs;
          next();
        }
      });	
  }) //end  get param by id


module.exports = router;
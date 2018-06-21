const express = require('express');
const router = express.Router();
const Shoes = require('../models/ladise_module/shoes');
const Skirts = require('../models/ladise_module/skirts');
const Accesories = require('../models/ladise_module/accesories');
const Bags = require('../models/ladise_module/bags');
const Dresses = require('../models/ladise_module/dresses');


var multer = require('multer');
const fs = require('fs');
const path = require('path');
var im = require('imagemagick');


// get all sharts & Tsherts
router.get('/dresses/:id', (req, res, next)=>{
    Dresses.findByIdAndRemove(req.params.id, (err, jeans)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            for (const i of jeans.images) {
            fs.unlink('./public/src/'+i, (err) => {
                if (err) throw err;
              });
              console.log(i);
        }
        res.json({success:true, data: jeans})
        }
    })
}); // end get all sharts & Tsherts

// get all sharts & Tsherts
router.get('/accesories/:id', (req, res, next)=>{
    Accesories.findByIdAndRemove(req.params.id, (err, product)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            for (const i of product.images) {
            fs.unlink('./public/src/'+i, (err) => {
                if (err) throw err;
              });
              console.log(i);
        }
        res.json({success:true, data: product})

        }
    })
}); // end get all sharts & Tsherts

// get all sharts & Tsherts
router.get('/shoes/:id', (req, res, next)=>{
    Shoes.findByIdAndRemove(req.params.id, (err, product)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            for (const i of product.images) {
            fs.unlink('./public/src/'+i, (err) => {
                if (err) throw err;
              });
              console.log(i);
        }
        res.json({success:true, data: product})

        }
    })
}); // end get all sharts & Tsherts
// get all sharts & Tsherts
router.get('/bags/:id', (req, res, next)=>{
    Bags.findByIdAndRemove(req.params.id, (err, shoes)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            for (const i of shoes.images) {
            fs.unlink('./public/src/'+i, (err) => {
                if (err) throw err;
              });
        }
            res.json({success:true, data: shoes})
        }
    })
}); // end get all sharts & Tsherts

// get all skirts
router.get('/skirts/:id', (req, res, next)=>{
    Skirts.findByIdAndRemove(req.params.id, (err, shoes)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            for (const i of shoes.images) {
            fs.unlink('./public/src/'+i, (err) => {
                if (err) throw err;
              });
        }
            res.json({success:true, data: shoes})
        }
    })
}); // end get all sharts & Tsherts
//////////////////////////////////////////// start get data ////////////////////////////////////
// get all sharts & Tsherts
router.get('/bags', (req, res, next)=>{
    Bags.find({}, (err, clothes)=>{
        if (err) {

            res.json({success:false, errMSG:err.message})
        }else{
            
            res.json({success:true, data:clothes})
        }
    })
}); // end get all sharts & Tsherts

// get all Shoes
router.get('/shoes', (req, res, next)=>{
    Shoes.find({}, (err, Shoes)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:Shoes})
        }
    })
}) //end  get all Shoes

// get all jeans
router.get('/skirts', (req, res, next)=>{
    Skirts.find({}, (err, jeans)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:jeans})
        }
    })
}) //end  get all jeans

// get all Accesories
router.get('/accesories', (req, res, next)=>{
    Accesories.find({}, (err, Accesories)=>{
        if (err) {
            res.json({success:false, errMSG:err.message})
        }else{
            res.json({success:true, data:Accesories})
        }
    })
}) //end  get all Accesories

// get all Accesories
router.get('/dresses', (req, res, next)=>{
    Dresses.find({}, (err, Accesories)=>{
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
        cd(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
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
            for (const file of req.files) {
                req_images.push(file.filename)
            }                 
                var sp_category = req.body.sp_category,
                    category = req.body.category,
                    price      = parseInt(req.body.price),
                    title      = req.body.title,
                    dis        = req.body.dis,
                    size_36    = parseInt(req.body.size_41),
                    size_37    = parseInt(req.body.size_42),
                    size_38    = parseInt(req.body.size_43);
// create new schema
                var newShoes = new Shoes({
                    category:category,
                    sp_category: sp_category,
                    price:price,
                    dis:dis,
                    title:title,
                    size_41:size_36,
                    size_42:size_37,
                    size_43:size_38,
                    images:req_images
                })//end create new schema
// save new schema to mongose
                Shoes.create(newShoes, (err)=>{
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
router.post('/dresses', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
          res.json({success:false, errMSG:err.message})
        } else{
            var req_images = [];
            for (const file of req.files) {
                req_images.push(file.filename)
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
                var newDresses = new Dresses({
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
                Dresses.create(newDresses, (err)=>{
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
router.post('/skirts', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
            res.json({success:false, errMSG: err.message});
        } else{
            var req_images = [];
            for (const file of req.files) {
                req_images.push(file.filename)
            }                 
                var sp_category = req.body.sp_category,
                    category    = req.body.category,
                    price       = parseInt(req.body.price),
                    title       = req.body.title,
                    dis         = req.body.dis,
                    small_qut     = parseInt(req.body.small_qut),
                    mideam_qut    = parseInt(req.body.mideam_qut),
                    large_qut     = parseInt(req.body.large_qut);

// create new schema
                var newSkirts = new Skirts({
                    category:category,
                    sp_category: sp_category,
                    price  :price,
                    dis    :dis,
                    title  :title,
                    small_qut:small_qut,
                    mideam_qut:mideam_qut,
                    large_qut:large_qut,
                    images :req_images
                })//end create new schema
// save new schema to mongose
                Skirts.create(newSkirts, (err)=>{
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
            for (const file of req.files) {
                req_images.push(file.filename)
            }              
                var sp_category = req.body.sp_category,
                    category    = req.body.category,
                    price       = parseInt(req.body.price),
                    title       = req.body.title,
                    dis         = req.body.dis,
                    qut         = parseInt(req.body.qut);
// create new schema
                var newAccesories = new Accesories({
                    price:price,
                    dis:dis,
                    title:title,
                    qut:qut,
                    category:category,
                    sp_category: sp_category,
                    images:req_images
                })//end create new schema
// save new schema to mongose
                Accesories.create(newAccesories, (err)=>{
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
router.post('/bags', (req, res, next)=>{
    upload(req, res, (err) => {
        if(err)  {
            res.json({success:false, errMSG: err.message});
        } else{
            var req_images = [];
            for (const file of req.files) {
                req_images.push(file.filename)
            }              
                var sp_category = req.body.sp_category,
                    category    = req.body.category,
                    price       = parseInt(req.body.price),
                    title       = req.body.title,
                    dis         = req.body.dis,
                    qut         = parseInt(req.body.qut);
// create new schema
                var newBags = new Bags({
                    price:price,
                    dis:dis,
                    title:title,
                    qut:qut,
                    category:category,
                    sp_category: sp_category,
                    images:req_images
                })//end create new schema
// save new schema to mongose
                Bags.create(newBags, (err)=>{
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
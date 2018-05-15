const express = require('express');
const router = express.Router();
const Prouduct = require('../models/products');

// start get kids prouducts 
router.get('/clothes', (req, res, next)=>{
    Prouduct.find({categories:'kids'}, (err, prouducts)=>{
        if (err) {
            res.json({success: false, sms:'cant find any prouducts'})
        }
        res.json({success: true, prouducts:prouducts})
    })
})// end get kids prouducts 

// start get product by id
router.get('*/clothes/product_info/:id', (req, res, next)=>{
    Prouduct.findById(req.params.id, (err, product)=>{
        if (err) {
            res.json({success: false, sms:'cant find any prouducts'})
        }
        res.json({success: true, product: product})
    })
})// end get product by id
module.exports = router;
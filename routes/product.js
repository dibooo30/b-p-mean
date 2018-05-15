const express = require('express');
const router = express.Router();
const Prouduct = require('../models/products');

// add new product to mongoDB
router.post('/add_product', (req, res, next)=>{
    let title = req.body.title;
    let price = req.body.price;
    let dis = req.body.dis;
    let img = req.body.img;
    let colors = req.body.colors;
    let categories = req.body.categories;
    let details = req.body.details;
    let sizes = req.body.sizes;

    let newProduct = new Prouduct({
        title:title,
        price:price,
        categories:categories,
        img:img,
        colors:colors,
        dis:dis,
        details:details,
        sizes:sizes
    });

    Prouduct.create(newProduct, (err)=>{
        if (err) {
            res.json(err)
        }
        res.json({sms:'saved'});
    });
}) //end add data to mongoDB

// start get all prouducts 
router.get('/', (req, res, next)=>{
    Prouduct.find({}, (err, prouducts)=>{
        if (err) {
            res.json({success: false, sms:'cant find any prouducts'})
        }
        res.json({success: true, prouducts: prouducts})
    })
}) // eng get all products

module.exports = router;
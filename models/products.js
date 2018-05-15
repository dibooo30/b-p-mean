const mongoose = require('mongoose');

var newProudauct = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    dis:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    colors:{
        type:Array,
        required:true
    }    

});

const Products = module.exports = mongoose.model('Products', newProudauct);

const mongoose = require('mongoose');

var newProudauct = mongoose.Schema({
    category: {
        type:String,
        required:true
    },
    sp_category: {
        type:String,
        required:true
    },
    dis: {
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    qut:{
        type:Number,
        required:true
    },
    updated_date: { type: Date, default: Date.now }

});

const Accesories = module.exports = mongoose.model('Accesories', newProudauct);

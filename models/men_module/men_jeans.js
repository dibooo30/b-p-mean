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
    size_30:{
        type:Number,
        required:true
    },
    size_31:{
        type:Number,
        required:true
    },
    size_32:{
        type:Number,
        required:true
    },
    updated_date: { type: Date, default: Date.now }

});

const Menjeans = module.exports = mongoose.model('Menjeans', newProudauct);

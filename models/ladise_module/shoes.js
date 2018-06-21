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
    size_36:{
        type:Number,
        required:true
    },
    size_37:{
        type:Number,
        required:true
    },
    size_38:{
        type:Number,
        required:true
    },
    updated_date: { type: Date, default: Date.now }

});

const Shose = module.exports = mongoose.model('Shose', newProudauct);

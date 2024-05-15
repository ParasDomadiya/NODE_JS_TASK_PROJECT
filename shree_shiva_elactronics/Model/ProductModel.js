var mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        // required: true,
        // trim: true
    },
    ProductPrice: {
        type: Number,
        // required: true,
        // trim: true
    },
    BrandName: {
        type: String,
        // required: true,
        // trim: true
    },
    Modeldate: {
        type: Number,
        // required: true,
        // trim: true
    },
    warranty: {
        type: String,
        // required: true,
        // trim: true
    },
    guarantee: {
        type: String,
        // required: true,
        // trim: true
    },
    Rating: {
        type: Number,
        // required: true,
        // trim: true
    },
    ProductImage: {
        type:Array
    },
    like:{
        type:Boolean,
        default:false
        
    },
    category:{
        type: String,
        // required: true,
        // trim: true
    },
    quantity:{
        type:Number
    }
})

module.exports = mongoose.model('Productdata', ProductSchema)
// models/Admin.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({ 
    adminId: {
        type: String,
        // required: true,
        // unique: true 
    },
    firstName: {
        type: String,
        //  required: true
    },
    lastName: {
        type: String,
        /// required: true
    },
    email: {
        type: String,
        //    required: true,
        //   unique: true,
        //   match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    number: {
        type: String,
        //   required: true
    },
    username: {
        type: String,
        //    required: true,
        //   unique: true
    },
    password: {
        type: String,
        //   required: true
    },
    //   createdAt: {
    //     type: Date,
    //   //  default: Date.now
    //   },
    //   lastLogin: {
    //     type: Date,
    //   //  default: null
    //   },
    //   isActive: { 
    //     type: Boolean,
    //    // default: true
    //   }
});

module.exports = mongoose.model('Admin', adminSchema);

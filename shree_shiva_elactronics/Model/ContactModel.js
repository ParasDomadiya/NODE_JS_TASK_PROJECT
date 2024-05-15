const mongoose = require('mongoose')

const Contactschema = new mongoose.Schema({


    name: {
        type: String,
        // required: true,
        // trim: true,
    },
    email: {
        type: String,
        // unique: true,
        // required: true,
        // trim: true,
        // lowercase: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("email is invalid");
        //     }
        // },
    },
    phone: {
        type: String,
        // unique: true,
        // required: true,
        // minlength: 10,
    },
    messages: {
        type: String,
        // unique: true,
         required: true,
        // minlength: 10,
    },



}
);


module.exports = mongoose.model('Contactdata', Contactschema)
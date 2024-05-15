const mongoose = require('mongoose')

const Customerschema = new mongoose.Schema({

    // Customerid: {
    //     type: Number,
    // },
    firstname: {
        type: String,
        // required: true,
        // trim: true,   
    },
    lastname: {
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
        type: Number,
        // unique: true,
        // required: true,
        // minlength: 10,
    },
    UserName: {
        type: String,
        // required: true,
        // trim: true,
    },
    password: {
        type: String,
        // required: true,
        // unique: true,
        // trim: true,
        // minlength: 8,
        // validate(value) {
        //     if (value.toLowerCase().includes("password")) {
        //         throw new Error("password cannot contain the password");
        //     }
        // },
    },

}
);


module.exports = mongoose.model('Customerdata', Customerschema)

    // tokens: [            
    //     {
    //         AccessToken: {
    //             type: String,
    //         },
    //         RefreshToken: {
    //             type: String,
    //         },
    //     },
    // ],
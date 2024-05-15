const express = require("express");
const multer = require("multer");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const CustomerSchema = require('../../Model/CustomerModel')
    

const registerCustomer = async (req, res) => {  
    try {
        const { lastname, email, UserName, phone, firstname, password } = (req.body)
        const hashpassword = await bcrypt.hash(password, 10)
        const Customer = new CustomerSchema({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            UserName: UserName,
            password: hashpassword,
        })
        Customer.save().then((result) => {
            console.log(result)
            return res.json(result)
            
        }).catch((err) => {
            return res.json({ "msg": err })
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.error('Registration error:', error);
    }      

    // try {
    //     const { lastname, email, UserName, phone, firstname, password } = req.body;
    //     const saltRounds = 10; // Number of salt rounds for bcrypt
    //  //   const hashpassword = await bcrypt.hash(password, saltRounds); // Hashing the password with the specified number of salt rounds
    //     const Customer = new CustomerSchema({
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email,
    //         phone: phone,
    //         UserName: UserName,
    //         password: password,
    //     });
    //     Customer.save().then((result) => {
    //         console.log(result);
    //         return res.json(result);
    //     }).catch((err) => {
    //         return res.json({ "msg": err });
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Internal Server Error' });
    //     console.error('Registration error:', error);
    // }
}

const login = async (req, res) => {
    try {
        const getdb = await CustomerSchema.findOne({
            UserName: req.body.UserName
        })
        if (getdb) {
            console.error(getdb)
            const password = await bcrypt.compare(req.body.password, getdb.password);
            if (!password) {
                console.error('login error password is not valid...... ')
                res.json({ message: 'login error password is not valid......' })
            } else {
                const token = jwt.sign({ CustomerId: getdb._id, UserName: getdb.UserName },
                    process.env.JWT1,
                    { expiresIn: '1h' });
                return res.json({ "msg": 'success', 'result': true, token: token })
            }
        } else {
            console.error('login error UserName is not valid...... ')
            res.json({ message: 'login error UserName is not valid......' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error...' })
        console.error('login error:', error)
    } 

}

const updateCustomer = async (req, res) => {
    try {
        const token = jwt.verify(req.token, process.env.JWT1);
        const _id = token.CustomerId;
       await CustomerSchema.findByIdAndUpdate(_id,req.body, { new: true }).then((result) => {
            return res.json(result)
        }).catch((err) => {
            return res.json({ "msg": err.message })
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error...' })
        console.error('login error:', error)
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const token = jwt.verify(req.token, process.env.JWT1);
        const _id = token.CustomerId;
      const data = await CustomerSchema.findOneAndDelete(_id, { new: true });
      if (!data) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.send(data);
    } catch (error) {
      console.error('Error in deleteCustomer:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};
function generateOTP(length) {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
var generateotp = generateOTP(6);
const forgot_password = async (req, res) => {
    try {
        const token = jwt.verify(req.token, process.env.JWT1);
        const _id = token.CustomerId;
        // MAIL SEND
        await CustomerSchema.findByIdAndUpdate(_id).then((result) => {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "enter email",
                    pass: "enter email pass"
                }
            });
            const send = {
                from: "enter email ",
                to: "enter email ",
                subject: 'Password Reset',
                Text: ` <h1>SHREE SHIVA ELECTRONIC </h1><p> ${generateotp}</p>`,
            }
            transporter.sendMail({
                from: "enter email ",
                to: "enter email ",
                subject: 'Password Reset',
                html: ` <h1>SHREE SHIVA ELECTRONIC </h1><p> ${generateotp}</p>`,
            }, (err, data) => {
                if (err) {
                    console.error("Email sending error:", err);
                    return res.status(500).json({
                        error: "Failed to send email. Please try again later."
                    });
                } else {
                    return res.send({
                        message: "Email sent successfully.",
                        data: data,
                    });
                }
            });
        }).catch((err) => {
            return res.json({ "msg": err.message })
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const forgot_password1 = async (req, res) => {
    try {
        const token = jwt.verify(req.token, process.env.JWT1);
        const _id = token.CustomerId;
        const { otp, password } = req.body
        if (generateotp == otp) {
            await CustomerSchema.findByIdAndUpdate(_id, { password: await bcrypt.hash(password, 10) }, { new: true }).then((result) => {
                return res.json(result)
            }).catch((err) => {
                return res.json({ "msg": err.message })
            });

        } else {
            return res.json("otp was wrrong")
        }

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = { forgot_password1,registerCustomer, login,updateCustomer,deleteCustomer,forgot_password};









 




//CHATGPT UPDATE 

// const updateCustomer = async (req, res) => {
//     try {
//         const updatedCustomer = await CustomerSchema.findByIdAndUpdate(req.body.id, req.body, { new: true });
//         return res.json(updatedCustomer);
//     } catch (error) {
//         console.error('Update Customer error:', error);
//         return res.status(500).json({ message: 'Internal Server Error...' });
//     }
// };



// const deleteCustomer = async (req, res) => {
//   try {
//     let token = req.headers['token'];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized: Token is missing' });
//     }
//     const result = jwt.verify(token, process.env.JWT1);
//     console.error(result)
//     if (!result || !result.CustomerId) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
//     const data = await CustomerSchema.findOneAndDelete({ _id: result.CustomerId });
//     if (!data) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }
//     res.send(data);
//   } catch (error) {
//     console.error('Error in deleteCustomer:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

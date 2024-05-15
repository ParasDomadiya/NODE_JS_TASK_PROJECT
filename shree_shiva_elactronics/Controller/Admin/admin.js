const express = require("express");
const multer = require("multer");
const path = require("path");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const AdminSchema = require("../../Model/admindatamodel")
const CustomerSchema = require('../../Model/CustomerModel')
const ProductSchema = require("../../Model/ProductModel")
const ordermodel = require('../../Model/OrderModel')
const crypto = require('crypto');
const { type } = require("os");



const registerAdmin = async (req, res) => {
    try {
        const { lastName, email, username, number, firstName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new AdminSchema({
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
            username: username,
            password: hashedPassword
        });
        await admin.save().then((result) => {
            return res.json(result)
        }).catch((err) => {
            return res.json({ "msg": err })
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// const loginadmin = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const admin = await AdminSchema.findOne({ username });
//         if (!admin) {
//             return res.status(404).json({ message: 'Admin not found' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, admin.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials password...' });
//         }
//         const token = jwt.sign({ adminId: admin._id, username: admin.username }, process.env.JWT2, { expiresIn: '1h' });
//         res.status(200).json({ msg: 'success', result: true, token });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

const loginadmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminSchema.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials password...' });
        }
        const token = jwt.sign({ adminId: admin._id, email: admin.email }, process.env.JWT2, { expiresIn: '1h' });
        res.status(200).json({ msg: 'success', result: true, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const updateData = async (req, res) => {
    try {
        const token = jwt.verify(req.token, process.env.JWT2);
        const _id = token.adminId;
        await AdminSchema.findByIdAndUpdate(_id, req.body, { new: true }).then((result) => {
            return res.json(result)
        }).catch((err) => {
            return res.json({ "msg": err.message })
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteadmin = async (req, res) => {
    try {
        const token = jwt.verify(req.token, process.env.JWT2);
        const _id = token.adminId;
        const deletedUser = await AdminSchema.findOneAndDelete({ _id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getalladmin = async (req, res) => {
    try {
        AdminSchema.find().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json({ "msssg": err.massage })
        });
    }
    catch (err) {
        return res.json({ "msg": err.massage })
    }
}

const allCustomerread = async (req, res) => {
    try {
        CustomerSchema.find().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json({ "msssg": err.massage })
        });
    }
    catch (err) {
        return res.json({ "msg": err.massage })
    }
}

const readAllProduct = async (req, res) => {
    try {
        ProductSchema.find().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json({ "msssg": err.massage })
        });
    }
    catch (err) {
        return res.json({ "msg": err.massage })
    }
}

const readOneProduct = async (req, res) => {
    try {
        ProductSchema.findOne().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json({ "msssg": err.massage })
        });
    }
    catch (err) {
        return res.json({ "msg": err.massage })
    }
}

const readAllorder = async (req, res) => {
    try {
        ordermodel.find().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json({ "msssg": err.massage })
        });
    }
    catch (err) {
        return res.json({ "msg": err.massage })
    }
}  

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const deletedOrder = await ordermodel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully', deletedOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//var generateotp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
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
        const token = jwt.verify(req.token, process.env.JWT2);
        const _id = token.adminId;
        // MAIL SEND
        await AdminSchema.findByIdAndUpdate(_id).then((result) => {
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
        const token = jwt.verify(req.token, process.env.JWT2);
        const _id = token.adminId;
        const { otp, password } = req.body
        if (generateotp == otp) {
            await AdminSchema.findByIdAndUpdate(_id, { password: await bcrypt.hash(password, 10) }, { new: true }).then((result) => {
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



module.exports = {deleteOrder, readOneProduct, forgot_password1, readAllorder, readAllProduct, allCustomerread, registerAdmin, loginadmin, updateData, getalladmin, deleteadmin, forgot_password };








const abc = async (req,res)=>{

const aa = ad
}

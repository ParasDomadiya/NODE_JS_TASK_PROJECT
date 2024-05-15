const express = require("express");
const mongoose = require('mongoose');
const Contactschema = require('../Model/ContactModel')


const Contactcustomer = async (req, res) => {
    try {
        const { email, phone, name,message } = req.body; 
        const Contact = new Contactschema({
            name: name,
            email: email,
            phone: phone,
            messages: message
        });
        await Contact.save().then((result) => {
            return res.json(result)
        }).catch((err) => {
            return res.json({ "msg": err })
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const ContactRead = async (req, res) => {
    try {
        Contactschema.find().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json({ "msssg": err.massage })
        });
    }
    catch (err) {
        return res.json({ "msg": err.massage })
    }
}


const ContactDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contactschema.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = { Contactcustomer ,ContactRead,ContactDelete};

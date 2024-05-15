require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OvjMMSGQXtDGmjjpLt9EeuitXCHKNdNuCv7VyzzmVIFRapRoqzg0Y1ykgRSe2rVRmSw0NQrdaDEmjMB9ds8jCuv00mF3rDXTH");

//THIS CODE TIME CONSUMING 
// const paymant = async (req, res) => {
//     try {
//         const { products } = req.body;
//         if (!Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ message: 'Products array is empty or missing.' });
//         }
//         const lineItems = products.map((product) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: product.name,
//                     images: [product.imgdata],
//                 },
//                 unit_amount: product.price * 100,
//             },
//             quantity: product.quantity,
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:3000/home",
//             cancel_url: "http://localhost:3000/c",
//         });
//         res.json({ id: session.id });
//     } catch (error) {
//         console.error('Payment error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


const paymant = async (req, res) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Products array is empty or missing.' });
        }
        
        const lineItems = products.map(({ name, imgdata, price, quantity }) => ({
            price_data: {
                currency: "inr",
                product_data: { name, images: [imgdata] },
                unit_amount: price * 100,
            },
            quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/home",
            cancel_url: "http://localhost:3000/c",
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = { paymant }
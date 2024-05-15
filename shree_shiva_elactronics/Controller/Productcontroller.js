const express = require("express"); 
const multer = require("multer");
const path = require("path");
const jwt = require('jsonwebtoken');

const ProductSchema = require("../Model/ProductModel")

const displayrandom = async (req, res) => {
    try {
        const data = await ProductSchema.find(); 
        data.forEach(element => {
            element.ProductImage[0] = "http://localhost:4109/Image/" + element.ProductImage[0];
        });
        
        if (data.length > 0) { 
            const randomProducts = [];
            const numProducts = 5;
            for (let i = 0; i < numProducts; i++) {
                const randomIndex = Math.floor(Math.random() * data.length); 
                const randomProduct = data[randomIndex];
                randomProducts.push(randomProduct);
            }
            res.json({
                message: "success",
                data: randomProducts 
            });
        } else {
            res.send("no data");
        }
    } catch (err) {
        console.log(err.message);
        return res.json({ "msg": err.message });
    }
};

const addproduct = (req, res) => {
    try {
        const body =req.body
        var order = new ProductSchema({
            ProductName: body.ProductName,
            ProductPrice:body.ProductPrice,
            BrandName:body.BrandName,
            Modeldate:body.Modeldate,
            warranty:body.warranty,
            guarantee:body.guarantee,
            Rating:body.Rating,
            ProductImage:req.file.filename,
            like:body.like,
            category:body.category,
            quantity:body.quantity
        }
        );
        order.save().then((result) => {
            return res.json(result)
        }).catch((err) => {
            return res.json({ "msg": err })
        });
    }
    catch (err) {
        return res.json({ "msg": err })
    }
}


const displaynotrandom  = async(req, res) => {
    try {
       const data = await ProductSchema.find().maxTimeMS(30000);
       data.forEach(element=>         {
         element.ProductImage[0]="http://localhost:4109"+`/Image/`+element.ProductImage[0]
       });
       if (data){
        res.json({
            messsage:"sucesss",
            data:data
        })
       }
       else{                                
        res.send("not data")
       }

    }
    catch (err) {
        console.log(err.massage)
        return res.json({ "msg": err.massage })
    }
}
 // THIS CODE IS TIME CONSUMING
const display = async (req, res) => {
    try {
        const data = await ProductSchema.find(); 
        data.forEach(element => {
            element.ProductImage[0] = "http://localhost:4109/Image/" + element.ProductImage[0];
        });
        
        if (data.length > 0) { 
            // Shuffle the data array
            const shuffledData = data.sort(() => Math.random() - 0.5);
            
            const uniqueProducts = [];
            const numProducts = Math.min(32, shuffledData.length); // Changed from 10 to 15
            for (let i = 0; i < numProducts; i++) {
                // Check if the product is already in uniqueProducts
                if (!uniqueProducts.some(prod => prod._id === shuffledData[i]._id)) {
                    uniqueProducts.push(shuffledData[i]);
                }
            }
            res.json({
                message: "success",
                data: uniqueProducts 
            });
        } else {
            res.send("no data");
        }
    } catch (err) {
        console.log(err.message);
        return res.json({ "msg": err.message });
    }
};

// const display = async (req, res) => {
//     try {
//         const data = await ProductSchema.aggregate([
//             { $sample: { size: 16 } }, // Limit the number of random documents to 16
//         ]);

//         if (data.length > 0) {
//             // Update product image URLs
//             data.forEach(product => {
//                 product.ProductImage = `http://localhost:4109/Image/${product.ProductImage}`;
//             });

//             res.json({ message: "success", data });
//         } else {
//             res.send("no data");
//         }
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };




const deleteProduct = async (req, res) => {
    try {
        const token = jwt.verify(req.token,process.env.JWT2);
        const deletedUser = await ProductSchema.findOneAndDelete(req.body);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Oneproductdisplay = async(req, res) => {
    try {
       const data = await ProductSchema.findById();
       data.forEach(element=>         {//192.168.190.131
         element.ProductImage[0]="http://192.168.190.131:4109"+`/Image/`+element.ProductImage[0]
       });
       if (data){
        res.json({
            messsage:"sucesss",
            data:data
        })
       }
       else{                                
        res.send("not data")
       }

    }
    catch (err) {
        console.log(err.massage)
        return res.json({ "msg": err.massage })
    }
}

//RANDOMcategory


const displayrandomcategory = async (req, res) => {
    try {
        const data = await ProductSchema.find({ category: req.params.category }); 
        data.forEach(element => {
            element.ProductImage[0] = "http://localhost:4109/Image/" + element.ProductImage[0];
        });
        
        if (data.length > 0) { 
            const randomProducts = [];
            const numProducts = 10;
            for (let i = 0; i < numProducts; i++) {
                const randomIndex = Math.floor(Math.random() * data.length); 
                const randomProduct = data[randomIndex];
                randomProducts.push(randomProduct);
            }
            res.json({
                message: "success",
                data: randomProducts 
            });
        } else {
            res.send("no data");
        }
    } catch (err) {
        console.log(err.message);
        return res.json({ "msg": err.message });
    }
};








module.exports = {deleteProduct, addproduct ,display,Oneproductdisplay,displayrandom,displayrandomcategory};


// const display = async (req, res) => {
//     try {
//         const data = await ProductSchema.find({ category: req.params.category }); 
//         data.forEach(element => {
//             element.ProductImage[0] = "http://192.168.190.131:4109/Image/" + element.ProductImage[0];
//         });
//         if (data.length > 0) { // Check if data exists
//             res.json({
//                 message: "success",
//                 data: data
//             });
//         } else {
//             res.send("no data"); // Sending "no data" if data is empty
//         }
//     } catch (err) {
//         console.log(err.message);
//         return res.json({ "msg": err.message });
//     }
// };

//RANDOM only one 
// const displayrandom = async (req, res) => {
//     try {
//         const data = await ProductSchema.find(); 
//         data.forEach(element => {
//             element.ProductImage[0] = "http://192.168.190.131:4109/Image/" + element.ProductImage[0];
//         });
        
//         if (data.length > 0) { // Check if data exists
//             const randomIndex = Math.floor(Math.random() * data.length); // Generate random index
//             const randomProduct = data[randomIndex]; // Get random product
//             res.json({
//                 message: "success",
//                 data: randomProduct // Return random product
//             });
//         } else {
//             res.send("no data"); // Sending "no data" if data is empty
//         }
//     } catch (err) {
//         console.log(err.message);
//         return res.json({ "msg": err.message });
//     }
// };


// const display = async(req, res) => {
//     try {
//        const data = await ProductSchema.find({category:"MCB"});
//        data.forEach(element=>         {//192.168.190.131
//          element.ProductImage[0]="http://192.168.190.131:4109"+`/Image/`+element.ProductImage[0]
//        });
//        if (data){
//         res.json({
//             messsage:"sucesss",
//             data:data
//         })
//        }
//        else{                                
//         res.send("not data")
//        }
 
//     }
//     catch (err) {
//         console.log(err.massage)
//         return res.json({ "msg": err.massage })
//     }
// }


const express = require("express");
var fs = require("fs");
var html = fs.readFileSync("billing.html", "UTF-8");
var pdf = require("pdf-creator-node");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const ordermodel = require("../../Model/OrderModel");




const addorder = async (req, res) => {
  try {
    const { orderItems, total, name, email, number, pincode, area, month } = req.body;

    const pdfDoc = new PDFDocument();
    const pdfBuffer = await new Promise((resolve, reject) => {
      let buffers = [];
      pdfDoc.on('data', (chunk) => buffers.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(buffers)));
      
      pdfDoc.fontSize(24).font('Helvetica-Bold').text('SHREE SHIVA ELECTRONICS', { align: 'center' }).moveDown();
      pdfDoc.fontSize(12).font('Helvetica-Bold').text(`NAME: ${name}`).moveDown();
      pdfDoc.font('Helvetica').text(`NUMBER: ${number}`).moveDown();
      pdfDoc.text(`EMAIL: ${email}`).moveDown();
      pdfDoc.moveDown();
      pdfDoc.fontSize(18).font('Helvetica-Bold').text('ORDER DETAILS', { align: 'center' }).moveDown();
      
  
      orderItems.forEach(item => {
        pdfDoc.fontSize(12).font('Helvetica-Bold').text('PRODUCT NAME');
        pdfDoc.fontSize(12).moveUp().font('Helvetica').text('                                        '+item.name);
        pdfDoc.font('Helvetica-Bold').text('PRICE');
        pdfDoc.moveUp().font('Helvetica').text('                       '+item.price.toString());
        pdfDoc.font('Helvetica-Bold').text('QUANTITY');
        pdfDoc.moveUp().font('Helvetica').text('                       '+item.quantity.toString());
        pdfDoc.font('Helvetica-Bold').text('SUBTOTAL');
        pdfDoc.moveUp().font('Helvetica').text('                       '+item.subTotal.toString());
        pdfDoc.moveDown();
      });
  
      pdfDoc.fontSize(12).font('Helvetica-Bold').text('TOTAL', { align: 'right', continued: true }).moveUp(0.10);
      
      pdfDoc.moveDown();
      pdfDoc.font('Helvetica-Bold').text(total.toString(), { align: 'right' }).moveDown();
      pdfDoc.end();
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "enter email",
        pass: "hzat dcmh yooz nyus"
      }
    });

    const orderPromises = orderItems.map(async item => {
      const order = new ordermodel({
        name,
        email,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        total,
        subTotal: item.subTotal,
        number,
        pincode,
        area,
        month
      });

      return order.save();
    });

    const savedOrders = await Promise.all(orderPromises); // Change variable name to savedOrders

    const mailOptions = {
      from: "enter email",
      to: email,
      subject: 'Order Details',
      html: `<h1>Explore the latest electronics at Shree Shiva Electronics online store.</h1>`,
      attachments: [{ filename: 'orderDetails.pdf', content: pdfBuffer }], // Attach PDF buffer
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order placed successfully and email sent' });
  
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const read = async (req, res) => {
  try {
    await ordermodel.find().then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ msssg: err.massage });
      });
  } catch (err) {
    return res.json({ msg: err.massage });
  } 
};
const readmonth = async (req, res) => {
  try {
    await ordermodel.find({ month: req.params.month }).then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ msssg: err.massage });
      });
  } catch (err) {
    return res.json({ msg: err.massage });
  } 
};
const read_id = async (req, res) => {
  try {
    await ordermodel.find({ _id: req.params._id }).then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ msssg: err.massage });
      });
  } catch (err) {
    return res.json({ msg: err.massage });
  } 
};
const oneread = async (req, res) => {
  try {
    await ordermodel
      .findOne(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ msssg: err.massage });
      });
  } catch (err) {
    return res.json({ msg: err.massage });
  }
};



module.exports = { addorder, read, oneread,read_id ,readmonth};

// const pdff = (req, res) => {
// const today = new Date();
// const year = today.getFullYear();
// let month = today.getMonth() + 1;
// month = month < 10 ? '0' + month : month;
// let day = today.getDate();
// day = day < 10 ? '0' + day : day;
// const formattedDate = `${day}-${month}-${year}`;
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('bill.pdf'));
//     doc.font('Helvetica-Bold').fontSize(20).text('Invoice', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(12).text(`Bill Date:${formattedDate}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Items:');
//     doc.moveDown();
//     doc.font('Helvetica').text('1. Product A - $');
//     doc.font('Helvetica').text('2. Product B - $20');
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Total: $30');
//     doc.end();
//     console.log('PDF bill generated successfully.');
//     }

// const addorder = async (req, res) => {
//     try {
//         // const token = jwt.verify(req.token, process.env.JWT1);
//         // const _id = token.CustomerId;

//         const body = req.body
//         const order = new ordermodel({

//             name: body.name,
//             email: body.email,
//             productName: body.productName,
//             price: body.price,
//             number: body.number,
//             pincode: body.pincode,
//             area: body.area,
//             quantity:body.quantity,
//             total:body.total,
//             subTotal:body.subTotal
//             // customer: _id
//         });
//         // const name =body.productName
//         // const price =body.price
//         // pdff(name)
//         //pdff(body.productName, body.price)
//         await order.save()
//             .then((result) => {
//                 return res.json(result)
//             }).catch((err) => {
//                 return res.json({ "msg": err })
//             });
//     } catch (error) {
//         console.error('error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
//////////////////////// PDF CODE //////////////////////////

// only pdf geraete html file readyy
// var items = [
//     {
//         itemName: "Shyam",
//         quantity: "55",
//         price: "123",
//         total: "11111"
//     }
// ];
// var aa = {
//     html: html,
//     data: {
//         users: items,
//     },
//     path: "./output.pdf",
//     type: "",
// };
// var options = {
//     format: "A3",
//     orientation: "portrait",
//     border: "10mm",
//     header: {
//         height: "45mm",
//         contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
//     },
//     footer: {
//         height: "28mm",
//         contents: {
//             first: 'Cover page',
//             2: 'Second page', // Any page number is working. 1-based index
//             default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//             last: 'Last Page'
//         }
//     }
// };
// const pdff = (req, res) => {
//     pdf.create(aa, options).then((res) => {
//         console.log(res);
//     }).catch((error) => {
//         console.error(error);
//     });

// }
// const addorder = async (req, res) => {
//   try {
//     const { orderItems, total } = req.body;
//     const body = req.body;
//     const orders = [];

//     for (const item of orderItems) {
//       const order = new ordermodel({
//         name: body.name,
//         email: body.email, // Use body.email instead of item.email
//         productName: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         total: total,
//         subTotal: item.subTotal,
//         number: body.number,
//         pincode: body.pincode,
//         area: body.area,
//       });

//       orders.push(await order.save());
//     }

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// const addorder = async (req, res) => {
//     try {
//         const token = jwt.verify(req.token, process.env.JWT1);
//         const _id = token.CustomerId;

//         const body = req.body
//         const order = new ordermodel({
//             name: body.name,
//             email: body.email,
//             productName: body.productName,
//             price: body.price,
//             number: body.number,
//             //address: body.address,
//             pincode: body.pincode,
//             city: body.city,
//             area: body.area,
//             //  quantity:body.quantity
//             customer: _id
//         });
//         await order.save().then((result) => {
//             return res.json(result)
//         }).catch((err) => {
//             return res.json({ "msg": err })
//         });
//     } catch (error) {
//         console.error('error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// const addorder = async (req, res) => {
//   try {
//     const { orderItems, total } = req.body;
//     const body = req.body;
//     const orders = [];

//     for (const item of orderItems) {
//       const order = new ordermodel({
//         name: body.name,
//         email: body.email, // Use body.email instead of item.email
//         productName: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         total: total,
//         subTotal: item.subTotal,
//         number: body.number,
//         pincode: body.pincode,
//         area: body.area,
//       });

//       orders.push(await order.save());
//     }
//     // Send email with PDF attachment
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//           user: "enter email",
//           pass: "enter email pass"}
//     });
//     const pdfDoc = new PDFDocument();
//     pdfDoc.pipe(fs.createWriteStream('orderDetails.pdf'));
//     pdfDoc.fontSize(12).text('Order Details:\n\n');
//     // Customize the content of the PDF as per your requirements
//     orders.forEach((order, index) => {
//       pdfDoc.text(`Order ${index + 1}:`);
//       pdfDoc.text(`Product Name: ${order.productName}`);
//       pdfDoc.text(`Price: ${order.price}`);
//       pdfDoc.text(`Quantity: ${order.quantity}`);
//       pdfDoc.text(`Subtotal: ${order.subTotal}\n`);
//     });

//     pdfDoc.text(`Total: ${total}`);
//     pdfDoc.end();

//     const mailOptions = {
//       from: "enter email ",
//       to:body.email,
//       subject: 'Password Reset',
//       Text: ` <h1>SHREE SHIVA ELECTRONIC </h1><p>dvmdkjvfndinvfid</p>`,
//       attachments: [{ filename: 'orderDetails.pdf', path: 'orderDetails.pdf' }],
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ message: 'Error sending email' });
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).json({ message: 'Order placed successfully and email sent' });
//       }
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
//THIS CODE IS TIME CONSUMOING
// const addorder = async (req, res) => {
//   try {
//     const { orderItems, total, name, email, number, pincode, area,month } = req.body;
//     const orders = [];

//     // Create PDF
//     const pdfDoc = new PDFDocument();
//     pdfDoc.fontSize(12).text('            Order Details:\n\n');
    
//     for (const item of orderItems) {
//       pdfDoc.text(`PRODUCT NAME =>        \n      ${item.name}\n\n`);
//       pdfDoc.text(`PRICE  =>               ${item.price}\n\n`);
//       pdfDoc.text(`QUANTITYV =>                ${item.quantity}\n\n`);
//       pdfDoc.text(`AREA =>                ${item.area}\n\n`);
//       pdfDoc.text(`SUBTITAL =>               ${item.subTotal}\n\n`);
//     }
    
//     pdfDoc.text(`\n              __TOTAL__                      `);
//     pdfDoc.text(`\n              ${total}                       `);
//     pdfDoc.end();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "enter email",
//         pass: "ntud iael xnbc lwvi"
//       }
//     });

//     for (const item of orderItems) {
//       const order = new ordermodel({
//         name,
//         email,
//         productName: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         total,
//         subTotal: item.subTotal,
//         number,
//         pincode,
//         area,
//         month
//       });

//       orders.push(await order.save());
//     }

//     const mailOptions = {
//       from: "enter email ",
//       to: email,
//       subject: 'Order Details',
//       html: `<h1>Explore the latest electronics at Shree Shiva Electronics online store.</h1>`,
//       attachments: [{ filename: 'orderDetails.pdf', content: pdfDoc }], // Provide PDF content here
//     };

//     await new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//           reject(error);
//         } else {
//           console.log('Email sent:', info.response);
//           resolve(info);
//         }
//       });
//     });

//     res.status(200).json({ message: 'Order placed successfully and email sent' });
  
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



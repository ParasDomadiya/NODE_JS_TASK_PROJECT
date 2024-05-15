const express = require('express')
const route = express.Router()

const {addorder,read,oneread,readmonth,read_id}= require('../Controller/Order/OrderController')
const {customerAccess} = require('../helper/Customerjwt')
const {paymant}= require('../helper/razorpay')



//route.post('/addorder',customerAccess,addorder);
route.post('/addorder',addorder);
route.get('/read',read);
// http://localhost:4109/OrderRouting/read

route.get('/read_id/:_id',read_id);
// http://localhost:4109/OrderRouting/read_id/

route.get('/readmonth/:month',readmonth);
// http://localhost:4109/OrderRouting/readmonth/

route.get('/oneread',oneread);
// http://localhost:4109/OrderRouting/addorder



route.post('/paymant',paymant);
// http://localhost:4109/OrderRouting/addorder



module.exports = route

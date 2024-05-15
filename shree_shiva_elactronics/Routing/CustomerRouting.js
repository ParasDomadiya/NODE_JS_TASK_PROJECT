var express = require('express')
var route = express.Router()
const {customerAccess} = require('../helper/Customerjwt')

const {registerCustomer,login,deleteCustomer,forgot_password1,updateCustomer,forgot_password} = require('../Controller/Customer/CustomerController')


route.post('/registerCustomer',registerCustomer);
// http://localhost:4109/CustomerRouting/registerCustomer
// {
//     "firstname":"pars",
//     "lastname":"lastname",
//     "email":"email",
//     "phone":1234567890,
//     "UserName":"paras",
//     "password":"password" 
// }
route.post('/loginCustomer',login)
// http://localhost:4109/CustomerRouting/loginCustomer
// {
//     "UserName":"paras",
//     "password":"password"
// }
route.patch('/updateCustomer',customerAccess,updateCustomer)
// http://localhost:4109/CustomerRouting/updateCustomer

route.patch('/forgot_password',customerAccess,forgot_password)
// http://localhost:4109/CustomerRouting/forgot_password


route.patch('/forgot_password1',customerAccess,forgot_password1)
// http://localhost:4109/CustomerRouting/forgot_password1

route.delete('/deleteCustomer',customerAccess,deleteCustomer)
// http://localhost:4109/CustomerRouting/deleteCustomer
//route.delete('/deleteCustomer',deleteCustomer)


const {Contactcustomer,ContactRead,ContactDelete} = require('../helper/ContactUS')
route.post('/Contactcustomer',Contactcustomer);
// http://localhost:4109/CustomerRouting/Contactcustomer


route.get('/ContactRead',ContactRead);
// http://localhost:4109/CustomerRouting/ContactRead



route.delete('/ContactDelete',ContactDelete);
// http://localhost:4109/CustomerRouting/ContactDelete

module.exports = route


var express = require('express')
var route = express.Router()
const { Productupload } = require('../helper/fileuplode')
const adminauthGaurd = require('../helper/Admintoken')



const { Oneproductdisplay, addproduct, display, deleteProduct, displayrandom, displayrandomcategory } = require('../Controller/Productcontroller')
/*              ADMIN  ALL PRODUCT ADD             */
route.post('/addproduct', Productupload.single('image'), addproduct);
//http://localhost:4109/AdminRouting/addproduct

route.get('/displayrandomcategory/:category', displayrandomcategory);
//http://localhost:4109/AdminRouting/displayrandomcategory/:category

//route.get('/display', display); // ONLY ....find() mate


route.get('/display', display);
//http://localhost:4109/AdminRouting/display/

//find mate
route.get('/display/:category', display);
//http://localhost:4109/AdminRouting/display/:category

route.get('/displayrandom', displayrandom);
//http://localhost:4109/AdminRouting/displayrandom

/*              ADMIN  ONE PRODUCT FIND             */
route.get('/Oneproductdisplay', Oneproductdisplay);
//http://localhost:4109/AdminRouting/Oneproductdisplay

route.delete('/deleteProduct', adminauthGaurd, deleteProduct);
// http://localhost:4109/AdminRouting/deleteProduct






// admin data add ,remove
const { readAllorder,deleteOrder, forgot_password1, readOneProduct, readAllProduct, allCustomerread, registerAdmin, loginadmin, updateData, deleteadmin, getalladmin, forgot_password } = require('../Controller/Admin/admin')
route.post('/registerAdmin', registerAdmin);
// http://localhost:4109/AdminRouting/registerAdmin
// {
//     "firstName":"dharmik",
//     "lastName": "dharmik",
//     "email": "dharmik",
//     "number": "1234567890",
//     "username": "dharmik",
//     "password": "dharmik"
// }

route.post('/loginadmin', loginadmin);
// http://localhost:4109/AdminRouting/loginadmin
// {
//     "username": "dharmik",
//     "password": "dharmik"
// }

route.put('/updateData', adminauthGaurd, updateData);
// http://localhost:4109/AdminRouting/updateData


route.delete('/deleteadmin', adminauthGaurd, deleteadmin);
// http://localhost:4109/AdminRouting/deleteadmin


route.get('/getalladmin', getalladmin);
// http://localhost:4109/AdminRouting/getalladmin


route.put('/forgot_password', adminauthGaurd, forgot_password);
// http://localhost:4109/AdminRouting/forgot_password


route.put('/forgot_password1', adminauthGaurd, forgot_password1);
// http://localhost:4109/AdminRouting/forgot_password1




/*             READ ALL CUSTOMERS FOR ADMIN               */
route.get('/allCustomerread', allCustomerread);
// http://localhost:4109/AdminRouting/allCustomerread


/*             READ ALL Product FOR ADMIN               */
route.get('/readAllProduct', readAllProduct);  
// http://localhost:4109/AdminRouting/readAllProduct


/*             READ ONE Product FOR ADMIN               */
route.get('/readOneProduct', readOneProduct);
// http://localhost:4109/AdminRouting/readOneProduct


/*             READ ALL order FOR ADMIN               */
route.get('/readAllorder', readAllorder);
// http://localhost:4109/AdminRouting/readAllorder




route.delete('/deleteOrder/:id', deleteOrder);
 //http://localhost:4109/AdminRouting/deleteOrder/
 



// route.delete('/deleteOrder/:orderId', deleteOrder);
// // http://localhost:4109/AdminRouting/deleteOrder/:orderId



module.exports = route
const express= require('express');
const routes=express.Router();
const {veryfyjwt}= require('../models/users');
const {addCart,getUserCart}= require('../controllers/cartController');


//veryfyjwt انه ما بقدر اضيف او احذف او تعديل على السلة الا اذا كان معايا token
routes.get('/getCart',veryfyjwt,getUserCart);
routes.post('/addCart',veryfyjwt,addCart);

module.exports = routes;

const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();
const {veryfyjwt}= require('../controllers/userControllers');
const {addCart,getUserCart}= require('../controllers/cartController');


//veryfyjwt انه ما بقدر اضيف او احذف او تعديل على السلة الا اذا كان معايا token
routes.get('/getCart',veryfyjwt,getUserCart);
routes.post('/addCart',veryfyjwt,addCart);

module.exports = routes;

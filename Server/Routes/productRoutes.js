    // الصفحه المتعبقه بالروابط  
// غالبا الصفحات التي يجري عليها تعديل هي routes,controller
const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();

const {getProduct,creatProduct}=require('../controllers/productcontroller'); //كل ما اعمل POST ,GET لازم اكتب اسم FUN هون


routes.get('/produts',getProduct);
routes.post('/produts',creatProduct);

module.exports=routes;


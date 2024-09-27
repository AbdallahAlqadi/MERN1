    // الصفحه المتعبقه بالروابط  
// غالبا الصفحات التي يجري عليها تعديل هي routes,controller
const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();

const {getProduct,creatProduct,creatProductpost,Productsbetween,UpdateProducts,getProductbyid,DeletProductbyid}=require('../controllers/productcontroller'); //كل ما اعمل POST ,GET لازم اكتب اسم FUN هون


routes.get('/produts',getProduct);
routes.post('/produts',creatProduct);
routes.post('/produts/category',creatProductpost);
routes.post('/produts/salary',Productsbetween);
// لازم ابعت id موجود مع الرابط

routes.put('/produts/:id',UpdateProducts);
// لازم ابعت id موجود مع الرابط

routes.get('/produts/:id',getProductbyid);
routes.delete('/produts/:id',DeletProductbyid);


module.exports=routes;


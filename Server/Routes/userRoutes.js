    // الصفحه المتعبقه بالروابط  
// غالبا الصفحات التي يجري عليها تعديل هي routes,controller
const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();

const {getUsers,creatUser, getUsersName,userLogin}=require('../controllers/userControllers'); //كل ما اعمل POST ,GET لازم اكتب اسم FUN هون


routes.get('/users',getUsers);
routes.post('/users',creatUser);
routes.get('/users/names',getUsersName);
routes.post('/users/login',userLogin);

module.exports=routes;
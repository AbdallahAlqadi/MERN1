const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();

const {createSignup,getSignup,Deletsignupbyid,Updatesignup}=require('../controllers/signupcontroller'); //كل ما اعمل POST ,GET لازم اكتب اسم FUN هون
routes.post('/signup',createSignup);
routes.get('/signup/users',getSignup);
routes.delete('/signup/:id',Deletsignupbyid);
routes.put('/signup/update/:id',Updatesignup);



module.exports=routes;
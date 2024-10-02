const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();

const {createSignup,getSignup,Deletsignupbyid}=require('../controllers/signupcontroller'); //كل ما اعمل POST ,GET لازم اكتب اسم FUN هون
routes.post('/signup',createSignup);
routes.get('/signup/users',getSignup);
routes.delete('/signup/:id',Deletsignupbyid);



module.exports=routes;
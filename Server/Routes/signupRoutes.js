const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();

const {createSignup}=require('../controllers/signupcontroller'); //كل ما اعمل POST ,GET لازم اكتب اسم FUN هون
routes.post('/signup',createSignup);

module.exports=routes;
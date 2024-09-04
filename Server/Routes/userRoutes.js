const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();
const {getUsers}=require('../controllers/userControllers.js');


routes.get('/users',getUsers);
module.exports=routes;
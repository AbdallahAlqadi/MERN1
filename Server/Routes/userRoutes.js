
const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();
const {getUsers,creatUser}=require('../controllers/userControllers');


routes.get('/users',getUsers);
routes.post('/users',creatUser);

module.exports=routes;
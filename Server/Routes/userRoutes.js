
const express=require('express')
const cors=require('cors');
const routes=express.Router();
require('dotenv').config();
const {getUsers,creatUser, getUsersName}=require('../controllers/userControllers');


routes.get('/users',getUsers);
routes.post('/users',creatUser);
routes.get('/users/names',getUsersName);

module.exports=routes;
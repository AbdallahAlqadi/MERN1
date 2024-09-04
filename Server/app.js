const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const userRoutes=require('./Routes/userRoutes')

dotenv.config();
const app=express();
connectDB();
app.use(bodyparser.json());
app.use(cors());
app.use('/api',userRoutes)
module.exports=app;

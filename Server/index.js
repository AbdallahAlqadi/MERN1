// backend fromwork
const express=require('express')
// DB
const mongoose=require('mongoose')
// Routes
const bodyparser=require('body-parser')
// midedelware:to make the front-end able to send requst
const cors=require('cors');
// TO TAKE VARIBALE  FROM  THE .ENV FILE
require('dotenv').config();

// THE MAIN APP
const app=express();
app.use(bodyparser.json());

app.use(cors());
mongoose.connect(process.env.MONGO_URI,{


    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>console.log("Connected to MongoDB")).catch(err=>console.log(err))

app.get('/test',(req,res)=>{
    res.send('Hello from the Server1....');
})



const PORT=process.env.PORT||5001;
app.listen(PORT,()=>{

    console.log(`Server Running on port ${PORT}`);
})


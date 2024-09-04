const mongoose=require('mongoose')
require('dotenv').config();


const connectDB=async ()=>{

    try{
        mongoose.connect(process.env.MONGO_URI,{

            useNewUrlParser:true,
            useUnifiedTopology: true
        }).then(()=>console.log("Connected to MongoDB"))
        .catch(err=>console.log(err));}
     
catch(error){
console.error(`Error connectiong to MongoDB: ${error.message}`)
process.exit(1);
}
    
}
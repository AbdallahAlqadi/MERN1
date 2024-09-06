
const mongoose=require('mongoose')

//انه اي user بدي اضيفه لازم يحتوي على username,phone
const userSchema=new mongoose.Schema({
username:{type:String,required:true},
phone:{type:Number,required:true}

})

const User=mongoose.model('users',userSchema);

module.exports=User;
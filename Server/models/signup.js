
const mongoose=require('mongoose')

//انه اي user بدي اضيفه لازم يحتوي على username,phone
const signupSchema=new mongoose.Schema({
username:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true}

})

const Signup=mongoose.model('signups',signupSchema);

module.exports=Signup;
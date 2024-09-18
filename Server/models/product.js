
const mongoose=require('mongoose')

//انه اي user بدي اضيفه لازم يحتوي على username,phone
const ProductSchema=new mongoose.Schema({
name:{type:String,required:true},
salary:{type:Number,required:true}

})

const Product=mongoose.model('product',ProductSchema);

module.exports=Product;
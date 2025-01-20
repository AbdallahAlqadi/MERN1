
//متعلقه بكل طلبيه او محتوى السله

const mongoose=require('mongoose');
const cartSchema= new mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
//products بتمثل المنتجات ككل او الطلبيه كامله
products:[{
    //productId بتمثل المنتج المحدد,quantity
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'products',required:true},
    quantity:{type:Number,default:1,required:true}
}]

});

// الاسم اللي سوف يتم استخدامه في قاعدة البيانات
const Cart=mongoose.model('carts',cartSchema);
module.exports=Cart;
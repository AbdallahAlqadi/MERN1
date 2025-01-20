const Cart=require('../models/cartModels');
const Product=require('../models/product')

exports.getUserCart= async(req,res)=>{
    try {
       const cart=await Cart.findOne({userId:req.user});
       res.status(200).json(cart);
    }

    catch(error){
res.status(500).json({error: error.message});
    }
}


exports.addCart= async(req,res)=>{
    const {productId,quantity}=req.body;
    const userId=req.user;

    try{
        let cart=await Cart.findOne({userId})
        if(!cart){
            cart=new Cart({
                userId,
                productId:[]})
    }
    //بشوف اذا المنتج موجود او لا 
    const productIndex= cart.products.findbyIndex((p)=>p.productId===productId);
    if(productIndex>-1){
        //اذا بدي اضيف نفس المنتج مره ثانيه في نفس الكرت رح يعدل الكميه فقط
        cart.products[productIndex].quantity+=quantity;
}
else{
//اذا المنتج مش موجود رح اضيفه 
    cart.products.push({productId,quantity});
}
await cart.save();
res.status(200).json(cart);

}
    catch(error){
        res.status(500).json({error: error.message});
    
    }
}
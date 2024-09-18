const Product=require('../models/product')

//في مرحله get غالبا بس بستخدم res
//get
exports.getProduct=async (req,res)=>{
try{
    const products=await Product.find();

    console.log(products)  //معناها انه اظهرلي الناتج داخل TERMENAL وليس داخل INSPECT
    res.json(products);
}

catch(error){
    res.status(500).json({error:error.message});
}
}



 
//Post
exports.creatProduct=async (req,res)=>{
const {name,salary}=req.body;

try{
    const newProduct={name:name,salary:salary};
console.log(newProduct)
//مهمه لاجيب البيانات من post to get
const dbProduct=await Product.create(newProduct)//مشان اقدر اوصل للمعلومات يلي كتيتها ب postman

res.status(200).json({message:`user Created successfully ${dbProduct}`});


}
catch(error){
    res.status(400).json({message});
}
}




//بتعمل فلتره ل data حسب category
exports.creatProductpost=async (req,res)=>{
    try{
       const postcategory=req.body.category;
       const products=await Product.find({category:postcategory})
       res.status(200).json(products);

    }
    catch(error){
        res.status(400).json({message});
    }
    }




//ما بعمل EXPORT  IN END PAGE
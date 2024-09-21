const Product=require('../models/product')

//في مرحله get غالبا بس بستخدم res


//بجيبلي كل data يلي ب mongodb الخاصه ب products
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


//find : بستخدمها ب (get) مشان استدعي data من DB
//find : بستخدمها ب (post) لما بدي اعمل filter او مثلا بدي استدعي user يلي اعمارهم من 35-40
//creat:  لما بدي اضيف OBJ بشكل يدوي
 
//Post
//هاظ الكود انا بكتبه obj 
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
//لما بدي اعمل fillter ل dataموجوده عندي باستخدتم post
//بعمل filter على data موجوده بDB بس بشرط اضيف شرط في postman
exports.creatProductpost=async (req,res)=>{
    try{
       const postcategory=req.body.category;
       //انه رح يبحث عن category يلي اسمها category1
       const products=await Product.find({category:postcategory})
       res.status(200).json(products);

    }
    catch(error){
        res.status(400).json({message});
    }
    }




    //بدي يلي salary الهم بين 12-19  
    //بدي استخدم post
    exports.Productsbetween=async (req,res)=>{
        try{
            // القيم يلي بدو يجيبها من postman
           const lowsalary=req.body.lowsalary;
           const maxsalary=req.body.maxsalary;
           console.log(lowsalary,maxsalary)


//بجيب كل obj يلي price الهم بين 10-20
           const productssal=await Product.find({salary:{$gte:lowsalary,$lte:maxsalary}})
           res.status(200).json(productssal);
    
        }
        catch(error){
            res.status(400).json({message});
        }
        }



//لازم ابعت id مع الرابط 
//لازم ابعت القيم لجديده يلي بدي اعدلها
exports.UpdateProducts=async(req,res)=>{

    try{
const id=req.params.id;
const body=req.body;
console.log(body)
const updateproduct=await Product.findByIdAndUpdate(id,body,{new:true})
res.status(200).json(updateproduct)
    }

    catch(error){
        res.status(500).json({error:error.message});

    }
}







//بعرض data يلي id الها نفس يلي حطيته بالرابط
//
exports.getProductbyid=async (req,res)=>{
    try{
        const id=req.params.id;
        const selectproduct=await Product.findOne({_id: id})
    res.status(200).json(selectproduct);
    }
    
    catch(error){
        res.status(500).json({error:error.message});
    }
    }



//ما بعمل EXPORT  IN END PAGE
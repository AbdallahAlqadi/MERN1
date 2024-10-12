const User=require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//في مرحله get غالبا بس بستخدم res
//get
exports.getUsers=async (req,res)=>{
try{
    const users=await User.find();

    console.log(users)  //معناها انه اظهرلي الناتج داخل TERMENAL وليس داخل INSPECT
    res.json(users);
}

catch(error){
    res.status(500).json({error:error.message});
}
}



 
//Post
exports.creatUser=async (req,res)=>{
const {username,phone,password}=req.body;

try{
    const  hashedPassword=await bcrypt.hash(password,10);

    const newUser={username:username,phone:phone,password:hashedPassword};
console.log(newUser)
//مهمه لاجيب البيانات من post to get
const dbUser=await User.create(newUser)//مشان اقدر اوصل للمعلومات يلي كتيتها ب postman

res.status(200).json({message:`user Created successfully ${dbUser}`});


}
catch(error){
    res.status(400).json({message:error.message});
}
}




//اذا بدي اعرض جزء من كل obj
//هون بستدعي username,id
exports.getUsersName = async (req, res) => {
    try {
        const users = await User.find();
        console.log('this is a function to get users names');
        
        const usernames = users.map(user => {
            const obj = { username: user.username,id:user.id};
            console.log(obj); 
            return obj;
        });
        
        res.json(usernames);
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






//ما بعمل EXPORT  IN END PAGE

exports.userLogin=async(req,res)=>{
    const {username,password}=req.body;
    try{

       const user=await User.findOne({username})
       if(!user){
        return res.status(400).json({message:'username is not found'})
       }


       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch){
        return  res.status(400).json({message:'wrong username and pass' })

       }

       const  token=jwt.sign({userId:user._id},'fdfdfsddsdffeqweqqeqeqeqweq',{
        expiresIn:'1h'
       });
       res.status(200).json({message:'user Found',token})
       

    }
    catch(error){
        res.status(500).json({error:error.message})
    }

}
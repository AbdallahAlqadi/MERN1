const User=require('../models/users')

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
const {username,phone}=req.body;

try{
    const newUser={username:username,phone:phone};
console.log(newUser)
//مهمه لاجيب البيانات من post to get
const dbUser=await User.create(newUser)//مشان اقدر اوصل للمعلومات يلي كتيتها ب postman

res.status(200).json({message:`user Created successfully ${dbUser}`});

}
catch(error){
    res.status(400).json({message});
}
}




//اذا بدي اعرض جزء من كل obj
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
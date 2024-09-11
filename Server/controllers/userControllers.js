const User=require('../models/users')

//في مرحله get غالبا بس بستخدم res
exports.getUsers=async (req,res)=>{
try{
    const users=await User.find();
    console.log(users)
    res.json(users);

}
catch(error){
    res.status(500).json({error:error.message});
}
}



exports.creatUser=async (req,res)=>{
const {username,phone}=req.body;

try{
    const newUser={username:username,phone:phone};
console.log(newUser)
const dbUser=await User.create(newUser)

res.status(200).json({message:`user Created successfully ${dbUser}`});

}
catch(error){
    res.status(400).json({message});
}
}



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

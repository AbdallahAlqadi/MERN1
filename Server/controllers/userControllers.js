const User=require('../models/users')

//في مرحله get غالبا بس بستخدم res
exports.getUsers=async (req,res)=>{
try{
    const users=await User.find();
    res.json(users);

}
catch(error){
    res.status(500).json({error:error.message});
}
}
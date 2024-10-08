const Signup = require('../models/signup');

//creat:بستخدمها لما بدي  انزل بياناتي في داتابيز   او اضييف بيانات

//find:لما بدي اعمل read ل البيانات او احذفها او  تعديلها



//post
//ببعت Data ل backend
exports.createSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newSignup = { username, email, password };
        console.log(newSignup);
        
        const dbSignup = await Signup.create(newSignup);
        
        res.status(200).json({ message: `User created successfully: ${dbSignup}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//get

exports.getSignup=async (req,res)=>{
    try{
        const signup=await Signup.find();
    
        console.log(signup)  //معناها انه اظهرلي الناتج داخل TERMENAL وليس داخل INSPECT
        res.json(signup);
    }
    
    catch(error){
        res.status(500).json({error:error.message});
    }
    }
    





    //Delete
    exports.Deletsignupbyid = async (req, res) => {
        try {
          const id = req.params.id;
          const deletuser = await Signup.findOneAndDelete({ _id: id }); // شرط الحذف بناءً على id
          res.status(200).json(deletuser);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
    



//update

exports.Updatesignup=async(req,res)=>{
    //مكس بين get  و post

    try{

const id=req.params.id;
//لازم  ابعت القيم لجديده يلي بدي اعدلها
const body=req.body;
console.log(body)
const updatesignup=await Signup.findByIdAndUpdate(id,body,{new:true})
res.status(200).json(updatesignup)
    }

    catch(error){
        res.status(500).json({error:error.message});

    }
}
const Signup = require('../models/signup');




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
          const deletproduct = await Product.findOneAndDelete({ _id: id }); // شرط الحذف بناءً على id
          res.status(200).json(deletproduct);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
    
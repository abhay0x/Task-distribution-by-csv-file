const admin=require("../models/adminSchema");

//register controller for use in route
const register=async(req,res)=>{
    const{email,password}=req.body;
    const alreadyuser=await admin.findOne({email:email});
    if(alreadyuser){
       return res.json({message:"user Already Present"});
    }
   
    const user=await admin.create({
        email,
        password
    })
    if(user){
        res.json({
            message:"user created successfully",
            token: await user.generateToken(),
            userid: user._id,
            user 
        })
       
    } 
    else{
            res.send("invalid")
        }

}
//login controller for use in route
const login=async(req,res)=>{
    const{email,password}=req.body;
    const userdata=await admin.findOne({email:email});
    if(!userdata){
        return res.json({message:"user is not exist"})
    }
    if(userdata.password == password){
      

        return res.json({
            message:"user Logged in successfully",
            token: await userdata.generateToken(),
            userid: userdata._id,
            userdata

        })
    }
    else{
        return res.json({message:"userid or password incorrect!"});
    }

}

module.exports={register,login};
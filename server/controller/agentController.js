const agent=require("../models/agentSchema");

const add=async(req,res)=>{
    const {name,email,mobile,password}=req.body;
    const data=await agent.create({
        name,
        email,
        mobile,
        password
    })

    if(data){
       return res.json({
            message:"agent add success !",
            data
        })
    }
    else{
        return res.json({message:"error: agent not added "})
    }
}
module.exports={add};



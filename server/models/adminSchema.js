//import the modules 
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
//import the env file 
require('dotenv').config();

//creating the schema
const adminSchema=mongoose.Schema({
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
})

//jwt method  define

adminSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
           
        },
       process.env.JWT_SECRET
    )
    } catch (error) {
        console.error(error)
    }
    }

//export the module for use outside

module.exports=new mongoose.model("admin",adminSchema);
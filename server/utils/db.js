const mongoose=require("mongoose");
//import the env file
require('dotenv').config();

//function for connecting the database
const connection=async()=>{
    try {
        const conn=await mongoose.connect(process.env.URI);

        if(conn){
            console.log("db is connected")
        }
        else{
            console.log("db is not connected");
        }
    } catch (error) {
        console.log(error.message);
    }
}
module.exports={connection};
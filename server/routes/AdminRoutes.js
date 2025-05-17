const express=require("express");
const  adminRoute=express();
//import the controller functions
const  admin=require("../controller/adminController");
const agent=require("../controller/agentController")
//Authentication routes
adminRoute.post("/register",admin.register);
adminRoute.post("/login",admin.login);
//Add agents route
adminRoute.post("/addagent",agent.add);

//export the module for use
module.exports=adminRoute; 

 
//exporting the express to initialize the app
const express=require('express');
const app=express();
const mongoose=require("mongoose");
//middleware to use json file extentions
app.use(express.json());

const db=require("./utils/db");
//import the env file
require('dotenv').config();
db.connection();

//import the the routes 
const admin=require("./routes/AdminRoutes");
app.use("/",admin);

const task=require("./routes/taskroute");
app.use("/",task);
//Application listen
app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
})
const express=require("express");
const dotenv=require("dotenv");// for secure port credentials secure credentials
const morgan=require("morgan");//For allowing to log requests
const bodyParser=require("body-parser");
const path= require('path');
const app= express();
const connectDB=require('./server/database/connection')//DB Connection support
dotenv.config({path:'config.env'})//Getting PORT from config.env file
const PORT=process.env.PORT || 8080 //if the we dont have port number then automatically 8080 port will takes  play

//log Requests
app.use(morgan("tiny"))

//MongoDB Connection
connectDB()

//Parse request to bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//Set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname, "views/ejs"));)

//load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css")));// under css folder if we have file like style.css we can access that instead of /css we can write /css/style.css
app.use("/image",express.static(path.resolve(__dirname,"assets/images")));// under images folder if we have images like png or svg we can get
app.use("/js",express.static(path.resolve(__dirname,"assets/js")));// under css folder if we have file like style.js we can access that instead of /js we can write /css/style.js


//Instead of keeping routers here we kept those in the routes folder-router.js
//Now we are getting files from server folder 
app.use("/",require("./server/routes/router"))
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const port=process.env.PORT||3000;

const app= express();






app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({
    extended:true
}));
 
app.get("/",function(req,res){
   
    res.render("home");
});





app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));








const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();
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
app.get("/register",function(req,res){
   
    res.render("register");
});

app.get("/login",function(req,res){
   
    res.render("login");
});


app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));







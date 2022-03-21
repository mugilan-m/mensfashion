
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
 

//mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true })
// mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true });
const DB ="mongodb+srv://mugilan:19csr111@cluster0.jcb36.mongodb.net/userdb?retryWrites=true&w=majority";
mongoose.connect(DB 
 ).then(()=>{
    console.log("connection successfull");
}).catch((err)=>console.log(err));

const userSchema =new mongoose.Schema({

    username:String,
    email:String,
    password:String
    
});

const User = new mongoose.model("user",userSchema);






app.get("/",function(req,res){
   
    res.render("home");
});
app.get("/register",function(req,res){
   
    res.render("register");
});

app.get("/login",function(req,res){
   
    res.render("login");
});

app.get("/index",function(req,res){
   
    res.render("index");
});


app.post("/register",function(req,res){
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    newUser.save(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect("index");
        }
    })
})

app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));







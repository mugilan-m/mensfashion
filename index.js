
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();
// const store = require("./multer.js");
const store = require("./multer");
const port=process.env.PORT||3000;
const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require("process");
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
const addproducts =new mongoose.Schema({

    name:String,
    size:String,
    image:String,
    color:String,
    price:String,
    dprice:String,
    discription:String
    
});





const User = new mongoose.model("user",userSchema);

const Addproducts = new mongoose.model("products",addproducts);

app.get("/",function(req,res){
   
    res.render("home");
}); 
app.get("/register",function(req,res){
   
    res.render("register");
});
app.get("/product",function(req,res){
   
    res.render("product");
});
app.get("/db",function(req,res){
    res.render("db");
})
app.get("/login",function(req,res){
   
    res.render("login");
});

app.get("/index",function(req,res){
   
    res.render("index");
});
// app.get("/addproducts",function(req,res){
   
//     res.send("<h1>mens fashion</h1>");
// });

app.get("/index",function(req,res){
   
    res.render("index");
});
app.get("/admin",function(req,res){
   
    res.render("admin");
});
app.get("/main",function(req,res){
    res.render("main");
})
app.get("/shirts",function(req,res){
    res.render("shirts");
})
app.get("/collections",function(req,res){
    res.render("collections");
})
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
            res.render("login");
        }
    })
})
app.post("/login",function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email},function(err,foundUser){
        if(err)
        {
            console.log(err);
        }
        else{
            if(foundUser)
            {
                if(foundUser.password === password)
                {
                    console.log(foundUser);
                    res.render("main",{username:username});
                }

            }
        }
    })
})
app.post("/addproducts",store.single('image'),function(req,res){
    console.log(req.file);

    const temp = fs.readFileSync(req.file.path);
    const imageBase64 = "data:"+req.file.mimetype+";base64,"+temp.toString('base64');
  //  console.log(imageBase64);

    const product = new Addproducts({
        name:req.body.name,
        size:req.body.size,
        image:imageBase64,
        color:req.body.color,
        price:req.body.price,
        dprice:req.body.dprice,
        discription:req.body.discription
        
    });
    product.save(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        // else{
        //     console.log(product);
        //     // res.send("<h1>product added successsfully!!</h1>");
        // }
        else {
            
            Addproducts.find({},function(err,found)
          {  if(err)
            {
              
            }
            else
            {
            //  console.log(found);
             res.render("products",{detail:found});
            }
        });
          
        }
       
    })
})
//delete
app.delete("/userdb/:products/:._id", function(req, res, next) {
    req.products.removeById(req.params.id, function(err, output) {
      if (err) {
        return next(err);
      }
      res.send(output === 1 ? { msg: "success" } : { msg: "error" });
    });
  });


app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));







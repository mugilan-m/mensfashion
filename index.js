
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
    discription:String,
    type:String
    
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
app.get("/index",function(req,res){
    res.render("index");
})
app.get("/login",function(req,res){
   
    res.render("login");
});

app.get("/index",function(req,res){
   
    res.render("index");
});
 app.get("/addproducts",function(req,res){
   
     res.render("addproducts");
 });
 app.get("/products",function(req,res){
   
    res.render("products");
});

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
app.post("/products",store.single('image'),function(req,res){
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
        discription:req.body.discription,
        id:req.body.id,
        type:req.body.type
        
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

// app.get("/delete/._id",function(req,res){
//     product.deleteOne(
//         {id:req.params.id},
//         function(err){
//             if(!err)
//             {
//                 res.send("product deleted successfully");
//                 console.log("product deleted successfully");
//             }
//             else
//             {
//                 res.send(err);
//             }
//         }
//     );
// });
/* DELETE product. */

//   app.get('id', (req, res, next) => {
//     const id = req.params.id;
//     product.deleteOne(id, (err) => {
//      if (err) return next(err);
//      res.send({ message: 'Deleted' });
//     });
//    });
//   //
  app.post("/delete",function(req,res)
  {
      console.log(req.body.id);
      Addproducts.deleteOne({_id:req.body.id},function(err)
      {
          if(!err)
          {
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
    console.log("deleted");
   //res.redirect("products");
          }



      });

  });

  app.post("/update",function(req,res)
  {
    console.log(req.body.id);
    Addproducts.updateOne({_id:req.body.id},{name:req.body.name},{},function(err)
    {
        if(!err)
        {
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
  console.log("deleted");
 //res.redirect("products");
        }



    });
    

  });
//
app.post("/show",function(req,res)
{
var type=req.body.type;
console.log(type);

Addproducts.find({type:type},function(err,found){
if(!err)
{
    res.render("show",{detail:found});
}
});
});

app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));







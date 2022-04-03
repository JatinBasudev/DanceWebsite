const express=require('express');
const path=require('path');
const app=express();
const mongoose = require('mongoose');
const port=80;

// connecting nodejs and mongodb
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/newdata');
}
// creating schema for storing data in a collection
var contactSchema=new mongoose.Schema({
    name:String,
    age:Number,
    phone:Number,
    email:String,
    address:String,
    concern:String
});
// compiling schema to model
var userInfo=mongoose.model('userInfo',contactSchema);
// EXPRESS SPECIFIC STUFF
app.use(express.static('public'));    // middleware for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug')    //setting pug as the template engine for the express app
app.set('views',path.join(__dirname,'views'));    //setting the views directory to keep our .pug files

// ENDPOINTS
app.get('/',(req,res)=>{
    let params={'user':'login'};
    res.status(200).render('home',params);
});
app.get('/login',(req,res)=>{
    res.status(200).render('contact');
});
 app.post('/login',(req,res)=>{
     var info=new userInfo(req.body);
     info.save((err,info)=>{
         if(err) console.log(err);
         else{
             res.status(200).send("data stored in database");
         }
     });
 });

// STARTING SERVER
app.listen(port,()=>{
    console.log("Express app listening on port 80");
});

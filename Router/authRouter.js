const e = require("express");
const authRouter=e.Router();
const userModel=require('../models/userModel')
var jwt=require("jsonwebtoken");
const JWT_KEY=require('../view/secret')
authRouter
.route('/signup')
.get(getSignup)
.post(postSignup);

authRouter
.route('/login')
.post(LoginUser);

function getSignup(req,res){
    res.sendFile("/public/index.html",{root:__dirname});
    // res.json();
}


async function postSignup(req,res){   
    // let { email,name,password } = req.body;
   try{
    let data=req.body;
    console.log('in postsignup')
    let user=await userModel.create(data);
    console.log(data);
    res.json({
        msg:"user signed up",
        user
        // email, 
        // name,
        // password
    })
}
catch(err){
    res.json({
       err:err.message
    })
}
}

async function LoginUser(req,res){
   try{
     let { email,password } = req.body;
    let user=await userModel.findOne({email:email});
    if(user){
        //check if password matches
        
        if(password==user.password){
         let uid=user["_id"];
            var token=jwt.sign({payload:uid},JWT_KEY);
            res.cookie("login",token);
            res.json({
         msg:"user logged in"
        });
        }
    else{
    res.json({
        msg:"wrong credentials",
    });
 } 
}
 else {
    res.json({
        msg:'user not found',
    })
}
}
catch(err){
    res.json({
       err:err.message,
    })
}
}

module.exports=authRouter;
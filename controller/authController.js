const express =require('express');
const userModel=require('../models/userModel')
var jwt=require("jsonwebtoken")
const {JWT_KEY}=require('../view/helper')



module.exports.signup=async function (req,res){   
    // let { email,name,password } = req.body;
   try{
    let data=req.body;//np password
    console.log('in postsignup')
    let user=await userModel.create(data);
    if(user){
        res.json({
            msg:"user signed up",
            user,
            // email, 
            // name,
            // password
        })
    }
    else{ 
    res.json({
        msg:"user could not be signed up"
    });
}
   
}
catch(err){
    res.json({
       err:err.message
    })
}
}

module.exports.login=async function (req,res){
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

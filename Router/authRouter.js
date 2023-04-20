const e = require("express");
const authRouter=e.Router();
const userModel=require('../models/userModel')
var jwt=require("jsonwebtoken");
const {JWT_KEY}=require('../view/helper ')
// authRouter
// .route('/signup')
// .get(getSignup)
// .post(postSignup);

// authRouter
// .route('/login')
// .post(LoginUser);



module.exports=authRouter;
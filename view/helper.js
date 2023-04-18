var jwt=require('jsonwebtoken')
const {JWT_KEY}=require('../view/secret')

module.exports.protectRoute=function (req,res,next){
    if(req.cookies.login){
        let token=req.cookies.login;
        let isVerified=jwt.verify(token,JWT_KEY);
       if(isVerified) next();
       else{
        req.json({
            msg:"user not verified",
        })
       }
    }
    else{
    return res.json({
        msg:"operation not allowed ",
    })
    }
    }

    
//isAuthorised=p? check the users role
module.exports.isAuthorised=function(roles){
    return function(req,res,next){
       let role=req.role;
       if(roles.includes(role)){
        next();
       }
       res.status(401).json({
        msg:"operation not allowed"
       })
    }
}
    
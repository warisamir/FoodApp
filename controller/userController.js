const  {Model} = require('mongoose');
const userModel=require('../models/userModel')
module.exports.getUsers =async function (req,res){
    // console.log(req.query);
    try{
    // let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    let id=req.params.id;
    let user=await userModel.findById(id)
   
    res.json({msg:"users retreived", users});
    }
    catch(err){
        res.json({
          msg:err.message  
        })
    }
    //  res.send(user);
    // console.log('getUser called');
    //  next();
}

// module.exports.postUser=function(req, res){
//     console.log(req.body.Name);
//     //then i can put this in db 
//     user.push(req.body);
//     res.json({
//         message: "Data received successfully",
//         user: req.body
//     });
// }

module.exports.updateUser= async function (req, res){
    console.log(req.body);
    let id=req.params.id;  
     let dataToBeUpdated = req.body;
    //  {
    //    name:"waris",
    //    email:"warisamir1918@gmail.com" 
    // }
    let user=await userModel.findById(id);
    try{
    if(user){
      const keys=[]  //give name & email filled
      for (key in dataToBeUpdated) {
       keys.psuh(key)
    }
    for(let i=0;i<key.length;i++){
        user[keys[i]]=dataToBeUpdated[keys[i]]
    }
    const updatedata=await user.save();
 
    // let doc=await userModel
    // .findOneAndUpdate({email:"abc@gmail.com"},
    // dataToBeUpdated);
    res.json({
        message: "data updated succesfully",
        updatedata
    });
}
    else{
        res.json({
            message:"user not found",
        });
    }
}
catch(err){
    res.json({
        message:err.message,
    })
}
}

module.exports.deleteUser =async function (req, res){
    // let dataToBedeleted=req.body;
    // let doc=await userModel.findOneAndDelete("{"email":"abc=@gmail.com"});
   try{
    let id=req.params.id;
    let user=await userModel.findByIdAndDelete(id)
    res.json({
        msg: "user has been deleted",user
    });
}
catch(err){
    res.json({
        msg:err.message,
    });
}
}

module.exports.getAllUser= async function (req, res){
 try{  
    let allUsers= await userModel.find();
   res.json({
         msg: "user id is ",allUsers
         });
}
catch(err){
    res.json({
        msg:err.message,
    });
}
} 

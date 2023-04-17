const userModel=require('../models/userModel')
module.exports.getUsers =async function (req,res){
    console.log(req.query);
    // let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    let allUsers=await userModel.find( )
   
    res.json({msg:"users retreived", allUsers});
    //  res.send(user);
    // console.log('getUser called');
    //  next();
}

module.exports.postUser=function(req, res){
    console.log(req.body.Name);
    //then i can put this in db 
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

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
    const updatedDAta=await user.save();
 
    // let doc=await userModel
    // .findOneAndUpdate({email:"abc@gmail.com"},
    // dataToBeUpdated);
    res.json({
        message: "data updated succesfully",
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
    let doc =await userModel.findOneAndRemove({"email":"akshay@gmail.com"})
    console.log(doc)
    res.json({
        msg: "user has been deleted",
    });
}

module.exports. getUserById=function (req, res){
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", "obj": req.params });
}

module.exports.setCookies=function (req,res){
    res.cookie('IsloggedIn',false,{maxAge:10000,secure:true})
    res.cookie('password',12345678,{secure:true})
    res.send("cookie has been set");
}
module.exports.getCookies=function (req,res){
    let cookies=req.cookies.password;
    console.log(cookies);
    res.send("cookie received")
 }

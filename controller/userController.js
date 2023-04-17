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
    let dataToBeUpdated = req.body;
    // for (key in dataToBeUpdated) {
    //     user[key] = dataToBeUpdated[key];
    // }
    let doc=await userModel.findOneAndUpdate({email:"abc@gmail.com"},
    dataToBeUpdated);
    res.json({
        message: "data updated succesfully"
    })
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

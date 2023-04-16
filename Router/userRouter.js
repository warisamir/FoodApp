const e = require("express");
const userRouter=e.Router();


userRouter.route("/")
.get(middleware1,getUsers)
.post(postUser).patch(updateUser)
.delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getcookies").get(getCookies);

userRouter.route("/:name").get(getUserById);

function middleware1(req,res,next){
    console.log("middleware 1 called");
    next();
}

async function getUsers(req,res){
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    let allUsers=await userModel.findOne({name:"Abhishek"})
   
    res.json({msg:"users retreived", allUsers});
    //  res.send(user);
    // console.log('getUser called');
    //  next();
}

function postUser(req, res){
    console.log(req.body.Name);
    //then i can put this in db 
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

async function updateUser(req, res){
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

async function deleteUser(req, res){
    // let dataToBedeleted=req.body;
    // let doc=await userModel.findOneAndDelete("{"email":"abc=@gmail.com"});
    let doc =await userModel.findOneAndRemove({"email":"akshay@gmail.com"})
    console.log(doc)
    res.json({
        msg: "user has been deleted",
    });
}

function getUserById(req, res){
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", "obj": req.params });
}

function setCookies(req,res){
    res.cookie('IsloggedIn',false,{maxAge:10000,secure:true})
    res.cookie('password',12345678,{secure:true})
    res.send("cookie has been set");
}
function getCookies(req,res){
    let cookies=req.cookies.password;
    console.log(cookies);
    res.send("cookie received")
 }

 module.exports=userRouter
// (async function createUser(){
//     let user={
//          name:"Abhishek",
//          email:"a2@gmail.com",
//          password:"waris",
//          confirmPassword:"waris"
//     };
//     let data=await userModel.create(user);
//     console.log(data)
// })();

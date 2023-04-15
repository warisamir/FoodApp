const express = require('express');
const app = express();
//this is frst contri
const mongoose=require("mongoose")
const db_link=require('./secret');
const validate  = require('email-validator');

app.use(express.json());

let user = [
  {
    id: 1,
    name: "Abhishek",
    age: 100,
  },
  {
    id: 2,
    name: "Rajat",
    age: 10,
  },
  {
    id: 3,
    name: "Sunjyot",
    age: 50,
  },
];

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user', userRouter);
app.use("/auth", authRouter);

userRouter
    .route("/")
    .get(middleware1,getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/:name")
    .get(getUserById);

authRouter
    .route('/signup')
    .get(getSignup)
.post(postSignup)
//with query
// app.get('/user', )

// app.post('/user', );

// app.patch('/user', );

// app.delete('/user', )

//params
// app.get('/user/:name', );
function middleware1(req,res,next){
    console.log("middleware 1 called");
    next();
}
// function middleware2(req,res){
//     console.log("middleware 2 is called");
//     // res.json({msg:"user returned "});
// }
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
app.listen(5000);

mongoose.connect(db_link).then(function(db){
    console.log("db connected")
    // console.log(db);
}).catch(function(err){
    console.log(err)
});

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return validate.validate(this.email);
        },
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:4,
        validate:function(){
            return this.confirmpassword==this.password
        }
    },
});
// ------------learning hoooks
// userSchema.pre("save",function(){
//     console.log("before saving in db");
// })
// userSchema.post("save",function(){
//     console.log("after saving in db");
// })

userSchema.pre(save,function(){
    this.confirmpassword==undefined;
})
const userModel=mongoose.model("userModel",userSchema);

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






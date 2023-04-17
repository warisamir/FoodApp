const e = require("express");
const userRouter=e.Router();

const {getUsers,updateUser,
    setCookies,getCookies
    ,getUserById,
    deleteUser,postUser}=require('../controller/userController')

const {protectRoute}=require('../view/helper')

userRouter.route("/") 
.get(protectRoute,getUsers)
.post(postUser).patch(updateUser)
.delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getcookies").get(getCookies);

userRouter.route("/:name").get(getUserById);

// let IsLoggedIn =false;
//.isadmin cookie can be used to identify b/w user and admin

 module.exports=userRouter;
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

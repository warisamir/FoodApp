const e = require("express");
const userRouter = e.Router();
const userModel = require("../models/userModel");
const {
  getUsers,
  updateUser,
  getAllUser,
  deleteUser,
  postUser,
} = require("../controller/userController");

// const {protectRoute}=require('../view/helper')
const {
  signup,
  login,
  forgetpassword,
  logout,
  resetpassword,
} = require("../controller/authController");
const { isAuthorised, protectRoute } = require("../helper");
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signup);

// userRouter.route('/forgetpassword')
// .post(signup);

userRouter.route("/forgetpassword").post(forgetpassword);

userRouter.route("/resetpassword/:token").post(resetpassword);

userRouter.route("/logout").get(logout);
//profile page
userRouter.use(protectRoute);

// const{signup,login}=require('../controller/authController')
userRouter.route("/profilePage").get(getUsers);
//admin specific
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/all").get(getAllUser);

// let IsLoggedIn =false;
//.isadmin cookie can be used to identify b/w user and admin

module.exports = userRouter;
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

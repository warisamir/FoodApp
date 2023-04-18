const e = require("express");
const userRouter=e.Router();

const {getUsers,updateUser,
    getAllUsers,
    deleteUser,postUser}=require('../controller/userController')

const {protectRoute}=require('../view/helper')
const{signup,login}=require('../controller/authController')
userRouter.
route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter.route('/login')
.post(login);

userRouter.route('/signup')
.post(signup);

//profile page
app.use(protectRoute)
.get(getUser)

const{signup,login}=require('../controller/authController')
userRouter
.route('/userProfile')
.get(getUsers)
//admin specific
app.use(isAuthorised(['admin']));
userRouter.route('')
.get(getAllUsers)




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

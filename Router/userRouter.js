const e = require("express");
const userRouter=e.Router();

const {getUsers,updateUser,
    setCookies,getCookies
    ,getUserById,getAllUsers,
    deleteUser,postUser}=require('../controller/userController')

const {protectRoute}=require('../view/helper')

userRouter.
route('/:id')
.patch(updateUser)
.delete(deleteUser)

//profile page
app.use(protectRoute)
.get(getUser)
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

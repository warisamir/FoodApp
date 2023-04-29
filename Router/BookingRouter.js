const express=require("express");
const bookingRouter=express.Router()
const {protectRoute}=require("../view/helper")
const {createSession}=require('../controller/bookingController');
bookingRouter
.route("/createSession").get(function (req,res){
    res.sendFile('C:/Users/waris amir/Desktop/FoodApp/view/booking.html')
});
bookingRouter.use(protectRoute)
bookingRouter.route("/createSession").post(createSession);

module.exports=bookingRouter;
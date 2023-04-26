
const mongoose=require("mongoose")
const {db_link}=require('../view/secret');
const validate  = require('email-validator');
const bcrypt=require('bcrypt')
// console.log(db_   link)
const uuidv4 =require("uuid");
mongoose.
connect(db_link).then(function(){
    console.log("userdb connected")
    // console.log(db);
})
.catch(function(err){
    console.log(db_link);
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
    role:{
        type:String,
        enum:['admin','user','resturantowner','deliveryBoy'],
        default:'user',
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpg'
    },
    resetToken:String
});

userSchema.pre("save",function(){
    this.confirmpassword=undefined;
});

//  userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     console.log(salt);
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })
userSchema.methods.createResetToken=function(){
    const resetToken=uuidv4();
    this.resetToken=resetToken;
    return resetToken;
}
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}
const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel; 
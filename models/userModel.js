const mongoose=require("mongoose")
const db_link=require('../secret');
const validate  = require('email-validator');
const bcrypt=require('bcrypt')

mongoose.
connect(db_link).then(function(db){
    console.log("db connected")
    // console.log(db);
})
.catch(function(err){
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

userSchema.pre("save",function(){
    this.confirmpassword==undefined;
});

//  userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     console.log(salt);
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })

const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel; 
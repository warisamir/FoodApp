const mongoose = require("mongoose");
const { db_link } = require("../secret");
const validate = require("email-validator");
const bcrypt = require("bcrypt");
// console.log(db_   link)
const { v4: uuidv4 } = require("uuid");
mongoose
  .connect(db_link)
  .then(function () {
    console.log("userdb connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(db_link);
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return validate.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  confirmpassword: {
    type: String,
    // required:true,
    minlength: 4,
    validate: function () {
      return this.confirmpassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "resturantowner", "deliveryBoy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpg",
  },
  resetToken: {
    type: String,
  },
});

userSchema.pre("save", function () {
  this.confirmpassword = undefined;
});

//  userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     console.log(salt);
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
//     this.confirmpassword=undefined;
// })
userSchema.methods.createResetToken = async function () {
  const resetToken = uuidv4();
  this.resetToken = resetToken;
  console.log("pumba", this);
  // this.confirmPassword=this.password;
  await this.save();
  return resetToken;
};
userSchema.methods.resetPasswordHandler = function (password, confirmpassword) {
  this.password = password;
  this.confirmpassword = confirmpassword;
  this.resetToken = undefined;
};
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

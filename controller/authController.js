const express = require("express");
const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../secret");
console.log("1234", JWT_KEY);
const { sendMail } = require("./utility/nodemailer");
module.exports.signup = async function (req, res) {
  // let { email,name,password } = req.body;
  try {
    let data = req.body; //np password
    console.log("in postsignup");
    let user = await userModel.create(data);
    if (user) {
      //send mail
      await sendMail("signup", data);
      res.json({
        msg: "user signed up",
        user,
        // email,
        // name,
        // password
      });
    } else {
      res.json({
        msg: "user could not be signed up",
      });
    }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      //check if password matches

      if (password == user.password) {
        let uid = user["_id"];
        var token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token);
        res.json({
          msg: "user logged in",
        });
      } else {
        res.json({
          msg: "wrong credentials",
        });
      }
    } else {
      res.json({
        msg: "user not found",
      });
    }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};
module.exports.forgetpassword = async function (req, res) {
  try {
    let { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      const resetToken = await user.createResetToken();
      console.log("forget", resetToken);
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/user/resetpassword/${resetToken}`;
      await sendMail("forgetpassword", { email, resetPasswordLink });
      res.json({
        msg: "email sent successfully",
      });
    } else {
      res.json({
        msg: `user not found`,
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};

module.exports.resetpassword = async function (req, res) {
  try {
    const token = req.params.token;
    f;
    console.log("0987", token);
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        msg: "password change successfully",
      });
    } else {
      res.json({
        msg: "user not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};
module.exports.logout = function (req, res) {
  res.cookie("login", "", { maxAge: 1 });
  res.json({
    msg: "user logged out successfully",
  });
};
// module.exports.isAuthorised=function(roles){
//    return function(req,res,next){
//     let role=req.role;
//     if(roles.includes(role)){
//         next();
//     }
//     res.status({
//         msg:'operation not alloowed'
//     })
//    }

// }

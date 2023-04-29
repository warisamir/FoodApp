"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail=async function sendMail(str,data) {



    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "warisamir1918@gmail.com", // generated ethereal user
      pass: "noomfqrzbpdqpibu", // generated ethereal password
    },
  });
  let esubj,ehtml;
  if(str=='signup'){
    esubj=`thank u for signing up ${data.name}`
    ehtml=`
    <h1>welcome to foodApp.com</h1>
     hope you have a great experience
    here are your details </br>
    name -${data.name}
    Email- ${data.email}`
  }
  else if(str=="forgetpassword"){
    esubj=`reset password`
    ehtml=`
    <h1>foodApp.com</h1>
    here is your link to reset pasword
    :${data.resetPasswordLink}`
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 👻" <warisamir1918@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: esubj, // Subject line
    // text: esubj, // plain text body
    html:ehtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendMail().catch(console.error);

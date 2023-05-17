const mongoose = require("mongoose");
const { db_link } = require("../secret");
const validate = require("email-validator");
const bcrypt = require("bcrypt");
// console.log(db_   link)
const uuidv4 = require("uuid");
mongoose
  .connect(db_link)
  .then(function () {
    console.log("review db connected");
    // console.log(db);
    //last time 
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review is required"],
    maxlength: [260, "review length should not exceed more than 260 character"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "User must logged in"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: [true, "plan must belong to a user"],
  },
});

/*find findbyId findoneandupdate 
this type of function call then 
this hook work and populate the whole array*/
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});
const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;

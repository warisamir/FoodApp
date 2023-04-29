const express = require("express");

const reviewRouter=express.Router();
const reviewModel = require("../models/reviewModel");
const {getAllReviews,getReview,createReview,updateReview,deleteReview,top3Reviews}=require('../controller/reviewController')
const { protectRoute, isAuthorised } = require("../view/helper");

reviewRouter
.route('/all')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3Reviews)


// reviewRouter
// .use(isAuthorised(['admin','resturantowner']))

reviewRouter.use(protectRoute); 
reviewRouter
.route("/crud/:plan")
.post(createReview)
.patch(updateReview)
.delete(deleteReview)


reviewRouter
.route('/:id')
.get(getReview)

module.exports=reviewRouter
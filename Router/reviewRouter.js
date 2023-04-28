const express = require("express");

const reviewRouter=express.Router();
const reviewModel = require("../models/reviewModel");
const {getAllReviews,getReview,createReview,updateReview,deleteReview,top3Review}=require('../controller/reviewController')
const { protectRoute, isAuthorised } = require("../view/helper");

reviewRouter
.route('/reviews')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3Reviews)
.route('/:id')
.get(getReview)

// reviewRouter
// .use(isAuthorised(['admin','resturantowner']))

reviewRouter.use(protectRoute);
reviewRouter
.route('/crud:/plan')
.get(createReview)
.patch(updateReview)
.delete(deleteReview)
module.exports=reviewRouter
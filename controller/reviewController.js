const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel")

module.exports.getAllReviews=async function (req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            res.json(
                {
                    msg:"review retrieved",
                    reviews
                }
            )
        }
        else{
            res.json({
                msg:"Reviews not found"
            })
        }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.top3Reviews=async function (req,res){
    try{
        const top3=await reviewModel.find().sort({rating:-1}).limit(3);
        if(top3){
            res.json(
                {
                    msg:"review retrieved",
                    top3
                }
            )
        }
        else{
            res.json({
                msg:"Reviews not found"
            })
        }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.getReview=async function (req,res){
    try{
        const planId=req.params.id;
        let reviews=await reviewModel.find();
        reviews=reviews.filter(review=>review.plan["_id"]==planId);
        if(reviews){
            res.json(
                {
                    msg:"review retrieved",
                    reviews
                }
            )
        }
        else{
            res.json({
                msg:"Reviews not found"
            })
        }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}
 
module.exports.createReview=async function (req,res){
    try{
        console.log("inside create");
        const planId=req.params.plan;
       
        const plan=await planModel.findById(planId)
         const review=req.body;
         const postReview=await reviewModel.create(review);
        //  plan.ratingsAverage=(plan.ratingsAverage*plan.nor+req.body.rating)/(plan.nor+1);
        //  plan.nor+=1;
        //  await plan.save();
         await postReview.save();
            res.json(
                {
                    msg:"review posted",
                    postReview
                }
            )
    }
    catch(err){
        res.status(500).json({
            msg:err.message
        })
    }
}

module.exports.updateReview=async function(req,res){
    try {
        let planId=req.params.plan;//plans review being updated
       
        let id =req.body.id;//review needs to be updated
        let datatobeupdate=req.body;
        let keys=[];
         for(let key in datatobeupdate){
            if(key==id)continue;
            keys.push(key)
         }
        //  keys.includes("ratings")
         //use reviews rating to calculate average rating
         let review =await reviewModel.findById(id);
         for(let i=0;i<keys.length;i++){
            review[keys[i]]=datatobeupdate[keys[i]];
         }
         await review.save();
         return res.json({
            msg:"plan successfully updated",
            review
         })
    } catch (err) {
        return res.json({
            msg:err.message
        })
    }
}

module.exports.deleteReview=async function (req,res) {
    try {
       let planId=req.params.plan;
       let id=req.body.id;
       let review =await reviewModel.findByIdAndDelete(id);
       res.json({
        mesage:"review deleted",
        review
       }) 
    } catch (err) {
       return res.json({
        msg:err.message,
       }) 
    }
}
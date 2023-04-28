
const mongoose=require("mongoose")
const {db_link}=require('../view/secret');

// console.log(db_link)
mongoose.
connect(db_link).then(function(){
    console.log("plandb connected")
    // console.log(db);
})
.catch(function(err){
    console.log(db_link);
    console.log(err)
});
const planSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,`plan name should not exceed more than 20 character`]
    },
    duration:{
        type:Number,
        required:true 
    },
    price:{
        type:Number,
        required:[true,`price not  entered`]
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        },`discount should not be 100%`]
    },
    ratingsAverage:{
        type:Number,
    }
})
const planModel=mongoose.model("planModel",planSchema);
module.exports=planModel;
// (async function createPlan(){
//     let plan ={
//         name:"superman2024",
//         duration:3,
//         price:9000,
//         ratingsAverage:2.7,
//         discount:10
//     }
//     //create make a instance of model values 
//     let data=await planModel.create(plan)
//     // console.log(data);
//     // const doc=new planModel(plan);
//     // await doc.save();
// })()




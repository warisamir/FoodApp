let sk="sk_test_51N20t6SCYYm7DoWyx05QtU0iXKqPfFZhPMpaL15lhCJQBN7lDBKD9uk1jBe1TAnEdPYTBsUEiU6JRhlpqxNjCS8700Sj8D2pjn"
const stripe=require('stripe')(sk);
const planModel=require("../models/planModel")
const userModel=require("../models/userModel")

module.exports.createSession=async function (req,res){
    try{
        // let userId=req.id;
        // let planId=req.params.id;
        // const user =await userModel.findById(userId);
        // const plan=await planModel.findById(planId);
        
        const session = await stripe.checkout.sessions.create({
            // payment_method_type:['card'],
            // customer_email:user.email,
            // client_refrence_id:plan.id,
              line_items: [
                {
                  price_data: {
                    currency: 'inr',
                    product_data: {
                      name: 'T-shirt',
                    },
                    unit_amount: 1234,
                  },
                  quantity: 1,
                },
              ],
              mode: 'payment',
              mode: 'payment',
            success_url:`${req.protocol}://${req.get("host")}/profile`,
            cancel_url:`${req.protocol}://${req.get("host")}/profile`,
          }); 
          // res.json({
          //   msg:"success",
          //   session
          // })
          res.redirect(300,session.url)
    }
    catch(err){
res.json({
err:err.message
})
    }
}


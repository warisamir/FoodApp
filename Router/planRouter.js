const express = require("express");

const planRouter = express.Router();
const planModel = require("../models/planModel");
const {
  getAllPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  top3Plans,
} = require("../controller/planController");
const { protectRoute, isAuthorised } = require("../helper");

planRouter.route("/allPlans").get(getAllPlans);

//logged in not neccessary
planRouter.route("/top3").get(top3Plans);

planRouter.use(protectRoute);
//check whether logged in or not

planRouter.route("/plan/:id").get(getPlan);

planRouter.use(isAuthorised(["admin", "resturantowner"]));
//check which role loggied member have

planRouter.route("/crud").post(createPlan);

planRouter.route("/crud/:id").patch(updatePlan).delete(deletePlan);

module.exports = planRouter;

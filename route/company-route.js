import express from "express";
import { add, getAllAppliedUser, list } from "../controllers/Company/JobController.js";
import { jobRequest } from "../request/Comapny/JobRequest.js";
import { getProfile, updateProfile } from "../controllers/Company/ProfileController.js";
import { updateCompanyProfileRequest } from "../request/Comapny/UpdateCompnayProfile.js";
import { getAllPlan } from "../controllers/Company/PlanController.js";
import { buySubscription, webHook } from "../controllers/Company/SubscriptionController.js";

const companyRouter = express.Router();
companyRouter.post('/job/add', jobRequest, add);
companyRouter.put('/job/:id/update', jobRequest, add);
companyRouter.get('/job/all', list);
companyRouter.get('/job/all-applied-users', getAllAppliedUser);
companyRouter.get('/profile',getProfile);
companyRouter.put('/update-profile',updateCompanyProfileRequest,updateProfile);
companyRouter.get('/all-plans',getAllPlan);
companyRouter.post('/buy-subscription',buySubscription);
companyRouter.post('/get-webhook',webHook);

export default companyRouter;
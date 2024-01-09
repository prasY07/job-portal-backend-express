import express from "express";
import { applyForJob, getAllJobs, removeApplicationFromJob } from "../controllers/User/JobController.js";
import { getProfile, updateProfile } from "../controllers/User/ProfileController.js";
import { updteUserProfileRequest } from "../request/User/UpdateUserProfile.js";


const userRouter = express.Router();

userRouter.get('/jobs/all',getAllJobs);
userRouter.post('/jobs/apply-for-job',applyForJob);
userRouter.post('/jobs/remove-application-for-job',removeApplicationFromJob);
userRouter.get('/profile',getProfile);
userRouter.put('/update-profile',updteUserProfileRequest,updateProfile);
export default userRouter;
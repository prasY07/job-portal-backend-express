import { listPagination } from "../../config/constant.js";
import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Job from "../../models/Job.js";
import { JobResource } from "../../resource/JobResource.js";


export const getAllJobs = async (req, res, next) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = listPagination;
        const allJobs = await Job.find().populate('technologies')
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        const totalItems = await Job.countDocuments();
        const totalPages = Math.ceil(totalItems / perPage);
        const data = await JobResource(allJobs);
        return res.status(200).json(successWithPagination(data, currentPage, totalPages));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const removeApplicationFromJob = async (req, res, next) => {

    try {
        console.log("sadsadsa");
        const {job_id} = req.body;

        const checkJob = await Job.findById(job_id);
        if (!checkJob) {
            return res.status(404).json(errorResponse("Job not found"));
        }

        const user = req.user;
        console.log('user',user._id);
        if (!checkJob.applied_users.includes(user._id)) {
            return res.status(403).json(errorResponse("Not applied for job"));
        }
        checkJob.applied_users.pop(user._id);
        await checkJob.save();
        return res.status(200).json(successResponse("remove from applicaiton"));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const applyForJob = async (req, res, next) => {

    try {
        const {job_id} = req.body;
        console.log('job_id',job_id);

        const checkJob = await Job.findById(job_id);
        // console.log('checkJob',checkJob);
        if (!checkJob) {
            return res.status(404).json(errorResponse("Job not found"));
        }

        const user = req.user;

        if (checkJob.applied_users.includes(user._id)) {
            return res.status(403).json(errorResponse("Already Applied"));
        }
        checkJob.applied_users.push(user._id);
        await checkJob.save();
        return res.status(200).json(successResponse("Application save successfully"));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}
import { listPagination } from "../../config/constant.js";
import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Job from "../../models/Job.js";
import Technology from "../../models/Technology.js";
import { JobResource, appliedUsersResource, singleJobResource } from "../../resource/JobResource.js";

export const list = async (req, res, next) => {

    try {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = listPagination;
        const user = req.user;
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


export const add = async (req, res, next) => {

    try {
        const { title, description, technologies, exp_in_years, exp_in_month } = req.body;
        await Technology.find({ _id: { $in: technologies } })
            .exec().catch((err) => {
                return res.status(500).json(errorResponse("Invalid Technology"));
            });

        const job = new Job({
            title,
            description,
            technologies,
            exp_in_month,
            exp_in_years,
            added_by: req.user.id
        });

        await job.save();
        const createdJob = await singleJobResource(job);
        return res.status(200).json(successResponse(createdJob, "Job added successfully"));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}



export const update = async (req, res, next) => {

    try {
        const technologyId = req.params.id;
        const companyId = req.user._id;
        const { title, description, technologies, exp_in_years, exp_in_month } = req.body;
        await Technology.find({ _id: { $in: technologies } })
            .exec().catch((err) => {
                return res.status(500).json(errorResponse("Invalid Technology"));
            });

        const getJob = await Job.findById({ companyId });
        if (!getJob) {
            return res.status(500).json(errorResponse("Invalid Job"));

        }
        getJob.title,
            getJob.description,
            getJob.technologies,
            getJob.exp_in_month,
            getJob.exp_in_years,

            await getJob.save();
        const updatedJob = await singleJobResource(getJob);
        return res.status(200).json(successResponse(updatedJob, "Job update successfully"));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const getAllAppliedUser = async (req, res, next) => {
    try {
        const jobId = req.query.id;
        const companyId = req.user._id;
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = listPagination;

        const job = await Job.findOne({ _id: jobId, added_by: companyId })
        .populate('applied_users')
        .exec();

        if (!job) {
            return res.status(404).json(errorResponse("Job not found"));
    }
        const applications = job.applied_users.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );


        const totalItems =  job.applied_users.length;
        const totalPages = Math.ceil(totalItems / perPage);

        const appliedUsers = await appliedUsersResource(applications);
        return res.status(200).json(successWithPagination(appliedUsers,currentPage,totalPages));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}
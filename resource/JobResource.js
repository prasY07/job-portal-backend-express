import Technology from "../models/Technology.js";
import { singleTechnologyShortResource, technologyShortResource } from "./TechnologyResource.js";

export const singleJobResource = async (job) => {
    const jobData = {
        id: job._id,
        title: job.title,
        description: job.description,
        exp_in_years: job.exp_in_years,
        exp_in_month: job.exp_in_month,
        technologies: await Promise.all(
            job.technologies.map(async (techId) => {
                const tech = await Technology.findById(techId);
                return singleTechnologyShortResource(tech);
            })
        ),
    };

    return jobData;
};

export const JobResource = async (jobs) => {
    const jobData = await Promise.all(jobs.map(async (job) => {
        return {
            id: job._id,
            title: job.title,
            description: job.description,
            exp_in_years: job.exp_in_years,
            exp_in_month: job.exp_in_month,
            technologies: await technologyShortResource(job.technologies),
        };
    }));

    return jobData;
};


export const appliedUsersResource = async (applications) => {

    return await applications.map((application) => {
   
        const userName = application.name;
        const userId = application._id;
        const userEmail = application.email;
        
        return {
            name: userName,
            id: userId,
            email: userEmail
        };
    });
}

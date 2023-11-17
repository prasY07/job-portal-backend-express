import { listPagination } from "../../config/constant.js";
import { createSlug } from "../../helpers/CustomFunction.js";
import { errorResponse, successResponse, successWithPagination, successWithTokenResponse } from "../../helpers/ResponseBuilder.js";
import Technology from "../../models/Technology.js";
import { singleTechnologyShortResource, technologyShortResource } from "../../resource/TechnologyResource.js";

export const list = async (req, res, next) => {

  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = listPagination;
    try {
      const items = await Technology.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .exec();
      const totalItems = await Technology.countDocuments();
      const totalPages = Math.ceil(totalItems / perPage);
      const data = await technologyShortResource(items);

      return res.status(200).json(successWithPagination(data, currentPage, totalPages))
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'OOPS! something went wrong' });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponse("OOPS! something went wrong"));
  }

}


export const addTechnology = async (req, res, next) => {

  try {

    const { name } = req.body;
    const slug = await createSlug(name);
    const existingTechnology = await Technology.findOne({ slug });
    if (existingTechnology) {
      return res.status(409).json(errorResponse("Technology already exists"));
    }
    const technology = new Technology({
      name,
      slug
    });
    technology.save();
    const data = await singleTechnologyShortResource(technology)
    return res.status(200).json(successResponse(data, "Technology added successfully"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponse("OOPS! something went wrong"));
  }
}


export const updateTechnology = async (req, res, next) => {

  try {
    const technologyId = req.params.id;
    const { name } = req.body;

    const slug = await createSlug(name);

    const existingTechnology = await Technology.findOne({ slug, _id: { $ne: technologyId } });
    if (existingTechnology) {
      return res.status(409).json(errorResponse("Technology already exists"));
    }
    let updatedTechnology = await Technology.findById(technologyId);

    if (!updatedTechnology) {
      return res.status(404).json(errorResponse('Technology not found'));
    }
    updatedTechnology.name = name;
    updatedTechnology.slug = slug;
    updatedTechnology = await updatedTechnology.save();
    const data = await singleTechnologyShortResource(updatedTechnology)

    return res.status(200).json(successResponse(data));
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponse("OOPS! something went wrong"));
  }
}



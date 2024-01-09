
export const technologyShortResource = async(technologyData) => {
    return technologyData.map((tech) => {
        return { id: tech._id, name: tech.name,slug: tech.slug };
      });
}

export const singleTechnologyShortResource = async(technologyData) => {
    return { id: technologyData._id, name: technologyData.name,slug: technologyData.slug };
}
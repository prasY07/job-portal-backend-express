import slugify from "slugify";

export const createSlug = async(name) => {
    const slug =  slugify(name, {
        replacement: '-',
        lower: true, 
      });
      return slug;
}
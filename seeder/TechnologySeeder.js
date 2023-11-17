import { createSlug } from '../helpers/CustomFunction.js';
import Technology from '../models/Technology.js';

export const technologySeeder = async () => {
  const technologies = [
    {
      name: 'PHP',
    },
    {
      name: 'JavaScript',
    },
    {
      name: 'Python',
    },
  ];
  for (const tech of technologies) {
    try {
      const { name } = tech;
      const slug = await createSlug(name);
      const updatedTechnology = await Technology.findOneAndUpdate(
        { slug: slug },
        { name: name, slug: slug },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error inserting/updating technology:', error);
    }
  }
}





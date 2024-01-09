import Plan from '../models/Plan.js';

export const planSeeder = async () => {
  const plans = [
    {
      name: 'Basic',
      price : 100,
      duration:1
    },
    {
      name: 'Advance',
      price : 150,
      duration:2
    },
    {
      name: 'Premium',
      price : 500,
      duration:6

    },
  ];
  for (const plan of plans) {
    try {
 
      const filter = { name: plan.name, price: plan.price , duration:plan.duration};
      const update = { name: plan.name, price: plan.price , duration:plan.duration};
      const options = { upsert: true, new: true };
      const newPlan = await Plan.findOneAndUpdate(filter, update, options);
    } catch (error) {
      console.error('Error inserting/updating plan:', error);
    }
  }
}





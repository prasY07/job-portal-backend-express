import Plan from '../models/Plan.js';

export const planSeeder = async () => {
  const plans = [
    {
      name: 'Basic',
      price : 100
    },
    {
      name: 'Advance',
      price : 200
    },
    {
      name: 'Premium',
      price : 500

    },
  ];
  for (const plan of plans) {
    try {
 
      const filter = { name: plan.name, price: plan.price };
      const update = { name: plan.name, price: plan.price };
      const options = { upsert: true, new: true };
      const newPlan = await Plan.findOneAndUpdate(filter, update, options);
    } catch (error) {
      console.error('Error inserting/updating plan:', error);
    }
  }
}





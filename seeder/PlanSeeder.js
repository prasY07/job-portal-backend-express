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
      const newPlan = await Plan.findOneAndUpdate(
        { name: plan.plan, price:plan.price },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error inserting/updating plan:', error);
    }
  }
}





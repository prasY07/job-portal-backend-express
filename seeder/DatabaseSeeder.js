import connectToDatabase from '../database.js'; // Import the database connection
import { adminSeeder } from './AdminSeeder.js';
import { planSeeder } from './PlanSeeder.js';
import { technologySeeder } from './TechnologySeeder.js';
console.log('Start Seeder');

// Connect to the database
await connectToDatabase();

await adminSeeder();
await technologySeeder();
await planSeeder();

console.log('Complete Seeder');
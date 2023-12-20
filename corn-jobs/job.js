import pkg from 'node-cron';

import { performJob } from "./job1.js";
const cron = pkg;

cron.schedule('* * * * *', () => {
  console.log('here');
    performJob();
  });
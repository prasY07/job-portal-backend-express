import express from 'express';
import authRouter from './route/common-route.js';
import connectToDatabase from './database.js';
import adminRouter from './route/admin-route.js';
import companyRouter from './route/company-route.js';
import { verifyUserByToken } from './middleware/AuthMiddleware.js';
import { checkCompanyRole, checkUserRole } from './middleware/CheckRole.js';
import userRouter from './route/user-route.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 15 requests per windowMs
  handler: (req, res) => {
     res.status(429).json(errorResponse("To many attemps"));
  },
});

const app  = express();
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use('/api/',authRouter);
app.use('/api/admin/',adminRouter);
app.use('/api/company/',verifyUserByToken,checkCompanyRole,companyRouter)
app.use('/api/user/',verifyUserByToken,checkUserRole,userRouter)
app.use('/api/razorpay-webhook',companyRouter);
connectToDatabase();

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

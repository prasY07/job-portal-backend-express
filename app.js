import express from 'express';
import authRouter from './route/common-route.js';
import connectToDatabase from './database.js';
import adminRouter from './route/admin-route.js';
import companyRouter from './route/company-route.js';
import { verifyUserByToken } from './middleware/AuthMiddleware.js';
import { checkCompanyRole, checkUserRole } from './middleware/CheckRole.js';
import userRouter from './route/user-route.js';

const app  = express();
app.use(express.json());
app.use('/api/',authRouter);
app.use('/api/admin/',adminRouter);
app.use('/api/company/',verifyUserByToken,checkCompanyRole,companyRouter)
app.use('/api/user/',verifyUserByToken,checkUserRole,userRouter)

connectToDatabase();

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
import { check } from 'express-validator';
import { returnValidationErrors } from '../ReturnValidationErrors.js';

export const updateCompanyProfileRequest = [
    check('name').notEmpty().withMessage('name is required').isLength({ min: 3, max: 50 }).withMessage('Name length should be in 3 to 50'),
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage('Please enter valid email'),

    check('company_name').notEmpty().withMessage('company name is required').isLength({ min: 3, max: 50 }).withMessage('Company name length should be in 3 to 50'),
    check('company_address').notEmpty().withMessage('company address is required').isLength({ min: 3, max: 50 }).withMessage('company address length should be in 3 to 50'),
    returnValidationErrors
];

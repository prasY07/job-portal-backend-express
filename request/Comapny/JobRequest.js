import { check } from 'express-validator';
import { returnValidationErrors } from '../ReturnValidationErrors.js';
import Technology from '../../models/Technology.js';

export const jobRequest = [
    check('title').notEmpty().withMessage('title is required').isLength({ min: 3, max: 50 }),
    check('description').notEmpty().withMessage('description is required'),
    check('exp_in_years').notEmpty().withMessage('experience in years is required').isInt({ min: 0, max: 20 }).withMessage('experience in years must be between 0 and 20'),
    check('exp_in_month').notEmpty().withMessage('experience in month is required').isInt({ min: 0, max: 11 }).withMessage('experience in years must be between 0 and 11'),
    check('technologies')
        .isArray()
        .custom((technologies, { req }) => {
            if (!technologies || technologies.length === 0) {
                throw new Error('technologies should not be empty');
            }
            return true;
        }),

    returnValidationErrors
];

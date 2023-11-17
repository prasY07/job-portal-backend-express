import { check } from 'express-validator';
import { returnValidationErrors } from '../ReturnValidationErrors.js';

export const updteUserProfileRequest = [
    check('name').notEmpty().withMessage('name is required').isLength({ min: 3, max: 50 }).withMessage('Name length should be in 3 to 50'),
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage('Please enter valid email'),
    check('skills')
        .isArray()
        .isMongoId()
        .custom((skills, { req }) => {
            if (!skills || skills.length === 0) {
                throw new Error('skills should not be empty');
            }
            return true;
        }),
    returnValidationErrors
];

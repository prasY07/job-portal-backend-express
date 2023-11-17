// AuthValidation.js
import { check } from 'express-validator';
import { returnValidationErrors } from '../ReturnValidationErrors';

export const validateLogin = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),
  returnValidationErrors
];




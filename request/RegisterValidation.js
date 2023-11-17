import { check } from 'express-validator';
import { returnValidationErrors } from './ReturnValidationErrors.js';

export const validateSignup = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').isIn(['user', 'company']).withMessage('Invalid role'),
  returnValidationErrors
];



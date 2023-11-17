// AuthValidation.js
import { check, param } from 'express-validator';
import { returnValidationErrors } from '../ReturnValidationErrors.js';
import Technology from '../../models/Technology.js';

export const updateTechnologyRequest = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),
    param('id') 
    .notEmpty().withMessage('ID parameter is required')
    .isMongoId() 
    .custom(async (value) => {
      const technology = await Technology.findById(value);
      if (!technology) {
        return Promise.reject('Technology with this ID does not exist');
      }
    }),
  returnValidationErrors
];




import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

export const userValidation = [
  check('firstName').trim().not().isEmpty().withMessage('First name is missing!'),
  check('lastName').trim().not().isEmpty().withMessage('Last name is missing!'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
  check('phoneNumber').trim().not().isEmpty().withMessage('Phone number is missing!'),
  check('address').trim().not().isEmpty().withMessage('Address is missing!'),
  check('zipCode').trim().not().isEmpty().withMessage('Zip code is missing!')
];

export const validate: RequestHandler = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(400).json({ errors: error[0].msg });
  }

  next();
};